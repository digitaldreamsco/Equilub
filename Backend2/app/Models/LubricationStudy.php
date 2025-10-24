<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LubricationStudy extends Model
{
    use HasFactory;

    protected $table = 'lubrications_study';
    protected $fillable = ['service_id', 'machine_id', 'documents'];

    // Relación con Machine
    public function machine()
    {
        return $this->belongsTo(Machine::class, 'machine_id');
    }

    // Relación con Service
    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
}
