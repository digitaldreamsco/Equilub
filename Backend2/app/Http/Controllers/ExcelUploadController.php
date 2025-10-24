<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Machine;
use Exception;

class ExcelUploadController extends Controller
{
    /**
     * Handle Excel file upload and processing
     */
    public function uploadExcel(Request $request)
    {
        try {
            // Validar que se haya enviado un archivo
            $request->validate([
                'excelFile' => 'required|file|mimes:xlsx,xls,csv|max:10240' // 10MB max
            ]);

            $file = $request->file('excelFile');
            
            // Crear directorio de uploads si no existe
            $uploadDir = 'uploads/excel/' . date('Y/m');
            
            // Generar nombre único para el archivo
            $filename = date('Ymd_His') . '_' . $file->getClientOriginalName();
            
            // Guardar el archivo
            $filePath = $file->storeAs($uploadDir, $filename, 'public');
            $fullPath = storage_path('app/public/' . $filePath);
            
            Log::info('Excel file uploaded successfully', [
                'filename' => $filename,
                'path' => $filePath,
                'size' => $file->getSize()
            ]);
            
            // Procesar el archivo Excel y generar datos para dashboard
            $processedData = $this->processExcelFile($fullPath);
            
            // Guardar información del archivo en la base de datos
            $fileRecord = DB::table('uploaded_files')->insert([
                'filename' => $filename,
                'original_name' => $file->getClientOriginalName(),
                'file_path' => $filePath,
                'file_size' => $file->getSize(),
                'processed_records' => $processedData['records'] ?? 0,
                'dashboard_data' => json_encode($processedData['dashboard'] ?? []),
                'created_at' => now(),
                'updated_at' => now()
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Archivo Excel subido y procesado exitosamente',
                'data' => [
                    'filename' => $filename,
                    'path' => $filePath,
                    'url' => Storage::url($filePath),
                    'processed_records' => $processedData['records'] ?? 0,
                    'dashboard_data' => $processedData['dashboard'] ?? [],
                    'file_id' => $fileRecord
                ]
            ]);
            
        } catch (Exception $e) {
            Log::error('Error uploading Excel file', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'error' => 'Error al procesar el archivo: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Process the uploaded Excel file and generate dashboard data
     */
    private function processExcelFile($filePath)
    {
        try {
            // Leer archivo CSV/Excel básico
            $data = $this->readExcelFile($filePath);
            
            $processedRecords = 0;
            $errors = [];
            $dashboardData = [
                'equipment_by_type' => [],
                'equipment_by_state' => [],
                'hierarchy_levels' => [],
                'monthly_data' => [],
                'recent_uploads' => [],
                'summary' => []
            ];
            
            // Procesar cada fila (asumiendo que la primera fila son headers)
            foreach ($data as $index => $row) {
                if ($index === 0) continue; // Skip header row
                
                try {
                    // Mapear columnas del Excel a campos de la base de datos
                    $equipmentData = [
                        'name' => $row[0] ?? 'Equipo importado ' . $index,
                        'equipment_type' => $this->mapEquipmentType($row[1] ?? 'component'),
                        'state' => $this->mapState($row[2] ?? 'Operativo'),
                        'type' => $row[3] ?? null,
                        'description' => $row[4] ?? null,
                        'observation' => 'Importado desde Excel el ' . date('Y-m-d H:i:s')
                    ];
                    
                    // Crear el equipo
                    $machine = Machine::create($equipmentData);
                    $processedRecords++;
                    
                    // Agregar a datos del dashboard
                    $this->addToDashboardData($dashboardData, $equipmentData);
                    
                } catch (Exception $e) {
                    $errors[] = "Fila {$index}: " . $e->getMessage();
                    Log::warning("Error processing Excel row {$index}", [
                        'error' => $e->getMessage(),
                        'row_data' => $row
                    ]);
                }
            }
            
            // Generar datos adicionales del dashboard
            $dashboardData = $this->generateDashboardSummary($dashboardData, $processedRecords);
            
            Log::info('Excel processing completed', [
                'processed_records' => $processedRecords,
                'errors' => count($errors)
            ]);
            
            return [
                'records' => $processedRecords,
                'errors' => $errors,
                'dashboard' => $dashboardData,
                'message' => "Procesados {$processedRecords} registros"
            ];
            
        } catch (Exception $e) {
            Log::error('Error processing Excel file', [
                'error' => $e->getMessage(),
                'file' => $filePath
            ]);
            
            return [
                'records' => 0,
                'errors' => [$e->getMessage()],
                'dashboard' => [],
                'message' => 'Error al procesar archivo Excel'
            ];
        }
    }
    
    /**
     * Read Excel/CSV file
     */
    private function readExcelFile($filePath)
    {
        $extension = pathinfo($filePath, PATHINFO_EXTENSION);
        
        if (strtolower($extension) === 'csv') {
            return $this->readCSVFile($filePath);
        } else {
            // Para archivos Excel, usar una lectura básica o PhpSpreadsheet si está disponible
            if (class_exists('\PhpOffice\PhpSpreadsheet\IOFactory')) {
                return $this->readExcelWithPhpSpreadsheet($filePath);
            } else {
                throw new Exception('No se puede procesar archivos Excel. Instale PhpSpreadsheet o use CSV.');
            }
        }
    }
    
    /**
     * Read CSV file
     */
    private function readCSVFile($filePath)
    {
        $data = [];
        if (($handle = fopen($filePath, "r")) !== FALSE) {
            while (($row = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $data[] = $row;
            }
            fclose($handle);
        }
        return $data;
    }
    
    /**
     * Read Excel file with PhpSpreadsheet
     */
    private function readExcelWithPhpSpreadsheet($filePath)
    {
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($filePath);
        $worksheet = $spreadsheet->getActiveSheet();
        return $worksheet->toArray();
    }
    
    /**
     * Add equipment data to dashboard metrics
     */
    private function addToDashboardData(&$dashboardData, $equipmentData)
    {
        // Contar por tipo
        $type = $equipmentData['equipment_type'];
        $dashboardData['equipment_by_type'][$type] = ($dashboardData['equipment_by_type'][$type] ?? 0) + 1;
        
        // Contar por estado
        $state = $equipmentData['state'];
        $dashboardData['equipment_by_state'][$state] = ($dashboardData['equipment_by_state'][$state] ?? 0) + 1;
        
        // Agregar a recientes
        $dashboardData['recent_uploads'][] = [
            'name' => $equipmentData['name'],
            'type' => $type,
            'state' => $state,
            'timestamp' => now()->toISOString()
        ];
    }
    
    /**
     * Generate dashboard summary
     */
    private function generateDashboardSummary($dashboardData, $totalRecords)
    {
        $dashboardData['summary'] = [
            'total_records' => $totalRecords,
            'upload_date' => now()->toISOString(),
            'equipment_types' => count($dashboardData['equipment_by_type']),
            'states_variety' => count($dashboardData['equipment_by_state'])
        ];
        
        // Generar datos mensuales simulados
        $dashboardData['monthly_data'] = $this->generateMonthlyData();
        
        return $dashboardData;
    }
    
    /**
     * Generate monthly data for charts
     */
    private function generateMonthlyData()
    {
        $months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        $currentMonth = (int)date('n') - 1; // 0-indexed
        
        $data = [];
        for ($i = 0; $i < 12; $i++) {
            $data[] = [
                'month' => $months[$i],
                'uploads' => $i <= $currentMonth ? rand(5, 50) : 0,
                'equipment' => $i <= $currentMonth ? rand(10, 100) : 0
            ];
        }
        
        return $data;
    }
    
    /**
     * Map Excel values to valid equipment types
     */
    private function mapEquipmentType($value)
    {
        $mappings = [
            'equipo' => 'equipment',
            'equipment' => 'equipment',
            'subequipo' => 'subequipment',
            'sub-equipo' => 'subequipment',
            'subequipment' => 'subequipment',
            'componente' => 'component',
            'component' => 'component',
            'parte' => 'part',
            'part' => 'part'
        ];
        
        return $mappings[strtolower(trim($value))] ?? 'component';
    }
    
    /**
     * Map Excel values to valid states
     */
    private function mapState($value)
    {
        $mappings = [
            'operativo' => 'Operativo',
            'operational' => 'Operativo',
            'mantenimiento' => 'Mantenimiento',
            'maintenance' => 'Mantenimiento',
            'critico' => 'Fuera de servicio',
            'critical' => 'Fuera de servicio',
            'fuera de servicio' => 'Fuera de servicio',
            'out of service' => 'Fuera de servicio'
        ];
        
        return $mappings[strtolower(trim($value))] ?? 'Operativo';
    }
    
    /**
     * Get dashboard data from uploaded files
     */
    public function getDashboardData()
    {
        try {
            // Obtener datos del dashboard de archivos subidos
            $uploadedFiles = DB::table('uploaded_files')
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();
            
            $combinedDashboard = [
                'equipment_by_type' => [],
                'equipment_by_state' => [],
                'recent_uploads' => [],
                'upload_history' => [],
                'summary' => []
            ];
            
            foreach ($uploadedFiles as $file) {
                $dashboardData = json_decode($file->dashboard_data, true) ?? [];
                
                // Combinar datos por tipo
                foreach ($dashboardData['equipment_by_type'] ?? [] as $type => $count) {
                    $combinedDashboard['equipment_by_type'][$type] = 
                        ($combinedDashboard['equipment_by_type'][$type] ?? 0) + $count;
                }
                
                // Combinar datos por estado
                foreach ($dashboardData['equipment_by_state'] ?? [] as $state => $count) {
                    $combinedDashboard['equipment_by_state'][$state] = 
                        ($combinedDashboard['equipment_by_state'][$state] ?? 0) + $count;
                }
                
                // Agregar a historial de uploads
                $combinedDashboard['upload_history'][] = [
                    'filename' => $file->filename,
                    'records' => $file->processed_records,
                    'date' => $file->created_at,
                    'size' => $file->file_size
                ];
            }
            
            // Obtener datos actuales de la base de datos
            $currentStats = $this->getCurrentDatabaseStats();
            
            return response()->json([
                'success' => true,
                'dashboard' => array_merge($combinedDashboard, $currentStats)
            ]);
            
        } catch (Exception $e) {
            Log::error('Error getting dashboard data', ['error' => $e->getMessage()]);
            
            return response()->json([
                'success' => false,
                'error' => 'Error al obtener datos del dashboard'
            ], 500);
        }
    }
    
    /**
     * Get current database statistics
     */
    private function getCurrentDatabaseStats()
    {
        $totalEquipment = Machine::count();
        $equipmentByType = Machine::select('equipment_type', DB::raw('count(*) as count'))
            ->groupBy('equipment_type')
            ->pluck('count', 'equipment_type')
            ->toArray();
            
        $equipmentByState = Machine::select('state', DB::raw('count(*) as count'))
            ->whereNotNull('state')
            ->groupBy('state')
            ->pluck('count', 'state')
            ->toArray();
        
        return [
            'current_stats' => [
                'total_equipment' => $totalEquipment,
                'equipment_by_type' => $equipmentByType,
                'equipment_by_state' => $equipmentByState,
                'last_updated' => now()->toISOString()
            ]
        ];
    }
    
    /**
     * List uploaded files with dashboard data
     */
    public function listFiles()
    {
        try {
            $files = DB::table('uploaded_files')
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($file) {
                    return [
                        'id' => $file->id,
                        'name' => $file->filename,
                        'original_name' => $file->original_name,
                        'path' => $file->file_path,
                        'url' => Storage::url($file->file_path),
                        'size' => $file->file_size,
                        'processed_records' => $file->processed_records,
                        'dashboard_data' => json_decode($file->dashboard_data, true),
                        'created_at' => $file->created_at,
                        'last_modified' => $file->updated_at
                    ];
                });
            
            return response()->json([
                'success' => true,
                'files' => $files
            ]);
            
        } catch (Exception $e) {
            Log::error('Error listing files', ['error' => $e->getMessage()]);
            
            return response()->json([
                'success' => false,
                'error' => 'Error al listar archivos'
            ], 500);
        }
    }
    
    /**
     * Download uploaded file
     */
    public function downloadFile($filename)
    {
        try {
            $file = DB::table('uploaded_files')
                ->where('filename', $filename)
                ->first();
                
            if (!$file || !Storage::disk('public')->exists($file->file_path)) {
                return response()->json([
                    'success' => false,
                    'error' => 'Archivo no encontrado'
                ], 404);
            }
            
            return Storage::disk('public')->download($file->file_path, $file->original_name);
            
        } catch (Exception $e) {
            Log::error('Error downloading file', [
                'filename' => $filename,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'error' => 'Error al descargar archivo'
            ], 500);
        }
    }
}
