<?php
// Script para verificar todas las páginas del SPA
$pages = [
    'usuarios.html',
    'clientes.html', 
    'servicios.html',
    'maquinas.html',
    'estudios.html',
    'formatos.html',
    'cartas.html',
    'ajustes.html',
    'reportes_embedded.html',
    'powerB.html'
];

echo "Verificando páginas del SPA...\n\n";

foreach ($pages as $page) {
    if (file_exists($page)) {
        $size = filesize($page);
        echo "✅ $page - Existe ($size bytes)\n";
    } else {
        echo "❌ $page - NO EXISTE\n";
    }
}

echo "\nVerificando archivos principales...\n";
$mainFiles = ['index.html', 'main.js', 'style.css'];
foreach ($mainFiles as $file) {
    if (file_exists($file)) {
        echo "✅ $file - Existe\n";
    } else {
        echo "❌ $file - NO EXISTE\n";
    }
}

echo "\nVerificación completada.\n";
?>
