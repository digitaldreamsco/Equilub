<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Machine;

class MachineController extends Controller
{
    // Obtener la lista de máquinas
    public function index()
    {
        $query = Machine::all();

        return response()->json([
            'message' => 'Máquinas obtenidas con éxito',
            'data' => $query,
        ], 200);
    }
    // obtener lista de maquina por id
    public function details($id){
        $query = Machine::findOrFail($id);
        return response()->json([
            'message' => 'Información de Maquina',
            'data' => $query,
        ], 200);
    }

    // Crear una nueva máquina
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'state' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'observation' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        $query = Machine::create($validated);

        return response()->json([
            'message' => 'Máquina creada con éxito',
            'data' => $query,
        ], 201);
    }

     // Crear una nueva máquina
     public function update(Request $request, $id)
     {
         $validated = $request->validate([
             'name' => 'required|string|max:255',
             'state' => 'nullable|string|max:255',
             'type' => 'nullable|string|max:255',
             'observation' => 'nullable|string|max:255',
             'description' => 'nullable|string|max:255',
         ]);
 
         $query = Machine::findOrFail($id);
         $query->update($validated);
 
         return response()->json([
             'message' => 'Máquina actualizada con éxito',
             'data' => $query,
         ], 201);
     }
}