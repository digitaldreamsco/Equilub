<?php

namespace App\Http\Controllers;

use App\Models\LubricationStudy;

class LubricationStudyController extends Controller
{
    public function index()
    {
        // Obtener estudios de lubricación con relaciones
        $studies = LubricationStudy::with(['service', 'machine'])->get();

        return response()->json($studies);
    }

    public function show($id)
    {
        // Obtener un estudio específico por su ID
        $study = LubricationStudy::with(['service', 'machine'])->findOrFail($id);

        return response()->json($study);
    }

    public function store(Request $request)
{
    $validatedData = $request->validate([
        'service_id' => 'required|exists:service,id',
        'machine_id' => 'required|exists:machine,id',
        'documents' => 'nullable|string',
    ]);

    $study = LubricationStudy::create($validatedData);

    return response()->json([
        'message' => 'Estudio de lubricación creado con éxito',
        'data' => $study,
    ], 201);
}

public function destroy($id)
{
    $study = LubricationStudy::findOrFail($id);

    $study->delete();

    return response()->json([
        'message' => 'Estudio de lubricación eliminado con éxito',
    ], 200);
}

}

