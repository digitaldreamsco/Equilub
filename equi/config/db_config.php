<?php
/**
 * Configuración de la base de datos y funciones de conexión
 */

// Configuración de la base de datos
define('DB_HOST', 'localhost');     // Host de la base de datos (normalmente localhost para XAMPP)
define('DB_USER', 'root');          // Usuario de MySQL (por defecto es root en XAMPP)
define('DB_PASS', '');              // Contraseña (por defecto vacía en XAMPP)
define('DB_NAME', 'equilub');       // Nombre de la base de datos
define('DB_CHARSET', 'utf8mb4');    // Charset para soporte completo de Unicode
define('TABLE_NAME', 'PowerBI');    // Nombre exacto de la tabla (respetando mayúsculas)

// Escribir en log para depuración
function debug_log($message, $file = '../logs/db_debug.txt') {
    file_put_contents($file, date('Y-m-d H:i:s') . ' - ' . $message . "\n", FILE_APPEND);
}

// Función para obtener una conexión a la base de datos
function getDbConnection() {
    try {
        $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
        // Verificar la conexión
        if ($mysqli->connect_error) {
            debug_log('Error de conexión a la base de datos: ' . $mysqli->connect_error);
            return null;
        }
        
        // Establecer el conjunto de caracteres
        $mysqli->set_charset(DB_CHARSET);
        
        debug_log("Conexión a base de datos exitosa");
        return $mysqli;
    } catch (Exception $e) {
        debug_log('Excepción al conectar a la base de datos: ' . $e->getMessage());
        return null;
    }
}

// Función para cerrar la conexión de forma segura
function closeDbConnection($mysqli) {
    if ($mysqli && $mysqli instanceof mysqli) {
        $mysqli->close();
    }
}

// Función para manejar los errores de consultas
function queryError($mysqli, $query) {
    debug_log("Error SQL: " . $mysqli->error . " en la consulta: " . $query);
    return "Error en la consulta a la base de datos. Consulte el log para más detalles.";
}

// Función para verificar y crear la tabla si no existe
function ensureTableExists() {
    $mysqli = getDbConnection();
    if (!$mysqli) {
        return false;
    }
    
    // Verificar si la tabla existe (usando el nombre exacto definido)
    $checkTable = $mysqli->query("SHOW TABLES LIKE '" . TABLE_NAME . "'");
    
    debug_log("Verificando si existe la tabla: " . TABLE_NAME);
    debug_log("Resultado: " . ($checkTable->num_rows > 0 ? "Tabla existe" : "Tabla no existe"));
    
    if ($checkTable->num_rows == 0) {
        // La tabla no existe, crearla
        $createTableSQL = "CREATE TABLE `" . TABLE_NAME . "` (
            `id` INT(11) NOT NULL AUTO_INCREMENT,
            `Doc` TEXT NOT NULL,
            `fecha_subida` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;";
        
        debug_log("Creando tabla con SQL: " . $createTableSQL);
        
        if (!$mysqli->query($createTableSQL)) {
            debug_log("Error al crear la tabla: " . $mysqli->error);
            closeDbConnection($mysqli);
            return false;
        }
        
        debug_log("Tabla " . TABLE_NAME . " creada correctamente");
    }
    
    closeDbConnection($mysqli);
    return true;
}

// Función para probar la conexión
function testDbConnection() {
    $mysqli = getDbConnection();
    if (!$mysqli) {
        return [
            'success' => false,
            'message' => 'No se pudo conectar a la base de datos'
        ];
    }
    
    $result = [
        'success' => true,
        'message' => 'Conexión exitosa a la base de datos',
        'server_info' => $mysqli->server_info,
        'tables_exist' => false
    ];
    
    // Verificar si la tabla existe
    $checkTable = $mysqli->query("SHOW TABLES LIKE '" . TABLE_NAME . "'");
    $result['tables_exist'] = ($checkTable->num_rows > 0);
    
    closeDbConnection($mysqli);
    return $result;
}
?>
