<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $table = 'service'; // Nombre de la tabla
    protected $fillable = [
        'ref',
        'name',
        'description',
        'direccion',
        'hora',
        'formatt_id',
        'image',
        'date',
        'machine_id',
        'user_id',
        'create_user_id',
        'client_id',
    ];

    // Relación con Machine
    public function machine()
    {
        return $this->belongsTo(Machine::class, 'machine_id');
    }

    // Relación con LubricationStudy
    public function lubricationStudies()
    {
        return $this->hasMany(LubricationStudy::class, 'service_id');
    }

    // Relación con el Usuario que creó el servicio
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'create_user_id');
    }

    // Relación con el Usuario asignado
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // search para cada servicio
    public static function search($query)
    {
        return self::where('name', 'like', "%{$query}%")
                    ->orWhere('ref', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%")
                    ->orWhere('date', 'like', "%{$query}%")
                    ->orWhereHas('user', function($u) use ($query){
                        $u->where('name', 'like', "%{$query}%");
                    })
                    ->orWhereHas('machine', function($m) use ($query){
                        $m->where('name','like', "%{$query}%");
                    })
                    ->with('user:id,name,lastname', 'machine:id,name,state')
                    ->get();
    }
    public static function forUser($query, $date)
    {
        if($date == 'now'){
            return self::where('date', (new \DateTime())->format('Y-m-d'))
                    ->where('user_id', $query)
                    ->with('user:id,name,lastname', 'machine:id,name,state')
                    ->get();
        }else if($date == 'next'){
            return self::where('date', (new \DateTime())->modify('+1 day')->format('Y-m-d'))
                    ->where('user_id', $query)
                    ->with('user:id,name,lastname', 'machine:id,name,state')
                    ->get();
        }
        
    }

    public static function servicesWithMachineAnsUser()
    {
        return self::with('user:id,name,lastname', 'machine:id,name,state')
                    ->get();
    }
    public static function servicesWithMachineAnsUserFindOrFail($id)
    {
        return self::with('user:id,name,lastname', 'machine:id,name,state')
                    ->findOrFail($id);
    }
    
    public static function servicesIdViewFormattId($id)
    {
        return self::select('formatt_id')->findOrFail($id);
    }

    public static function AllUserId($query)
    {
        return self::where('user_id', $query)
                    ->get();
    }

    public static function deleteServices($id)
    {
        return self::findOrFail($id)->delete();
    }
}
