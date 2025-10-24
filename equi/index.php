<?php
// Verificar si estamos en un servidor web o accediendo desde el sistema de archivos
$isServer = (isset($_SERVER['SERVER_SOFTWARE']) && !empty($_SERVER['SERVER_SOFTWARE']));

if ($isServer) {
    // Redirigir al SPA principal si estamos en un servidor web
    header("Location: index.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instrucciones de Acceso</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            color: #0d2053;
            border-bottom: 2px solid #0d2053;
            padding-bottom: 10px;
        }
        .alert {
            background-color: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            border-left: 5px solid #721c24;
        }
        .steps {
            background-color: #e9ecf6;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        code {
            background-color: #f1f1f1;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: Consolas, monospace;
        }
        .step {
            margin-bottom: 15px;
            padding-left: 20px;
            position: relative;
        }
        .step:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #27ae60;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Dashboard de Mantenimiento - Sistema Completo de Gestión</h1>
    
    <div class="alert">
        <strong>¡Importante!</strong> Estás viendo esta página porque estás accediendo directamente desde el explorador de archivos. 
        Para que la aplicación completa funcione correctamente, debes acceder a través de un servidor web.
    </div>
    
    <h2>Instrucciones de acceso</h2>
    
    <div class="steps">
        <div class="step">Asegúrate de que XAMPP (o similar) esté instalado y los servicios Apache y MySQL estén ejecutándose.</div>
        <div class="step">Coloca todos los archivos de la aplicación en la carpeta <code>htdocs</code> de XAMPP (o en una subcarpeta).</div>
        <div class="step">Accede a través de <code>http://localhost/equi/</code> (o la ruta correspondiente si usaste una subcarpeta).</div>
        <div class="step">Crea una base de datos llamada <code>equilub</code> en MySQL usando phpMyAdmin.</div>
    </div>
    
    <h3>Sistema incluye:</h3>
    <ul>
        <li><strong>Panel de Control</strong> - Dashboard principal con gráficos</li>
        <li><strong>Reportes PowerBI</strong> - Tu dashboard de mantenimiento con carga de Excel</li>
        <li><strong>Gestión</strong> - Usuarios, Clientes, Servicios, Máquinas</li>
        <li><strong>Lubricación</strong> - Estudios, Formatos, Cartas de lubricación</li>
        <li><strong>Configuración</strong> - Ajustes del sistema</li>
    </ul>
    
    <h3>Solución rápida</h3>
    <p>Si ya tienes XAMPP instalado y ejecutándose:</p>
    <ol>
        <li>Abre XAMPP Control Panel y asegúrate de que Apache y MySQL estén en verde (ejecutándose).</li>
        <li>Abre tu navegador e ingresa: <a href="http://localhost/equi/">http://localhost/equi/</a></li>
        <li>Navega entre las pestañas usando el menú lateral</li>
    </ol>
    
    <h3>¿Tienes problemas?</h3>
    <p>Accede a <a href="server_check.php">Diagnóstico del Servidor</a> para verificar la configuración.</p>
</body>
</html>
