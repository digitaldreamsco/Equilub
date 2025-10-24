<?php
// Evitar que el navegador cachee esta página
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diagnóstico del Servidor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #0d2053;
            border-bottom: 2px solid #0d2053;
            padding-bottom: 10px;
        }
        .check-item {
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 5px;
        }
        .success {
            background-color: #d4edda;
            border-left: 5px solid #28a745;
        }
        .warning {
            background-color: #fff3cd;
            border-left: 5px solid #ffc107;
        }
        .error {
            background-color: #f8d7da;
            border-left: 5px solid #dc3545;
        }
        .check-title {
            font-weight: bold;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
        }
        .check-title::before {
            margin-right: 10px;
            font-size: 1.2em;
        }
        .success .check-title::before {
            content: "✓";
            color: #28a745;
        }
        .warning .check-title::before {
            content: "⚠";
            color: #ffc107;
        }
        .error .check-title::before {
            content: "✗";
            color: #dc3545;
        }
        .check-details {
            margin-left: 25px;
            font-size: 0.9em;
        }
        code {
            background-color: #f1f1f1;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: Consolas, monospace;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .actions {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
        }
        .button {
            display: inline-block;
            padding: 8px 16px;
            background-color: #0d2053;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Diagnóstico del Servidor</h1>
        
        <!-- Verificar Servidor Web -->
        <?php
        $isServer = (isset($_SERVER['SERVER_SOFTWARE']) && !empty($_SERVER['SERVER_SOFTWARE']));
        $serverClass = $isServer ? 'success' : 'error';
        ?>
        <div class="check-item <?php echo $serverClass; ?>">
            <div class="check-title">Servidor Web</div>
            <div class="check-details">
                <?php if ($isServer): ?>
                    <p>Detectado: <?php echo htmlspecialchars($_SERVER['SERVER_SOFTWARE']); ?></p>
                    <p>URL actual: <?php echo htmlspecialchars($_SERVER['REQUEST_URI']); ?></p>
                <?php else: ?>
                    <p>No se detectó un servidor web. Estás accediendo directamente desde el sistema de archivos.</p>
                    <p>Debes usar un servidor web como Apache (XAMPP, WAMP, etc.).</p>
                <?php endif; ?>
            </div>
        </div>
        
        <!-- Verificar PHP -->
        <div class="check-item success">
            <div class="check-title">PHP</div>
            <div class="check-details">
                <p>Versión: <?php echo phpversion(); ?></p>
                <p>Extensiones relevantes:</p>
                <ul>
                    <li>mysqli: <?php echo extension_loaded('mysqli') ? 'Instalada ✓' : 'No instalada ✗'; ?></li>
                    <li>json: <?php echo extension_loaded('json') ? 'Instalada ✓' : 'No instalada ✗'; ?></li>
                    <li>fileinfo: <?php echo extension_loaded('fileinfo') ? 'Instalada ✓' : 'No instalada ✗'; ?></li>
                </ul>
            </div>
        </div>
        
        <!-- Verificar MySQL -->
        <?php
        $mysqlConnected = false;
        $mysqlError = "";
        $dbExists = false;
        $tableExists = false;
        
        try {
            $mysqli = new mysqli('localhost', 'root', '', 'equilub');
            
            if ($mysqli->connect_errno) {
                $mysqlError = $mysqli->connect_error;
            } else {
                $mysqlConnected = true;
                
                // Verificar si existe la base de datos
                $result = $mysqli->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'equilub'");
                $dbExists = ($result && $result->num_rows > 0);
                
                // Verificar si existe la tabla PowerBI
                if ($dbExists) {
                    $result = $mysqli->query("SHOW TABLES LIKE 'PowerBI'");
                    $tableExists = ($result && $result->num_rows > 0);
                }
                
                $mysqli->close();
            }
        } catch (Exception $e) {
            $mysqlError = $e->getMessage();
        }
        
        $mysqlClass = $mysqlConnected ? 'success' : 'error';
        $dbClass = $dbExists ? 'success' : 'warning';
        $tableClass = $tableExists ? 'success' : 'warning';
        ?>
        
        <div class="check-item <?php echo $mysqlClass; ?>">
            <div class="check-title">Conexión MySQL</div>
            <div class="check-details">
                <?php if ($mysqlConnected): ?>
                    <p>Conexión exitosa a MySQL ✓</p>
                <?php else: ?>
                    <p>Error de conexión: <?php echo htmlspecialchars($mysqlError); ?></p>
                    <p>Asegúrate de que MySQL esté en ejecución y que las credenciales sean correctas.</p>
                <?php endif; ?>
            </div>
        </div>
        
        <div class="check-item <?php echo $dbClass; ?>">
            <div class="check-title">Base de Datos 'equilub'</div>
            <div class="check-details">
                <?php if ($dbExists): ?>
                    <p>La base de datos 'equilub' existe ✓</p>
                <?php else: ?>
                    <p>La base de datos 'equilub' no existe.</p>
                    <p>Necesitas crear esta base de datos usando phpMyAdmin.</p>
                    <p>Puedes acceder a phpMyAdmin en: <a href="http://localhost/phpmyadmin/" target="_blank">http://localhost/phpmyadmin/</a></p>
                <?php endif; ?>
            </div>
        </div>
        
        <div class="check-item <?php echo $tableClass; ?>">
            <div class="check-title">Tabla 'PowerBI'</div>
            <div class="check-details">
                <?php if ($tableExists): ?>
                    <p>La tabla 'PowerBI' existe ✓</p>
                <?php else: ?>
                    <p>La tabla 'PowerBI' no existe.</p>
                    <p>Esta tabla se creará automáticamente al subir un archivo.</p>
                <?php endif; ?>
            </div>
        </div>
        
        <!-- Verificar carpeta de documentos -->
        <?php
        $docFolder = 'doc/';
        $docFolderExists = is_dir($docFolder);
        $docFolderWritable = $docFolderExists && is_writable($docFolder);
        $docClass = ($docFolderExists && $docFolderWritable) ? 'success' : ($docFolderExists ? 'warning' : 'error');
        ?>
        
        <div class="check-item <?php echo $docClass; ?>">
            <div class="check-title">Carpeta 'doc'</div>
            <div class="check-details">
                <?php if (!$docFolderExists): ?>
                    <p>La carpeta 'doc' no existe.</p>
                    <p>Esta carpeta se creará automáticamente al subir un archivo.</p>
                <?php elseif (!$docFolderWritable): ?>
                    <p>La carpeta 'doc' existe pero no tiene permisos de escritura.</p>
                    <p>Debes asignar permisos de escritura (777) a esta carpeta.</p>
                <?php else: ?>
                    <p>La carpeta 'doc' existe y tiene permisos de escritura ✓</p>
                <?php endif; ?>
            </div>
        </div>
        
        <!-- Verificar archivos requeridos -->
        <?php
        $requiredFiles = [
            'powerB.html',
            'upload.php',
            'list_files.php',
            'check_connection.php',
            'db_config.php',
            'test.php'
        ];
        
        $missingFiles = [];
        foreach ($requiredFiles as $file) {
            if (!file_exists($file)) {
                $missingFiles[] = $file;
            }
        }
        
        $filesClass = empty($missingFiles) ? 'success' : 'error';
        ?>
        
        <div class="check-item <?php echo $filesClass; ?>">
            <div class="check-title">Archivos Requeridos</div>
            <div class="check-details">
                <?php if (empty($missingFiles)): ?>
                    <p>Todos los archivos requeridos están presentes ✓</p>
                <?php else: ?>
                    <p>Faltan los siguientes archivos:</p>
                    <ul>
                        <?php foreach ($missingFiles as $file): ?>
                            <li><?php echo htmlspecialchars($file); ?></li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>
        </div>
        
        <!-- Acciones a tomar -->
        <div class="actions">
            <a href="index.php" class="button">Volver al inicio</a>
            <a href="powerB.html" class="button">Ir al Dashboard</a>
            <a href="diagnostico.php" class="button">Diagnóstico de BD</a>
            <a href="<?php echo $_SERVER['PHP_SELF']; ?>" class="button">Actualizar</a>
        </div>
    </div>
</body>
</html>
