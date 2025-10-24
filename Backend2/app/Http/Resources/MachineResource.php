<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Machine;

class MachineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'state' => $this->state,
            'type' => $this->type,
            'description' => $this->description,
            'observation' => $this->observation,
            'equipment_type' => $this->equipment_type,
            'equipment_type_label' => $this->equipment_type ? Machine::EQUIPMENT_TYPES[$this->equipment_type] ?? $this->equipment_type : null,
            'hierarchy_level' => $this->hierarchy_level,
            'full_path' => $this->full_path,
            'hierarchy_data' => $this->hierarchy_data,
            'parent_id' => $this->parent_id,
            'parent' => $this->whenLoaded('parent', function () {
                return [
                    'id' => $this->parent->id,
                    'name' => $this->parent->name,
                    'equipment_type' => $this->parent->equipment_type,
                    'full_path' => $this->parent->full_path,
                ];
            }),
            'children' => MachineResource::collection($this->whenLoaded('children')),
            'descendants' => MachineResource::collection($this->whenLoaded('descendants')),
            'ancestors' => $this->when($request->include_ancestors, function () {
                return $this->ancestors()->map(function ($ancestor) {
                    return [
                        'id' => $ancestor->id,
                        'name' => $ancestor->name,
                        'equipment_type' => $ancestor->equipment_type,
                    ];
                });
            }),
            'children_count' => $this->when($this->relationLoaded('children'), $this->children->count()),
            'has_children' => $this->when($this->relationLoaded('children'), $this->children->count() > 0),
            'lubrication_studies_count' => $this->whenCounted('lubricationStudies'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
