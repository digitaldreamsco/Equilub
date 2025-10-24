<?php
// Activar errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Establecer cabeceras adecuadas
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Incluir la configuración de la base de datos
require_once '../config/db_config.php';

// Función para escribir logs específicos del listado
function list_log($message) {
    debug_log("LIST_FILES: " . $message);
}

// Función para responder con error
function responderError($mensaje) {
    echo json_encode(['success' => false, 'error' => $mensaje]);
    exit;
}

try {
    // Obtener conexión a la base de datos
    $mysqli = getDbConnection();
    if (!$mysqli) {
        responderError('Error de conexión a la base de datos');
    }
    
    // Asegurar que existe la tabla PowerBI
    ensureTableExists();

    // Consultar todos los archivos de la tabla PowerBI
    $query = "SELECT `id`, `Doc`, `fecha_subida` FROM `" . TABLE_NAME . "` ORDER BY `id` DESC";
    $result = $mysqli->query($query);

    if (!$result) {
        responderError('Error al ejecutar la consulta: ' . $mysqli->error);
    }

    $files = [];
    while ($row = $result->fetch_assoc()) {
        // Verificar que el archivo existe físicamente
        $fileExists = file_exists($row['Doc']);
        
        // Extraer solo el nombre del archivo de la ruta completa
        $fileName = basename($row['Doc']);
        
        // Agregar el archivo a la lista solo si existe físicamente
        if ($fileExists) {
            // Crear ruta web simple y directa
            $webPath = '/equi/uploads/' . $fileName;
            
            $files[] = [
                'id' => $row['id'],
                'path' => $webPath,
                'name' => $fileName,
                'date' => $row['fecha_subida']
            ];
        }
    }
    
    list_log("Enviando respuesta con " . count($files) . " archivos");
    
    echo json_encode([
        'success' => true,
        'files' => $files,
        'count' => count($files),
        'table' => TABLE_NAME
    ]);

    $mysqli->close();
} catch (Exception $e) {
    list_log("Excepción: " . $e->getMessage());
    responderError('Error inesperado: ' . $e->getMessage());
}
?>
