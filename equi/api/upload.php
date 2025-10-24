<?php
// Iniciar output buffering
ob_start();

// Limpiar cualquier salida previa
ob_clean();

// Activar errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Establecer cabeceras adecuadas
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Incluir la configuración de la base de datos
require_once '../config/db_config.php';

// Función para escribir logs específicos del upload
function upload_log($message) {
    debug_log("UPLOAD: " . $message);
}

// Función para responder con error
function responderError($mensaje) {
    // Limpiar cualquier salida previa
    ob_clean();
    echo json_encode(['success' => false, 'error' => $mensaje]);
    ob_end_flush();
    exit;
}

try {
    upload_log("Iniciando proceso de upload");
    
    // Verificar que se ha enviado un archivo
    if (!isset($_FILES['excelFile'])) {
        upload_log("No se recibió ningún archivo");
        responderError('No se recibió ningún archivo');
    }
    
    if ($_FILES['excelFile']['error'] !== UPLOAD_ERR_OK) {
        upload_log("Error en la carga: " . $_FILES['excelFile']['error']);
        responderError('Hubo un error en la carga: ' . $_FILES['excelFile']['error']);
    }

    upload_log("Archivo recibido: " . $_FILES['excelFile']['name']);

    // Obtener conexión a la base de datos
    $mysqli = getDbConnection();
    if (!$mysqli) {
        upload_log("Error de conexión a la base de datos");
        responderError('Error de conexión a la base de datos');
    }

    // Asegurar que existe la tabla PowerBI
    if (!ensureTableExists()) {
        upload_log("Error al crear la tabla en la base de datos");
        responderError('Error al crear la tabla en la base de datos');
    }

    // Crear directorio uploads si no existe
    $uploadDir = '../uploads/';
    if (!file_exists($uploadDir)) {
        upload_log("Creando directorio: " . $uploadDir);
        if (!mkdir($uploadDir, 0777, true)) {
            upload_log("No se pudo crear el directorio de destino");
            responderError('No se pudo crear el directorio de destino');
        }
    }

    // Generar nombre de archivo único basado en la fecha y hora
    $fileName = date('Ymd_His') . '_' . $_FILES['excelFile']['name'];
    $filePath = $uploadDir . $fileName;
    
    upload_log("Ruta de destino: " . $filePath);
    
    // Mover el archivo subido al directorio doc
    if (move_uploaded_file($_FILES['excelFile']['tmp_name'], $filePath)) {
        upload_log("Archivo movido exitosamente");
        
        // Guardar ruta en la base de datos usando el nombre exacto de la tabla
        $query = "INSERT INTO `" . TABLE_NAME . "` (`Doc`) VALUES (?)";
        
        $stmt = $mysqli->prepare($query);
        
        if (!$stmt) {
            upload_log("Error al preparar la consulta: " . $mysqli->error);
            responderError('Error al preparar la consulta: ' . $mysqli->error);
        }
        
        $stmt->bind_param("s", $filePath);
        
        if ($stmt->execute()) {
            $fileId = $mysqli->insert_id;
            upload_log("Registro insertado correctamente con ID: $fileId");
            
            // Verificar que realmente se insertó consultando la tabla
            $checkInsert = $mysqli->query("SELECT id FROM `" . TABLE_NAME . "` WHERE id = $fileId");
            if ($checkInsert && $checkInsert->num_rows > 0) {
                upload_log("Verificación exitosa, el registro existe en la tabla");
            } else {
                upload_log("¡ADVERTENCIA! No se pudo verificar la inserción");
            }
            
            echo json_encode([
                'success' => true,
                'message' => 'Archivo subido correctamente',
                'fileId' => $fileId,
                'filePath' => $filePath
            ]);
            
            // Limpiar el buffer de salida
            ob_end_flush();
        } else {
            upload_log("Error al ejecutar la consulta: " . $stmt->error);
            responderError('Error al ejecutar la consulta: ' . $stmt->error);
        }
        
        $stmt->close();
    } else {
        upload_log("Error al mover el archivo al servidor");
        responderError('Error al mover el archivo al servidor. Revise permisos de la carpeta.');
    }

    $mysqli->close();
} catch (Exception $e) {
    upload_log("Excepción: " . $e->getMessage());
    responderError('Error inesperado: ' . $e->getMessage());
}
?>
