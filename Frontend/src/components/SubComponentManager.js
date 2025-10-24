'use client';

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlus, 
    faTrash, 
    faChevronDown, 
    faChevronRight, 
    faGear,
    faCog,
    faWrench
} from '@fortawesome/free-solid-svg-icons'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Button from '@/components/Button'

const SubComponentManager = ({ 
    components = [], 
    onComponentsChange, 
    maxDepth = 3, 
    currentDepth = 0,
    parentPath = '',
    disabled = false 
}) => {
    const [expandedItems, setExpandedItems] = useState({})
    const [showSubComponentForm, setShowSubComponentForm] = useState({})

    const toggleExpanded = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const toggleSubComponentForm = (index) => {
        setShowSubComponentForm(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const addComponent = () => {
        const newComponent = {
            id: Date.now() + Math.random(),
            name: '',
            type: '',
            description: '',
            state: 'Operativo',
            observation: '',
            children: []
        }
        
        const updatedComponents = [...components, newComponent]
        onComponentsChange(updatedComponents)
    }

    const updateComponent = (index, field, value) => {
        const updatedComponents = [...components]
        updatedComponents[index] = {
            ...updatedComponents[index],
            [field]: value
        }
        onComponentsChange(updatedComponents)
    }

    const updateSubComponents = (index, subComponents) => {
        const updatedComponents = [...components]
        updatedComponents[index] = {
            ...updatedComponents[index],
            children: subComponents
        }
        onComponentsChange(updatedComponents)
    }

    const removeComponent = (index) => {
        const updatedComponents = components.filter((_, i) => i !== index)
        onComponentsChange(updatedComponents)
    }

    const getDepthIcon = (depth) => {
        switch (depth) {
            case 0: return faGear
            case 1: return faCog
            case 2: return faWrench
            default: return faGear
        }
    }

    const getDepthLabel = (depth) => {
        return `Sub-componente ${depth > 0 ? `(Nivel ${depth + 1})` : ''}`
    }

    const getDepthColor = (depth) => {
        switch (depth) {
            case 0: return 'border-blue-200 bg-blue-50'
            case 1: return 'border-green-200 bg-green-50'
            case 2: return 'border-orange-200 bg-orange-50'
            default: return 'border-gray-200 bg-gray-50'
        }
    }

    if (disabled) {
        return (
            <div className="space-y-4">
                {components.map((component, index) => (
                    <div 
                        key={component.id || index} 
                        className={`border rounded-lg p-4 ${getDepthColor(currentDepth)}`}
                    >
                        <div className="flex items-center space-x-3 mb-2">
                            <FontAwesomeIcon 
                                icon={getDepthIcon(currentDepth)} 
                                className="text-gray-600"
                            />
                            <span className="font-medium text-gray-900">
                                {component.name || 'Sin nombre'}
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                                {getDepthLabel(currentDepth)}
                            </span>
                        </div>
                        
                        {component.description && (
                            <p className="text-sm text-gray-600 mb-2">
                                {component.description}
                            </p>
                        )}
                        
                        {component.children && component.children.length > 0 && (
                            <div className="mt-4 ml-6">
                                <SubComponentManager
                                    components={component.children}
                                    onComponentsChange={() => {}}
                                    maxDepth={maxDepth}
                                    currentDepth={currentDepth + 1}
                                    parentPath={`${parentPath}${component.name}/`}
                                    disabled={true}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
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
                        
                        <div className="flex items-center space-x-2">
                            {component.children && component.children.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => toggleExpanded(index)}
                                    className="p-1 text-gray-500 hover:text-gray-700"
                                >
                                    <FontAwesomeIcon 
                                        icon={expandedItems[index] ? faChevronDown : faChevronRight}
                                        className="text-xs"
                                    />
                                </button>
                            )}
                            
                            <button
                                type="button"
                                onClick={() => removeComponent(index)}
                                className="p-1 text-red-500 hover:text-red-700"
                                title="Eliminar"
                            >
                                <FontAwesomeIcon icon={faTrash} className="text-xs" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label htmlFor={`component-name-${index}`}>
                                Nombre del {currentDepth === 0 ? 'Componente' : 'Sub-componente'}
                            </Label>
                            <Input
                                id={`component-name-${index}`}
                                type="text"
                                value={component.name}
                                onChange={(e) => updateComponent(index, 'name', e.target.value)}
                                placeholder={`Ej: Motor, Sistema hidráulico, Válvula...`}
                                className="w-full text-sm"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor={`component-type-${index}`}>Tipo</Label>
                            <Input
                                id={`component-type-${index}`}
                                type="text"
                                value={component.type}
                                onChange={(e) => updateComponent(index, 'type', e.target.value)}
                                placeholder="Ej: Eléctrico, Mecánico..."
                                className="w-full text-sm"
                            />
                        </div>

                        <div>
                            <Label htmlFor={`component-state-${index}`}>Estado</Label>
                            <select
                                id={`component-state-${index}`}
                                value={component.state}
                                onChange={(e) => updateComponent(index, 'state', e.target.value)}
                                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                            >
                                <option value="Operativo">Operativo</option>
                                <option value="Mantenimiento">Mantenimiento</option>
                                <option value="Atención">Requiere Atención</option>
                                <option value="Fuera de servicio">Fuera de Servicio</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor={`component-description-${index}`}>Descripción</Label>
                            <Input
                                id={`component-description-${index}`}
                                type="text"
                                value={component.description}
                                onChange={(e) => updateComponent(index, 'description', e.target.value)}
                                placeholder="Descripción breve..."
                                className="w-full text-sm"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor={`component-observation-${index}`}>Observaciones</Label>
                        <textarea
                            id={`component-observation-${index}`}
                            rows={2}
                            value={component.observation}
                            onChange={(e) => updateComponent(index, 'observation', e.target.value)}
                            placeholder="Observaciones adicionales..."
                            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    {/* Sub-componentes */}
                    {currentDepth < maxDepth && (
                        <div className="border-t pt-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                    <h4 className="text-sm font-medium text-gray-700">
                                        Sub-componentes
                                        {component.children && component.children.length > 0 && 
                                            ` (${component.children.length})`}
                                    </h4>
                                    {component.children && component.children.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => toggleExpanded(index)}
                                            className="text-xs text-blue-600 hover:text-blue-800"
                                        >
                                            {expandedItems[index] ? 'Ocultar' : 'Mostrar'}
                                        </button>
                                    )}
                                </div>
                                
                                <button
                                    type="button"
                                    onClick={() => toggleSubComponentForm(index)}
                                    className="flex items-center space-x-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors border border-blue-300"
                                >
                                    <FontAwesomeIcon icon={faPlus} className="text-xs" />
                                    <span>Agregar Sub-componente</span>
                                </button>
                            </div>

                            {/* Formulario para agregar sub-componente */}
                            {showSubComponentForm[index] && (
                                <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                    <h5 className="text-sm font-medium text-gray-800 mb-3">
                                        Nuevo Sub-componente
                                    </h5>
                                    <form 
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            const formData = new FormData(e.target)
                                            const newSubComponent = {
                                                id: Date.now() + Math.random(),
                                                name: formData.get('subComponentName'),
                                                type: formData.get('subComponentType'),
                                                description: formData.get('subComponentDescription'),
                                                state: formData.get('subComponentState'),
                                                observation: formData.get('subComponentObservation'),
                                                children: []
                                            }
                                            updateSubComponents(index, [...(component.children || []), newSubComponent])
                                            setExpandedItems(prev => ({ ...prev, [index]: true }))
                                            setShowSubComponentForm(prev => ({ ...prev, [index]: false }))
                                            e.target.reset()
                                        }}
                                        className="space-y-3"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <Label htmlFor={`subComponentName-${index}`}>Nombre</Label>
                                                <Input
                                                    id={`subComponentName-${index}`}
                                                    name="subComponentName"
                                                    type="text"
                                                    placeholder="Nombre del sub-componente"
                                                    className="w-full text-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`subComponentType-${index}`}>Tipo</Label>
                                                <Input
                                                    id={`subComponentType-${index}`}
                                                    name="subComponentType"
                                                    type="text"
                                                    placeholder="Tipo"
                                                    className="w-full text-sm"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`subComponentState-${index}`}>Estado</Label>
                                                <select
                                                    id={`subComponentState-${index}`}
                                                    name="subComponentState"
                                                    className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                                    defaultValue="Operativo"
                                                >
                                                    <option value="Operativo">Operativo</option>
                                                    <option value="Mantenimiento">Mantenimiento</option>
                                                    <option value="Atención">Requiere Atención</option>
                                                    <option value="Fuera de servicio">Fuera de Servicio</option>
                                                </select>
                                            </div>
                                            <div>
                                                <Label htmlFor={`subComponentDescription-${index}`}>Descripción</Label>
                                                <Input
                                                    id={`subComponentDescription-${index}`}
                                                    name="subComponentDescription"
                                                    type="text"
                                                    placeholder="Descripción breve"
                                                    className="w-full text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor={`subComponentObservation-${index}`}>Observaciones</Label>
                                            <textarea
                                                id={`subComponentObservation-${index}`}
                                                name="subComponentObservation"
                                                rows={2}
                                                placeholder="Observaciones adicionales"
                                                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => setShowSubComponentForm(prev => ({ ...prev, [index]: false }))}
                                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                                            >
                                                Agregar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Lista de sub-componentes existentes */}
                            {component.children && component.children.length > 0 && (
                                <div className={`ml-4 ${expandedItems[index] !== false ? 'block' : 'hidden'}`}>
                                    <SubComponentManager
                                        components={component.children}
                                        onComponentsChange={(subComponents) => updateSubComponents(index, subComponents)}
                                        maxDepth={maxDepth}
                                        currentDepth={currentDepth + 1}
                                        parentPath={`${parentPath}${component.name}/`}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={addComponent}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400 rounded-lg transition-colors"
            >
                <FontAwesomeIcon icon={faPlus} />
                <span>Agregar {currentDepth === 0 ? 'Componente' : 'Sub-componente'}</span>
            </button>
        </div>
    )
}

export default SubComponentManager
