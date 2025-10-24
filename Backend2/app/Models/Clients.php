<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    use HasFactory;

    protected $table = 'clients'; // Nombre de la tabla
    protected $fillable = ['user_id', 'type_client', 'type_id', 'number_id', 'name', 'lastname', 'cellphone', 'address', 'email', 'Sex', 'People_legal', 'cellphone_legal', 'email_legal', 'Sex_legal', 'stated']; // Campos rellenables


    public static function ClientsDropdown()
    {
        return self::select('user_id','name','lastname','id')
                    ->where('stated', 1) // solo si esta activa 
                    ->get();
    }
}