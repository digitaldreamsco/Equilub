<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LubricationStudy;
use Carbon\Carbon;

class LubricationStudySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear estudios de lubricación de prueba para las máquinas existentes
        $studies = [
            [
                'machine_id' => 1, // Asumiendo que existe una máquina con ID 1
                'title' => 'Estudio de Lubricación - Tractor CAT 320',
                'description' => 'Análisis completo del sistema de lubricación del tractor CAT 320',
                'recommendations' => 'Cambio de aceite cada 500 horas de operación. Usar aceite SAE 15W-40.',
                'status' => 'completed',
                'study_date' => Carbon::now()->subDays(10),
                'documents' => json_encode([
                    'report.pdf',
                    'oil_analysis.xlsx'
                ])
            ],
            [
                'machine_id' => 2, // Máquina con ID 2
                'title' => 'Estudio de Lubricación - Excavadora John Deere',
                'description' => 'Evaluación del sistema hidráulico y lubricación general',
                'recommendations' => 'Filtros cada 250 horas. Aceite hidráulico ISO VG 46.',
                'status' => 'pending',
                'study_date' => Carbon::now()->subDays(5),
                'documents' => json_encode([
                    'preliminary_report.pdf'
                ])
            ],
            [
                'machine_id' => 1,
                'title' => 'Seguimiento de Lubricación - CAT 320',
                'description' => 'Seguimiento trimestral del sistema de lubricación',
                'recommendations' => 'Sistema en óptimas condiciones. Mantener programa actual.',
                'status' => 'approved',
                'study_date' => Carbon::now()->subDays(30),
                'documents' => json_encode([
                    'follow_up.pdf',
                    'oil_samples.xlsx'
                ])
            ]
        ];

        foreach ($studies as $study) {
            LubricationStudy::create($study);
        }
    }
}
