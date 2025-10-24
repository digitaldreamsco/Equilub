<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Permission;
class UserController extends Controller
{
    public function index()
{
    // Obtener todos los usuarios con sus roles
    $users = User::with('roles')->get();

    return response()->json([
        'message' => 'Usuarios obtenidos con éxito',
        'data' => $users,
    ], 200);
}

public function destroy($id)
{
    $user = User::findOrFail($id);

    // Eliminar el usuario
    $user->delete();

    return response()->json([
        'message' => 'Usuario eliminado con éxito',
    ], 200);
}


public function updateRoles(Request $request, $id)
{
    $validatedData = $request->validate([
        'roles' => 'required|array',
        'roles.*' => 'exists:roles,name', // Cada rol debe existir en la tabla roles
    ]);

    $user = User::findOrFail($id);

    // Sincronizar los roles del usuario
    $user->syncRoles($validatedData['roles']);

    return response()->json([
        'message' => 'Roles actualizados con éxito',
        'data' => $user->roles,
    ], 200);
}

    // obtenemos todos los usuarios
    public function getUser (Request $request){
        $permissions = User::with('roles')->with('permission')->where('id', $request->user()->id)->get();
        $arrayList = array();
        foreach($permissions[0]->permission as $param){
            $data = Permission::findOrFail($param->permission_id);
            $param->permission_id =  $data->name;
        }
        $permissions[0]->permission = [];
        return $permissions;
    }


    public function getUsersWithRoles()
    {
        // Obtenemos usuarios con sus roles
        $users = User::with('roles:id,name') // Relación con roles, seleccionando solo `id` y `name`
            ->select('id', 'name', 'lastname', 'roles_id', 'created_at', 'updated_at') // Campos relevantes de la tabla `users`
            ->get();

        return response()->json([
            'message' => 'Usuarios con roles obtenidos con éxito',
            'data' => $users,
        ], 200);
    }
    public function permission($role){
         // Obtenemos usuarios con sus roles
         $users = Permission::all();

     return response()->json([
         'message' => 'Usuarios con roles obtenidos con éxito',
         'data' => $users,
     ], 200);
    }
}
