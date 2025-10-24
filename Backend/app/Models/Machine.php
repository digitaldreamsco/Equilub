<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    use HasFactory;

    protected $table = 'machine'; // Nombre de la tabla
    protected $fillable = ['name', 'state', 'type', 'observation', 'description']; // Campos rellenables

    // Relación con estudios de lubricación
    public function lubricationStudies()
    {
        return $this->hasMany(LubricationStudy::class, 'machine_id');
    }
}
