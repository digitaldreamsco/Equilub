<?php 

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index(){
        $query = Service::servicesWithMachineAnsUser();
        return response()->json([
            'message' => 'servicios',
            'data' => $query,
        ], 200);
    }
    // buscar servicio por (ref, name, employ, date, etc.).
    public function search(Request $request){
        $query = Service::search($request->search);
        return response()->json([
            'message' => 'servicios',
            'data' => $query,
        ], 200);
    }
    // obtener la información del servicio
    public function details($id){
        $query = Service::servicesWithMachineAnsUserFindOrFail($id);
        return response()->json([
            'message' => 'servicios',
            'data' => $query,
        ], 200);
    }
    public function store(Request $request)
    {
        // Validación de los datos
        $validatedData = $request->validate([
            'ref' => 'nullable',
            'user_id' => 'required|string',
            'name' => 'required|string|max:255',
            'description' => 'nullable',
            'hora' => 'nullable',
            'direccion' => 'nullable',
            'formatt_id' => 'nullable',
            'date' => 'required|date',
            'client_id' => 'required',
            'machine_id' => 'required|exists:machine,id',
            'create_user_id' => 'required|exists:users,id',
            'image' => 'nullable|string', // Nueva validación para la imagen
        ]);
        // Generar un número aleatorio de 8 dígitos y verificar si ya existe
        do {
            $randomRef = rand(10000000, 99999999); // Genera un número aleatorio de 8 dígitos
        } while (Service::where('ref', $randomRef)->exists()); // Verifica si ya existe

        $validatedData['ref'] = $randomRef; // Asigna el número aleatorio al campo 'ref'


         // Manejo de la imagen
         if ($request->has('image') && !empty($request->input('image'))) { // Cambiar para verificar si hay un campo 'image'
            $imageData = $request->input('image'); // Obtener la imagen en Base64
            // Extraer solo la parte Base64 de la cadena
            $imageData = preg_replace('/^data:image\/\w+;base64,/', '', $imageData);
            $imagePath = uniqid() . '.png'; // Generar un nombre único para la imagen
            Storage::disk('public')->put($imagePath, base64_decode($imageData)); // Decodificar y guardar la imagen
            $validatedData['image'] = url('imagen/'. $imagePath); 
        }
        // Crear el servicio
        $service = Service::create($validatedData);

        return response()->json([
            'message' => 'Servicio creado con éxito',
            'data' => $service,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        // Validación de los datos
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable',
            'hora' => 'nullable',
            'direccion' => 'nullable',
            'date' => 'required|date',
            'machine_id' => 'required|exists:machine,id',
            'formatt_id' => 'required|nullable',
            'user_id' => 'required',
            'image' => 'nullable|string', // Nueva validación para la imagen
        ]);

         // Manejo de la imagen
         if ($request->has('image') && !empty($request->input('image'))) { // Cambiar para verificar si hay un campo 'image'
            $imageData = $request->input('image'); // Obtener la imagen en Base64
            // Extraer solo la parte Base64 de la cadena
            $imageData = preg_replace('/^data:image\/\w+;base64,/', '', $imageData);
            $imagePath = uniqid() . '.png'; // Generar un nombre único para la imagen
            Storage::disk('public')->put($imagePath, base64_decode($imageData)); // Decodificar y guardar la imagen
            $validatedData['image'] = url('imagen/'. $imagePath);
        }
        // Crear el servicio
        $service = Service::findOrFail($id);
        $service->update($validatedData); // Asignar los datos validados al modelo

        return response()->json([
            'message' => 'Servicio creado con éxito',
            'data' => $validatedData,
        ], 200);
    }

    public function destroy($id){
         // Buscar el servicio y eliminarlo
         $service = Service::deleteServices($id);

         return response()->json([
             'message' => 'Servicio eliminado con éxito',
         ], 200);
    }
}