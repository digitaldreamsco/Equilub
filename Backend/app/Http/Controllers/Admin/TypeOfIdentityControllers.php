<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FormatoEstudio;
use App\Models\TypeOfIdentity;

class TypeOfIdentityControllers extends Controller
{
    // Obtener todos los formatos
    public function getAllIdentity(Request $request)
    {
        $allclients = TypeOfIdentity::all();

        return response()->json([
            'message' => 'Clientes obtenidos con éxito',
            'data' => $allclients,
        ], 200);
    }

     // Obtener todos los formatos
     public function active()
     {
        try {
            //code...
            $typeOfIdentity = TypeOfIdentity::typeOfIdentityActive();
            return response()->json([
                'message' => 'Clientes obtenidos con éxito',
                'data' => $typeOfIdentity,
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
    public function saveSeccion(Request $request)
    {
        // Validar los datos
        $validated = $request->validate([
            'codigo_id' => 'required|string|max:255',
            'name' => 'required|string|max:355',
            'tipo' => 'required|string|max:255',
            'value' => 'nullable',
            'config' => 'nullable',
        ]);

        // Crear un nuevo formato
        $formato = FormatoEstudio::create($validated);

        return response()->json([
            'message' => 'Formato creado con éxito',
            'data' => $formato,
        ], 201);
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
        $formato = FormatoEstudio::findOrFail($id);
        $formato->update($validated);

        return response()->json([
            'message' => 'Formato actualizado con éxito',
            'data' => $formato,
        ]);
    }

    // Eliminar un formato
    public function distroy(Request $request, $id)
    {
        $formato = FormatoEstudio::findOrFail($id);
        $formato->delete();

        return response()->json([
            'message' => 'Formato eliminado con éxito',
        ], 200);
    }
}