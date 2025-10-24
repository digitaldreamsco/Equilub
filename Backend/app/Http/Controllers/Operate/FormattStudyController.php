<?php

namespace App\Http\Controllers\Operate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FormatoEstudio;
use App\Models\Service;

class FormattStudyController extends Controller
{
    // Obtener todos los formatos
    public function getFormattId(Request $request, $id)
    {
        $service = Service::servicesIdViewFormattId($id);
        $formatt = FormatoEstudio::FormmatID($service->formatt_id);
        if($formatt) $formatt->value = json_decode($formatt->value);
        if($formatt) $formatt->config = json_decode($formatt->config);
        return response()->json([
            'message' => 'Formatos obtenidos con éxito',
            'data' => $formatt,
        ], 200);
    }
}