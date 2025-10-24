'use client';

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEdit, 
    faSave, 
    faCancel,
    faGear,
    faCog,
    faWrench,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import Label from '@/components/Label'
import Input from '@/components/Input'
import { useMachine } from '@/hooks/machine'

const EditableComponentView = ({ 
    components = [], 
    onComponentUpdate,
    onComponentDelete,
    maxDepth = 3, 
    currentDepth = 0,
    parentPath = '',
    disabled = false 
}) => {
    const [editingComponent, setEditingComponent] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { saveUpdateMachine, deleteMachine } = useMachine()

    const getDepthIcon = (depth) => {
        switch (depth) {
            case 0: return faGear
            case 1: return faCog
            case 2: return faWrench
            default: return faGear
        }
    }

    const getDepthColor = (depth) => {
        switch (depth) {
            case 0: return 'border-blue-200 bg-blue-50'
            case 1: return 'border-green-200 bg-green-50'
            case 2: return 'border-orange-200 bg-orange-50'
            default: return 'border-gray-200 bg-gray-50'
        }
    }

    const handleEdit = (component) => {
        setEditingComponent({
            ...component,
            originalData: { ...component }
        })
    }

    const handleSave = async (component) => {
        setIsSubmitting(true)
        try {
            const updateData = {
                id: component.id,
                name: component.name,
                type: component.type,
                description: component.description,
                state: component.state,
                observation: component.observation
            }
            
            await saveUpdateMachine(updateData)
            setEditingComponent(null)
            
            if (onComponentUpdate) {
                onComponentUpdate(component.id, updateData)
            }
        } catch (error) {
            console.error('Error al actualizar componente:', error)
            alert('Error al actualizar el componente')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        setEditingComponent(null)
    }

    const handleDelete = async (component) => {
        if (confirm(`¿Estás seguro de que quieres eliminar "${component.name}"?`)) {
            try {
                const result = await deleteMachine({ id: component.id })
                
                // Si requiere confirmación, mostrar confirmación especial
                if (result && result.requiresConfirmation) {
                    const forceConfirm = confirm(
                        `${result.message}\n\n` +
                        `${result.childrenCount ? `Sub-equipos/Componentes: ${result.childrenCount}\n` : ''}` +
                        `${result.studiesCount ? `Estudios de lubricación: ${result.studiesCount}\n` : ''}` +
                        `\nEsta acción eliminará permanentemente todo el contenido asociado. ¿Continuar?`
                    )
                    
                    if (forceConfirm) {
                        await deleteMachine({ id: component.id, forceDelete: true })
                        if (onComponentDelete) {
                            onComponentDelete(component.id)
                        }
                    }
                } else {
                    // Eliminación exitosa normal
                    if (onComponentDelete) {
                        onComponentDelete(component.id)
                    }
                }
            } catch (error) {
                console.error('Error al eliminar componente:', error)
                alert('Error al eliminar el componente')
            }
        }
    }

    const updateEditingComponent = (field, value) => {
        setEditingComponent(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <div className="space-y-4">
            {components.map((component, index) => (
                <div 
                    key={component.id || index} 
                    className={`border rounded-lg p-4 ${getDepthColor(currentDepth)}`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <FontAwesomeIcon 
                                icon={getDepthIcon(currentDepth)} 
                                className="text-gray-600"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                {currentDepth === 0 ? 'Componente' : 'Sub-componente'} #{index + 1}
                            </span>
                            {parentPath && (
                                <span className="text-xs text-gray-500">
                                    {parentPath}
                                </span>
                            )}
                        </div>
                        
                        {!disabled && (
                            <div className="flex items-center space-x-2">
                                {editingComponent?.id === component.id ? (
                                    <>
                                        <button
                                            onClick={handleCancel}
                                            className="p-1 text-gray-500 hover:text-gray-700 text-xs"
                                            disabled={isSubmitting}
                                        >
                                            <FontAwesomeIcon icon={faCancel} />
                                        </button>
                                        <button
                                            onClick={() => handleSave(editingComponent)}
                                            className="p-1 text-green-500 hover:text-green-700 text-xs"
                                            disabled={isSubmitting}
                                        >
                                            <FontAwesomeIcon icon={faSave} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(component)}
                                            className="p-1 text-blue-500 hover:text-blue-700 text-xs"
                                            title="Editar"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(component)}
                                            className="p-1 text-red-500 hover:text-red-700 text-xs"
                                            title="Eliminar"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {editingComponent?.id === component.id ? (
                        // Modo edición
                        <div className="space-y-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`edit-name-${component.id}`}>
                                        Nombre del {currentDepth === 0 ? 'Componente' : 'Sub-componente'}
                                    </Label>
                                    <Input
                                        id={`edit-name-${component.id}`}
                                        type="text"
                                        value={editingComponent.name}
                                        onChange={(e) => updateEditingComponent('name', e.target.value)}
                                        className="w-full text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor={`edit-type-${component.id}`}>Categoría/Tipo</Label>
                                    <Input
                                        id={`edit-type-${component.id}`}
                                        type="text"
                                        value={editingComponent.type}
                                        onChange={(e) => updateEditingComponent('type', e.target.value)}
                                        className="w-full text-sm"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor={`edit-equipment_type-${component.id}`}>Tipo de Equipo</Label>
                                    <select
                                        id={`edit-equipment_type-${component.id}`}
                                        value={editingComponent.equipment_type}
                                        onChange={(e) => updateEditingComponent('equipment_type', e.target.value)}
                                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="equipment">Equipo Principal</option>
                                        <option value="subequipment">Sub-equipo</option>
                                        <option value="component">Componente</option>
                                        <option value="part">Parte</option>
                                    </select>
                                </div>

                                <div>
                                    <Label htmlFor={`edit-state-${component.id}`}>Estado</Label>
                                    <select
                                        id={`edit-state-${component.id}`}
                                        value={editingComponent.state}
                                        onChange={(e) => updateEditingComponent('state', e.target.value)}
                                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="Operativo">Operativo</option>
                                        <option value="Mantenimiento">Mantenimiento</option>
                                        <option value="Atención">Requiere Atención</option>
                                        <option value="Fuera de servicio">Fuera de Servicio</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor={`edit-description-${component.id}`}>Descripción</Label>
                                    <Input
                                        id={`edit-description-${component.id}`}
                                        type="text"
                                        value={editingComponent.description}
                                        onChange={(e) => updateEditingComponent('description', e.target.value)}
                                        className="w-full text-sm"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor={`edit-observation-${component.id}`}>Observaciones</Label>
                                    <textarea
                                        id={`edit-observation-${component.id}`}
                                        rows={2}
                                        value={editingComponent.observation}
                                        onChange={(e) => updateEditingComponent('observation', e.target.value)}
                                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Modo vista
                        <div className="space-y-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <span className="text-xs text-gray-500 block">Nombre</span>
                                    <span className="font-medium text-gray-900">
                                        {component.name || 'Sin nombre'}
                                    </span>
                                </div>

                                <div>
                                    <span className="text-xs text-gray-500 block">Categoría/Tipo</span>
                                    <span className="text-gray-700">
                                        {component.type || 'Sin especificar'}
                                    </span>
                                </div>

                                <div>
                                    <span className="text-xs text-gray-500 block">Tipo de Equipo</span>
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                        component.equipment_type === 'equipment' ? 'bg-blue-100 text-blue-800' :
                                        component.equipment_type === 'subequipment' ? 'bg-green-100 text-green-800' :
                                        component.equipment_type === 'component' ? 'bg-yellow-100 text-yellow-800' :
                                        component.equipment_type === 'part' ? 'bg-purple-100 text-purple-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {component.equipment_type === 'equipment' ? 'Equipo Principal' :
                                         component.equipment_type === 'subequipment' ? 'Sub-equipo' :
                                         component.equipment_type === 'component' ? 'Componente' :
                                         component.equipment_type === 'part' ? 'Parte' :
                                         'Sin especificar'}
                                    </span>
                                </div>

                                <div>
                                    <span className="text-xs text-gray-500 block">Estado</span>
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                        component.state === 'Operativo' ? 'bg-green-100 text-green-800' :
                                        component.state === 'Mantenimiento' ? 'bg-yellow-100 text-yellow-800' :
                                        component.state === 'Atención' ? 'bg-orange-100 text-orange-800' :
                                        component.state === 'Fuera de servicio' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {component.state || 'Sin estado'}
                                    </span>
                                </div>

                                <div className="md:col-span-2">
                                    <span className="text-xs text-gray-500 block">Descripción</span>
                                    <span className="text-gray-700">
                                        {component.description || 'Sin descripción'}
                                    </span>
                                </div>
                            </div>

                            {component.observation && (
                                <div>
                                    <span className="text-xs text-gray-500 block">Observaciones</span>
                                    <span className="text-gray-700">
                                        {component.observation}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Información de jerarquía del componente */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
                        <h5 className="text-xs font-medium text-gray-900 mb-2">Información de Jerarquía</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                            <div>
                                <span className="font-medium text-gray-700">Nivel:</span>
                                <span className="ml-2 text-gray-600">{component.hierarchy_level || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Ruta:</span>
                                <span className="ml-2 text-gray-600">{component.full_path || component.name}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">ID:</span>
                                <span className="ml-2 text-gray-600">{component.id}</span>
                            </div>
                            {component.parent_id && (
                                <div>
                                    <span className="font-medium text-gray-700">Parent ID:</span>
                                    <span className="ml-2 text-gray-600">{component.parent_id}</span>
                                </div>
                            )}
                            <div>
                                <span className="font-medium text-gray-700">Tipo Equipo:</span>
                                <span className="ml-2 text-gray-600">{component.equipment_type || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Creado:</span>
                                <span className="ml-2 text-gray-600">
                                    {component.created_at ? new Date(component.created_at).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Sub-componentes recursivos */}
                    {component.children && component.children.length > 0 && (
                        <div className="border-t pt-4 ml-4 mt-4">
                            <div className="mb-2">
                                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                    Sub-componentes ({component.children.length})
                                </span>
                            </div>
                            <EditableComponentView
                                components={component.children}
                                onComponentUpdate={onComponentUpdate}
                                onComponentDelete={onComponentDelete}
                                maxDepth={maxDepth}
                                currentDepth={currentDepth + 1}
                                parentPath={`${parentPath}${component.name}/`}
                                disabled={disabled}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default EditableComponentView
