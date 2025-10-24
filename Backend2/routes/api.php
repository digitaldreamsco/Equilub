<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\AuthController;
// Controladores de administracion
use App\Http\Controllers\Admin\FormattStudyController;
use App\Http\Controllers\Admin\ClientsControllers as AdminClientsControllers;
use App\Http\Controllers\Admin\TypeOfIdentityControllers;


use App\Http\Controllers\Operate\FormattStudyController as OperateFormmattStudyController;

use App\Http\Controllers\LubricationStudyController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\ExcelUploadController;

use App\Http\Controllers\Operate\ServiceController as OperateServiceController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Rutas de autenticación públicas
Route::post('/login', [AuthController::class, 'login']);

// Ruta de prueba simple
Route::get('/test', function() {
    return response()->json(['message' => 'API funcionando']);
});

// Ruta protegida para obtener usuario autenticado
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});


    
// Nueva ruta para subir imágenes
//  Route::post('/upload-images', [ImageController::class, 'store']);

Route::get('/getFormatt', [FormattStudyController::class, 'getFormatt']);
Route::post('/saveSeccion', [FormattStudyController::class, 'saveSeccion']);
Route::put('/updateSeccion/{id}', [FormattStudyController::class, 'updateSeccion']);

// ruta de usuarios
Route::prefix('users')->group(function () {
    Route::get('/permission/{roles}', [UserController::class, 'permission']); // Listar usuarios
    Route::get('/', [UserController::class, 'index']); // Listar usuarios
    Route::delete('/{id}', [UserController::class, 'destroy']); // Eliminar usuario
    Route::put('/{id}/roles', [UserController::class, 'updateRoles']); // Actualizar roles/permisos
});

// saca los usuarios con roles
Route::get('/users-with-roles', [UserController::class, 'getUsersWithRoles']);


// aqui dejamos formatoestudio
Route::prefix('formatoestudio')->group(function () {
    Route::get('/{id}', [FormattStudyController::class, 'getFormattId']); // Listar formato por id
    Route::get('/', [FormattStudyController::class, 'getFormatt']); // Listar formatos
    Route::post('/', [FormattStudyController::class, 'saveSeccion']); // Crear formato
    Route::put('/{id}', [FormattStudyController::class, 'updateSeccion']); // Actualizar formato
    Route::delete('/{id}', [FormattStudyController::class, 'deleteFormato']); // Eliminar formato
});


// aqui dejamos los formatos que tiene que llenar por parte del operador 

Route::prefix('operate')->group(function () {
    Route::get('/study/{id}', [OperateFormmattStudyController::class, 'getFormattId']); // formato de lubricacion
});


// aqui dejamos los servicios
Route::prefix('services')->group(function (){
    Route::get('/', [ServiceController::class, 'index']); //listar todas los servicios
    Route::get('/details/{id}', [ServiceController::class, 'details']); //listar todas los servicios
    Route::get('/search', [ServiceController::class, 'search']);
    Route::put('/{id}', [ServiceController::class, 'update']); //listar todas los servicios //busqueda de servicios especificos (id, name, etc)
    Route::delete('/{id}', [ServiceController::class, 'destroy']);
});

//rutas de clientes
Route::prefix('clients')->group(function (){
    Route::get('/', [AdminClientsControllers::class, 'index']); //listar todas los clientes
    Route::get('/dropdown', [AdminClientsControllers::class, 'Dropdown']); //listar todas los clientes en dropdown
    Route::post('/save', [AdminClientsControllers::class, 'store']);
    Route::get('/details/{id}', [ServiceController::class, 'details']); //listar todas los servicios
    Route::get('/search', [ServiceController::class, 'search']);
    Route::put('/{id}', [ServiceController::class, 'update']); //listar todas los servicios //busqueda de servicios especificos (id, name, etc)
    Route::delete('/{id}', [ServiceController::class, 'destroy']);
});

//rutas de tipo de documento
Route::prefix('typeOfIdentity')->group(function (){
    Route::get('/all/active', [TypeOfIdentityControllers::class, 'active']); //listar todas los clientes
    Route::post('/', [TypeOfIdentityControllers::class, 'save']); 
    Route::put('/{id}', [TypeOfIdentityControllers::class, 'update']); //guardar tipo de documento
    Route::delete('/{id}', [TypeOfIdentityControllers::class, 'destroy']);
});



// Crear un nuevo servicio
Route::prefix('service')->group(function (){
    Route::post('/', [ServiceController::class, 'store']);
    // servicios por usuario operario
    Route::get('/{id}/listView', [OperateServiceController::class, 'index']);
    
});

// Rutas para equipos y sistemas (antes máquinas)
Route::prefix('machines')->group(function (){
    // Obtener tipos de equipos disponibles
    Route::get('/types', [MachineController::class, 'getEquipmentTypes']);
    
    // Buscar equipos
    Route::get('/search', [MachineController::class, 'search']);
    
    // Obtener jerarquía completa de equipos
    Route::get('/hierarchy', [MachineController::class, 'hierarchy']);
    
    // Obtener descendientes de un equipo
    Route::get('/{id}/descendants', [MachineController::class, 'getDescendants']);
    
    // Mover un equipo a otro padre
    Route::patch('/{id}/move', [MachineController::class, 'move']);
    
    // CRUD básico
    Route::post('/', [MachineController::class, 'store']); // Crear equipo
    Route::get('/', [MachineController::class, 'index']); // Listar equipos
    Route::get('/details/{id}', [MachineController::class, 'details']); // Detalles de equipo
    Route::put('/{id}', [MachineController::class, 'update']); // Actualizar equipo
    Route::delete('/{id}', [MachineController::class, 'destroy']); // Eliminar equipo
});

// Rutas para upload de archivos Excel y dashboard
Route::prefix('excel')->group(function () {
    Route::post('/upload', [ExcelUploadController::class, 'uploadExcel']); // Subir archivo Excel
    Route::get('/files', [ExcelUploadController::class, 'listFiles']); // Listar archivos subidos
    Route::get('/download/{filename}', [ExcelUploadController::class, 'downloadFile']); // Descargar archivo
    Route::get('/dashboard-data', [ExcelUploadController::class, 'getDashboardData']); // Datos del dashboard
});

// Endpoint directo para upload (compatibilidad con el dashboard)
Route::post('/upload-excel', [ExcelUploadController::class, 'uploadExcel']);

// ruta de estudios de lubricacion
Route::get('/estudios-lubricacion', function () {
    return response()->json([
        'series' => [
            ['name' => 'Estudios de lubricación', 'data' => [30, 40, 35, 50, 49, 60, 70, 91, 125]],
        ],
        'categorias' => ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'],
    ]);
});

Route::get('/estudios-lubricacion-empresa', function () {
    return response()->json([
        'series' => [
            ['name' => 'Empresa A', 'data' => [31, 40, 28, 51, 42, 109, 100]],
            ['name' => 'Empresa B', 'data' => [11, 32, 45, 32, 34, 52, 41]],
        ],
        'categorias' => ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    ]);
});

// aqui dejamos los estudios de lubricación
Route::prefix('study-lubrications')->group(function (){
    Route::get('/', [LubricationStudyController::class, 'index']);
    Route::get('/{id}', [LubricationStudyController::class, 'show']);
    Route::post('/', [LubricationStudyController::class, 'store']);
    Route::delete('/{id}', [LubricationStudyController::class, 'destroy']);
});

