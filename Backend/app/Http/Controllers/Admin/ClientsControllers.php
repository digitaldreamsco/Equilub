<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Clients;

class ClientsControllers extends Controller
{
    // Obtener todos los formatos
    public function getClients(Request $request)
    {
        $allclients = clients::all();

        return response()->json([
            'message' => 'Clientes obtenidos con éxito',
            'data' => $allclients,
        ], 200);
    }

     // Obtener todos los formatos
     public function Dropdown()
     {
        try {
            //code...
            $allclients = clients::ClientsDropdown();
            return response()->json([
                'message' => 'Clientes obtenidos con éxito',
                'data' => $allclients,
            ], 200);
        } catch (\Exception  $e) {
            //throw $th;
            return response()->json([
                'message' => 'Error obtenido',
                'data' => $e,
            ], 500);
        }
         
     }

    // Guardar un nuevo formato
    public function store(Request $request)
    {
        // Validar los datos
        $validated_clients = $request->validate([
            'user_id' => 'nullable',
            'type_client' => 'required',
            'type_id' => 'required',
            'number_id' => 'required|numeric',
            'name' => 'required|string',
            'lastname' => 'nullable|string',
            'cellphone' => 'nullable',
            'address' => 'nullable',
            'email' => 'nullable',
            'Sex' => 'nullable',
            'People_legal' => 'nullable',
            'cellphone_legal' => 'nullable',
            'email_legal' => 'nullable',
            'Sex_legal' => 'nullable',
            'stated' => 'nullable',
        ]);
        // validar campos de usuario 
        $validated_user = $request->validate([
            'user' => 'nullable',
            'password' => 'nullable',
            'name' => 'required',
            'roles_id' => 'nullable',
        ]);
        // Crear un nuevo formato
        $clients = Clients::create($validated_clients);

        // verificando usuario y contraseña, colocando campos nuevos y asignandoles el valor correcto
        if (!empty($validated_user['user'] && !empty($validated_user['password']))){
            $validated_user['email'] = $validated_user['user'];
            $validated_user['roles_id'] = 3;
            $validated_user['password'] = bcrypt($validated_user['password']);
            $user = User::create($validated_user);
        }
    //    retornando la respuesta del servidor
        return response()->json([
            'message' => 'cliente creado con éxito',
            'data' => $clients,
        ], 200);
    }

    // Actualizar un formato existente
    public function updateSeccion(Request $request, $id)
    {
        // Validar los datos
        $validated = $request->validate([
            'codigo_id' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'tipo' => 'required|string|max:255',
            'value' => 'nullable|string',
            'config' => 'nullable|string',
        ]);

        // Encontrar el formato y actualizarlo
        $clients = Clients::findOrFail($id);
        $clients->update($validated);

        return response()->json([
            'message' => 'Cliente actualizado con éxito',
            'data' => $clients,
        ]);
    }

    // Eliminar un formato
    public function deleteFormato(Request $request, $id)
    {
        $clients = Clients::findOrFail($id);
        $clients->delete();

        return response()->json([
            'message' => 'Cliente eliminado con éxito',
        ], 200);
    }
}