<?php
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'El servidor PHP está funcionando correctamente'
]);
?>
