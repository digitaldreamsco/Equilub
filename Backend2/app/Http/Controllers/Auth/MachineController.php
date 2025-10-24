<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use Illuminate\Http\Request;

class MachineController extends Controller
{
    public function store(Request $request)
    {
        // Validación de los datos
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'state' => 'nullable|string',
            'type' => 'nullable|string',
            'observation' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        // Crear la máquina
        $machine = Machine::create($validatedData);

        return response()->json([
            'message' => 'Maquinaria creada con éxito',
            'data' => $machine,
        ], 201);
    }
}