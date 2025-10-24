<?php

namespace App\Http\Controllers\Operate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FormatoEstudio;

class StudyLubricationsController extends Controller
{
    // Obtener todos los formatos
    public function store(Request $request)
    {
        $formatos = FormatoEstudio::all();

        return response()->json([
            'message' => 'Formatos obtenidos con éxito',
            'data' => $formatos,
        ], 200);
    }
}