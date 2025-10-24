<?php
// Activar visualización de errores
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Incluir la configuración de la base de datos
require_once 'db_config.php';

echo "<h1>Diagnóstico de Base de Datos</h1>";

// Comprobar conexión
$mysqli = getDbConnection();
if (!$mysqli) {
    echo "<p style='color:red'>❌ No se pudo conectar a la base de datos. Verifique sus credenciales.</p>";
    exit;
}

echo "<p style='color:green'>✅ Conexión exitosa a la base de datos MySQL.</p>";
echo "<p>Información del servidor: " . $mysqli->server_info . "</p>";
echo "<p>Versión de PHP: " . phpversion() . "</p>";

// Verificar la base de datos
echo "<h2>Base de datos: " . DB_NAME . "</h2>";

// Mostrar todas las tablas
$tables = $mysqli->query("SHOW TABLES");
if ($tables) {
    if ($tables->num_rows > 0) {
        echo "<p>Tablas encontradas:</p>";
        echo "<ul>";
        while ($row = $tables->fetch_row()) {
            echo "<li>" . $row[0] . "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p style='color:orange'>⚠️ No se encontraron tablas en la base de datos.</p>";
    }
} else {
    echo "<p style='color:red'>❌ Error al listar tablas: " . $mysqli->error . "</p>";
}

// Verificar si la tabla específica existe
$tableName = TABLE_NAME;
$tableCheck = $mysqli->query("SHOW TABLES LIKE '$tableName'");
if ($tableCheck && $tableCheck->num_rows > 0) {
    echo "<h2>Tabla: $tableName</h2>";
    echo "<p style='color:green'>✅ La tabla existe.</p>";
    
    // Mostrar estructura de la tabla
    $structure = $mysqli->query("DESCRIBE `$tableName`");
    if ($structure) {
        echo "<h3>Estructura:</h3>";
        echo "<table border='1' cellpadding='5'>";
        echo "<tr><th>Campo</th><th>Tipo</th><th>Nulo</th><th>Clave</th><th>Default</th><th>Extra</th></tr>";
        while ($row = $structure->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row['Field'] . "</td>";
            echo "<td>" . $row['Type'] . "</td>";
            echo "<td>" . $row['Null'] . "</td>";
            echo "<td>" . $row['Key'] . "</td>";
            echo "<td>" . $row['Default'] . "</td>";
            echo "<td>" . $row['Extra'] . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    }
    
    // Mostrar contenido de la tabla
    $content = $mysqli->query("SELECT * FROM `$tableName`");
    if ($content) {
        echo "<h3>Contenido:</h3>";
        if ($content->num_rows > 0) {
            echo "<table border='1' cellpadding='5'>";
            $first = true;
            while ($row = $content->fetch_assoc()) {
                if ($first) {
                    echo "<tr>";
                    foreach ($row as $key => $value) {
                        echo "<th>" . $key . "</th>";
                    }
                    echo "</tr>";
                    $first = false;
                }
                echo "<tr>";
                foreach ($row as $value) {
                    echo "<td>" . $value . "</td>";
                }
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p style='color:orange'>⚠️ La tabla está vacía.</p>";
        }
    } else {
        echo "<p style='color:red'>❌ Error al obtener contenido: " . $mysqli->error . "</p>";
    }
} else {
    echo "<h2>Tabla: $tableName</h2>";
    echo "<p style='color:red'>❌ La tabla no existe.</p>";
    
    // Intentar crear la tabla
    echo "<h3>Intentando crear la tabla...</h3>";
    if (ensureTableExists()) {
        echo "<p style='color:green'>✅ Tabla creada exitosamente. Recargue esta página para ver los detalles.</p>";
    } else {
        echo "<p style='color:red'>❌ Error al crear la tabla.</p>";
    }
}

// Comprobar permisos de escritura en carpeta doc
$docFolder = 'doc/';
echo "<h2>Verificando permisos de carpeta</h2>";
if (!file_exists($docFolder)) {
    echo "<p>La carpeta $docFolder no existe. Intentando crearla...</p>";
    if (mkdir($docFolder, 0777, true)) {
        echo "<p style='color:green'>✅ Carpeta creada exitosamente.</p>";
    } else {
        echo "<p style='color:red'>❌ No se pudo crear la carpeta. Verifique los permisos.</p>";
    }
} else {
    echo "<p>La carpeta $docFolder existe.</p>";
    if (is_writable($docFolder)) {
        echo "<p style='color:green'>✅ La carpeta tiene permisos de escritura.</p>";
    } else {
        echo "<p style='color:red'>❌ La carpeta NO tiene permisos de escritura. Esto puede causar problemas.</p>";
    }
}

$mysqli->close();
?>
