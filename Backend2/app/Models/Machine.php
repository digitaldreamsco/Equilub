<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Machine extends Model
{
    use HasFactory;

    protected $table = 'machine'; // Nombre de la tabla
    protected $fillable = [
        'name', 
        'state', 
        'type', 
        'observation', 
        'description',
        'parent_id',
        'equipment_type',
        'hierarchy_data',
        'hierarchy_level',
        'full_path'
    ]; // Campos rellenables

    protected $casts = [
        'hierarchy_data' => 'json',
    ];

    /**
     * Tipos de equipos disponibles
     */
    const EQUIPMENT_TYPES = [
        'equipment' => 'Equipo Principal',
        'subequipment' => 'Sub-equipo',
        'component' => 'Componente',
        'part' => 'Parte'
    ];

    // Relación con estudios de lubricación
    public function lubricationStudies(): HasMany
    {
        return $this->hasMany(LubricationStudy::class, 'machine_id');
    }

    // Relación padre (equipo principal)
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Machine::class, 'parent_id');
    }

    // Relación hijos (sub-equipos, componentes, partes)
    public function children(): HasMany
    {
        return $this->hasMany(Machine::class, 'parent_id');
    }

    // Obtener todos los descendientes (recursivo)
    public function descendants(): HasMany
    {
        return $this->children()->with('descendants');
    }

    // Obtener todos los ancestros
    public function ancestors()
    {
        $ancestors = collect();
        $parent = $this->parent;
        
        while ($parent) {
            $ancestors->prepend($parent);
            $parent = $parent->parent;
        }
        
        return $ancestors;
    }

    // Obtener la ruta completa del equipo
    public function getFullPathAttribute()
    {
        if ($this->parent_id === null) {
            return $this->name;
        }
        
        $ancestors = $this->ancestors();
        $path = $ancestors->pluck('name')->push($this->name)->implode(' > ');
        
        return $path;
    }

    // Verificar si es un equipo principal
    public function isMainEquipment(): bool
    {
        return $this->parent_id === null;
    }

    // Obtener el nivel en la jerarquía
    public function getLevel(): int
    {
        return $this->hierarchy_level ?? 0;
    }

    // Actualizar el path completo al guardar
    protected static function boot()
    {
        parent::boot();
        
        static::saving(function ($machine) {
            // Calcular el nivel de jerarquía
            if ($machine->parent_id === null) {
                $machine->hierarchy_level = 0;
            } else {
                $parent = Machine::find($machine->parent_id);
                $machine->hierarchy_level = ($parent ? $parent->hierarchy_level : 0) + 1;
            }
        });
        
        static::saved(function ($machine) {
            // Actualizar el full_path después de guardar
            $fullPath = $machine->getFullPathAttribute();
            if ($machine->full_path !== $fullPath) {
                Machine::where('id', $machine->id)->update(['full_path' => $fullPath]);
            }
            
            // Actualizar los paths de todos los descendientes
            $machine->updateDescendantsPaths();
        });
    }

    // Actualizar los paths de todos los descendientes
    public function updateDescendantsPaths()
    {
        $this->children->each(function ($child) {
            $fullPath = $child->getFullPathAttribute();
            if ($child->full_path !== $fullPath) {
                Machine::where('id', $child->id)->update(['full_path' => $fullPath]);
            }
            $child->updateDescendantsPaths();
        });
    }

    // Scope para obtener solo equipos principales
    public function scopeMainEquipments($query)
    {
        return $query->whereNull('parent_id');
    }

    // Scope para obtener por tipo de equipo
    public function scopeByType($query, $type)
    {
        return $query->where('equipment_type', $type);
    }
}
