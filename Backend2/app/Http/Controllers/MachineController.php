<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Machine;
use App\Http\Resources\MachineResource;
use Illuminate\Validation\Rule;

class MachineController extends Controller
{
    // Obtener la lista de equipos con su jerarquía
    public function index(Request $request)
    {
        $query = Machine::query();

        // Filtrar por tipo si se especifica
        if ($request->has('equipment_type')) {
            $query->where('equipment_type', $request->equipment_type);
        }

        // Filtrar por equipo padre si se especifica
        if ($request->has('parent_id')) {
            if ($request->parent_id === 'null' || $request->parent_id === null) {
                $query->whereNull('parent_id');
            } else {
                $query->where('parent_id', $request->parent_id);
            }
        }

        // Si no se especifica filtro, mostrar solo equipos principales por defecto
        if (!$request->has('parent_id') && !$request->has('show_all')) {
            $query->whereNull('parent_id');
        }

        // Incluir relaciones
        $query->with(['children', 'parent'])->withCount('lubricationStudies');

        // Ordenar por jerarquía y nombre
        $equipments = $query->orderBy('hierarchy_level')
                           ->orderBy('name')
                           ->get();

        return response()->json([
            'message' => 'Equipos obtenidos con éxito',
            'data' => MachineResource::collection($equipments),
        ], 200);
    }

    // Obtener la jerarquía completa de equipos
    public function hierarchy()
    {
        $mainEquipments = Machine::with('descendants')
                                ->whereNull('parent_id')
                                ->orderBy('name')
                                ->get();

        return response()->json([
            'message' => 'Jerarquía de equipos obtenida con éxito',
            'data' => MachineResource::collection($mainEquipments),
        ], 200);
    }

    // Obtener lista de equipos por id con sus hijos
    public function details($id)
    {
        $equipment = Machine::with(['children', 'parent'])
                           ->withCount('lubricationStudies')
                           ->findOrFail($id);

        return response()->json([
            'message' => 'Información del equipo',
            'data' => new MachineResource($equipment),
        ], 200);
    }

    // Obtener todos los descendientes de un equipo
    public function getDescendants($id)
    {
        $equipment = Machine::with('descendants')->findOrFail($id);
        
        return response()->json([
            'message' => 'Descendientes del equipo obtenidos con éxito',
            'data' => $equipment->descendants,
        ], 200);
    }

