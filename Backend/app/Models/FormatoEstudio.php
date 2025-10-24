<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormatoEstudio extends Model
{
    use HasFactory;

    protected $table = 'formatt_study'; // Nombre de la tabla
    protected $fillable = ['codigo_id', 'name', 'tipo', 'value', 'config']; // Campos rellenables


    // search para cada servicio
    public static function FormmatID($query)
    {
        return self::findOrFail($query);
    }

}