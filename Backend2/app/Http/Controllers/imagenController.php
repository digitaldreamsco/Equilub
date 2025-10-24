<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    public function storeGallery(Request $request)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'required|string'
        ]);

        $uploadedImages = [];

        foreach ($request->imagesGallery as $base64Image) {
            // Decodificar la imagen base64
            $decodedImage = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));
            
            // Generar un nombre único para la imagen
            $fileName = Str::uuid() . '.png';
            
            // Guardar la imagen en el disco local
            $path = 'property-images/' . $fileName;
            Storage::disk('local')->put($path, $decodedImage);
            
            // Añadir la ruta de la imagen al array de imágenes subidas
            $uploadedImages[] = $path;
        }

        return response()->json([
            'message' => 'Imágenes subidas con éxito',
            'images' => $uploadedImages
        ], 201);
    }
    
    public function storeImageDefaultd(Request $request)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'required|string'
        ]);

        $base64Image = $request->imagesGallery;
        // Decodificar la imagen base64
        $image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));
            
        // Generar un nombre único para la imagen
        $fileName = Str::uuid() . '.png';
            
        // Guardar la imagen en el disco local
        $path = 'property-images/' . $fileName;
        Storage::disk('local')->put($path, $decodedImage);

        return response()->json([
            'message' => 'Imágenes subidas con éxito',
            'images' => $path
        ], 201);
    }
}