<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class typeOfIdentity extends Model
{
    use HasFactory;

    protected $table = 'type_of_identity'; // Nombre de la tabla
    protected $fillable = ['name', 'stated']; // Campos rellenables


    public static function typeOfIdentityActive()
    {
        return self::select('name','id')
                    ->where('stated', 1) // solo si esta activa 
                    ->get();
    }
}