    // Crear un nuevo equipo
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'state' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'observation' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'parent_id' => 'nullable|exists:machine,id',
            'equipment_type' => [
                'required',
                Rule::in(array_keys(Machine::EQUIPMENT_TYPES))
            ],
            'hierarchy_data' => 'nullable|array',
        ]);

        // Si tiene padre, validar que no se cree una referencia circular
        if (isset($validated['parent_id']) && $validated['parent_id']) {
            $this->validateNoCircularReference($validated['parent_id'], null);
        }

        $equipment = Machine::create($validated);

        return response()->json([
            'message' => 'Equipo creado con éxito',
            'data' => new MachineResource($equipment->load(['parent', 'children'])),
        ], 201);
    }

    // Actualizar un equipo
    public function update(Request $request, $id)
    {
        $equipment = Machine::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'state' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'observation' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'parent_id' => 'nullable|exists:machine,id',
            'equipment_type' => [
                'required',
                Rule::in(array_keys(Machine::EQUIPMENT_TYPES))
            ],
            'hierarchy_data' => 'nullable|array',
        ]);

        // Si tiene padre, validar que no se cree una referencia circular
        if (isset($validated['parent_id']) && $validated['parent_id']) {
            $this->validateNoCircularReference($validated['parent_id'], $id);
        }

        $equipment->update($validated);

        return response()->json([
            'message' => 'Equipo actualizado con éxito',
            'data' => new MachineResource($equipment->load(['parent', 'children'])),
        ], 200);
    }

    // Eliminar un equipo
    public function destroy(Request $request, $id)
    {
        \Log::info('Intentando eliminar equipo con ID: ' . $id);
        
        $equipment = Machine::findOrFail($id);
        
        \Log::info('Equipo encontrado: ' . $equipment->name);

        // Obtener el parámetro de confirmación
        $forceDelete = $request->get('force', false);
        \Log::info('Eliminación forzada: ' . ($forceDelete ? 'true' : 'false'));

        // Verificar si tiene hijos
        $childrenCount = $equipment->children()->count();
        \Log::info('Número de hijos: ' . $childrenCount);
        
        if ($equipment->children()->exists() && !$forceDelete) {
            \Log::warning('Requiere confirmación - tiene hijos');
            return response()->json([
                'message' => 'Este equipo tiene sub-equipos o componentes. ¿Está seguro que desea eliminarlo junto con todos sus elementos relacionados?',
                'error' => 'EQUIPMENT_HAS_CHILDREN',
                'requires_confirmation' => true,
                'children_count' => $childrenCount
            ], 422);
        }

        // Verificar si tiene estudios de lubricación asociados
        $studiesCount = $equipment->lubricationStudies()->count();
        \Log::info('Número de estudios de lubricación: ' . $studiesCount);
        
        if ($equipment->lubricationStudies()->exists() && !$forceDelete) {
            \Log::warning('Requiere confirmación - tiene estudios de lubricación');
            return response()->json([
                'message' => 'Este equipo tiene estudios de lubricación asociados. ¿Está seguro que desea eliminarlo junto con todos sus estudios?',
                'error' => 'EQUIPMENT_HAS_STUDIES',
                'requires_confirmation' => true,
                'studies_count' => $studiesCount
            ], 422);
        }

        // Si tiene tanto hijos como estudios y es eliminación forzada
        if ($forceDelete) {
            \Log::info('Eliminación forzada - eliminando hijos y estudios relacionados');
            
            // Eliminar estudios de lubricación relacionados
            if ($equipment->lubricationStudies()->exists()) {
                $equipment->lubricationStudies()->delete();
                \Log::info('Estudios de lubricación eliminados');
            }
            
            // Eliminar hijos recursivamente
            if ($equipment->children()->exists()) {
                $this->deleteChildrenRecursively($equipment);
                \Log::info('Hijos eliminados recursivamente');
            }
        }

        \Log::info('Eliminando equipo: ' . $equipment->name);
        $equipment->delete();
        \Log::info('Equipo eliminado exitosamente');

        return response()->json([
            'message' => 'Equipo eliminado con éxito',
        ], 200);
    }

    // Método auxiliar para eliminar hijos recursivamente
    private function deleteChildrenRecursively($equipment)
    {
        foreach ($equipment->children as $child) {
            // Eliminar estudios del hijo
            if ($child->lubricationStudies()->exists()) {
                $child->lubricationStudies()->delete();
            }
            
            // Si el hijo tiene hijos, eliminar recursivamente
            if ($child->children()->exists()) {
                $this->deleteChildrenRecursively($child);
            }
            
            // Eliminar el hijo
            $child->delete();
        }
    }

    // Mover un equipo a otro padre
    public function move(Request $request, $id)
    {
        $equipment = Machine::findOrFail($id);

        $validated = $request->validate([
            'new_parent_id' => 'nullable|exists:machine,id',
        ]);

        // Validar que no se cree una referencia circular
        if ($validated['new_parent_id']) {
            $this->validateNoCircularReference($validated['new_parent_id'], $id);
        }

        $equipment->update(['parent_id' => $validated['new_parent_id']]);

        return response()->json([
            'message' => 'Equipo movido con éxito',
            'data' => $equipment->load(['parent', 'children']),
        ], 200);
    }

    // Obtener tipos de equipos disponibles
    public function getEquipmentTypes()
    {
        return response()->json([
            'message' => 'Tipos de equipos obtenidos con éxito',
            'data' => Machine::EQUIPMENT_TYPES,
        ], 200);
    }

    // Validar que no se cree una referencia circular
    private function validateNoCircularReference($parentId, $currentId = null)
    {
        $parent = Machine::find($parentId);
        
        while ($parent) {
            if ($parent->id == $currentId) {
                abort(400, 'No se puede crear una referencia circular en la jerarquía');
            }
            $parent = $parent->parent;
        }
    }

    // Buscar equipos
    public function search(Request $request)
    {
        $validated = $request->validate([
            'query' => 'required|string|min:2',
            'equipment_type' => 'nullable|string',
        ]);

        $query = Machine::query();

        // Buscar en nombre, descripción y path completo
        $query->where(function ($q) use ($validated) {
            $q->where('name', 'like', '%' . $validated['query'] . '%')
              ->orWhere('description', 'like', '%' . $validated['query'] . '%')
              ->orWhere('full_path', 'like', '%' . $validated['query'] . '%');
        });

        // Filtrar por tipo si se especifica
        if (!empty($validated['equipment_type'])) {
            $query->where('equipment_type', $validated['equipment_type']);
        }

        $results = $query->with(['parent', 'children'])
                        ->withCount('lubricationStudies')
                        ->orderBy('hierarchy_level')
                        ->orderBy('name')
                        ->get();

        return response()->json([
            'message' => 'Búsqueda completada con éxito',
            'data' => MachineResource::collection($results),
        ], 200);
    }
}