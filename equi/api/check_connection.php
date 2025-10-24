<?php
// Evitar advertencias y errores que puedan romper el JSON
error_reporting(E_ERROR);
ini_set('display_errors', 0);

// Establecer cabeceras adecuadas
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Incluir la configuración de la base de datos
require_once '../config/db_config.php';

try {
    // Probar la conexión a la base de datos
    $connected = testDbConnection();
    
    if ($connected) {
        // Si la conexión fue exitosa, intentar crear la tabla
        $tableCreated = ensureTableExists();
        
        // Verificar si la tabla existe
        $mysqli = getDbConnection();
        $tableExists = false;
        
        if ($mysqli) {
            $result = $mysqli->query("SHOW TABLES LIKE '" . TABLE_NAME . "'");
            $tableExists = ($result && $result->num_rows > 0);
            $mysqli->close();
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Conexión exitosa a la base de datos',
            'tableExists' => $tableExists,
            'tableCreated' => $tableCreated,
            'serverInfo' => [
                'php_version' => phpversion(),
                'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Desconocido'
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error de conexión a la base de datos',
            'error' => 'No se pudo conectar a la base de datos MySQL'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error inesperado',
        'error' => $e->getMessage()
    ]);
}
?>
