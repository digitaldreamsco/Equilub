'use client';

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useMachine } from '@/hooks/machine'
import SubComponentManager from '@/components/SubComponentManager'
import EditableComponentView from '@/components/EditableComponentView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTractor, 
    faEdit, 
    faSave, 
    faCancel, 
    faChevronDown, 
    faChevronUp,
    faArrowLeft,
    faTree,
    faInfo
} from '@fortawesome/free-solid-svg-icons'

function EquipmentDetailPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id
    const { getMachineId, getMachineDescendants, saveUpdateMachine } = useMachine()
    
    // Estados del equipo principal
    const [equipment, setEquipment] = useState(null)
    const [descendants, setDescendants] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    // Estados de edición
    const [isEditing, setIsEditing] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showComponents, setShowComponents] = useState(true)
    
    // Estados del formulario
    const [formData, setFormData] = useState({
        name: '',
        state: '',
        type: '',
        description: '',
        observation: '',
        equipment_type: ''
    })
    
    // Estados de componentes
    const [components, setComponents] = useState([])

    useEffect(() => {
        if (id) {
            loadEquipmentData()
        }
    }, [id])

    const loadEquipmentData = async () => {
        setLoading(true)
        try {
            // Cargar datos del equipo principal
            await getMachineId({
                id: id,
                setMaquinas: (data) => {
                    console.log('Datos del equipo principal recibidos:', data)
                    setEquipment(data)
                    setFormData({
                        name: data.name || '',
                        state: data.state || '',
                        type: data.type || '',
                        description: data.description || '',
                        observation: data.observation || '',
                        equipment_type: data.equipment_type || ''
                    })
                }
            })
            
            // Cargar descendientes (componentes jerárquicos)
            await getMachineDescendants({
                id: id,
                setMaquinas: (data) => {
                    console.log('Datos de descendientes recibidos:', data)
                    setDescendants(data)
                    // Convertir descendientes a formato de componentes para SubComponentManager
                    const convertedComponents = convertDescendantsToComponents(data)
                    console.log('Componentes convertidos:', convertedComponents)
                    setComponents(convertedComponents)
                }
            })
        } catch (error) {
            console.error('Error al cargar equipo:', error)
            setError('Error al cargar los datos del equipo')
        } finally {
            setLoading(false)
        }
    }

    // Convertir descendientes del backend al formato que espera SubComponentManager
    const convertDescendantsToComponents = (descendants) => {
        const componentsMap = new Map()
        const rootComponents = []

        // Primero, crear todos los componentes con toda la información
        descendants.forEach(descendant => {
            const component = {
                id: descendant.id,
                name: descendant.name,
                type: descendant.type,
                description: descendant.description,
                state: descendant.state,
                observation: descendant.observation,
                equipment_type: descendant.equipment_type,
                parent_id: descendant.parent_id,
                hierarchy_level: descendant.hierarchy_level,
                full_path: descendant.full_path,
                created_at: descendant.created_at,
                updated_at: descendant.updated_at,
                children: []
            }
            componentsMap.set(descendant.id, component)
        })

        // Luego, construir la jerarquía
        descendants.forEach(descendant => {
            const component = componentsMap.get(descendant.id)
            
            if (descendant.parent_id === parseInt(id)) {
                // Es un componente de primer nivel
                rootComponents.push(component)
            } else {
                // Es un sub-componente, encontrar su padre
                const parent = componentsMap.get(descendant.parent_id)
                if (parent) {
                    parent.children.push(component)
                }
            }
        })

        return rootComponents
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSave = async () => {
        setIsSubmitting(true)
        try {
            const updateData = {
                id: equipment.id,
                ...formData
            }
            
            await saveUpdateMachine(updateData)
            
            // Recargar datos
            await loadEquipmentData()
            setIsEditing(false)
            
        } catch (error) {
            console.error('Error al actualizar equipo:', error)
            alert('Error al actualizar el equipo')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleComponentUpdate = async (componentId, updateData) => {
        try {
            // Recargar los datos después de actualizar un componente
            await loadEquipmentData()
        } catch (error) {
            console.error('Error al recargar datos después de actualizar componente:', error)
        }
    }

    const handleComponentDelete = async (componentId) => {
        try {
            // Recargar los datos después de eliminar un componente
            await loadEquipmentData()
        } catch (error) {
            console.error('Error al recargar datos después de eliminar componente:', error)
        }
    }

    const handleCancel = () => {
        // Restaurar datos originales
        if (equipment) {
            setFormData({
                name: equipment.name || '',
                state: equipment.state || '',
                type: equipment.type || '',
                description: equipment.description || '',
                observation: equipment.observation || '',
                equipment_type: equipment.equipment_type || ''
            })
        }
        setIsEditing(false)
    }

    if (loading) {
        return (
            <div className="py-12 px-5 bg-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center">
                        <div className="text-xl text-gray-600">Cargando equipo...</div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !equipment) {
        return (
            <div className="py-12 px-5 bg-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-900">Error</h3>
                        <p className="text-red-700">{error || 'Equipo no encontrado'}</p>
                        <Button 
                            onClick={() => router.push('/machine')}
                            className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                        >
                            Volver a la lista
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-5 px-5 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-8 bg-white">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <Button
                                    onClick={() => router.push('/machine')}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                                    Volver
                                </Button>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faTractor} className="mr-3 text-blue-600 text-xl" />
                                    <h2 className="font-bold text-xl text-gray-900">
                                        {isEditing ? 'Editando Equipo' : 'Detalles del Equipo'}
                                    </h2>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                {!isEditing ? (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        Editar
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            onClick={handleCancel}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2"
                                            disabled={isSubmitting}
                                        >
                                            <FontAwesomeIcon icon={faCancel} className="mr-2" />
                                            Cancelar
                                        </Button>
                                        <Button
                                            onClick={handleSave}
                                            className={`${isSubmitting 
                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                : 'bg-green-600 hover:bg-green-700'
                                            } text-white px-4 py-2`}
                                            disabled={isSubmitting}
                                        >
                                            <FontAwesomeIcon icon={faSave} className="mr-2" />
                                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Información básica del equipo */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <div className="flex items-center mb-4">
                                <FontAwesomeIcon icon={faInfo} className="mr-2 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="name">Nombre del Equipo</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full text-sm"
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="equipment_type">Tipo de Equipo</Label>
                                    <select
                                        id="equipment_type"
                                        value={formData.equipment_type}
                                        onChange={(e) => handleInputChange('equipment_type', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="equipment">Equipo Principal</option>
                                        <option value="subequipment">Sub-equipo</option>
                                        <option value="component">Componente</option>
                                        <option value="part">Parte</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <Label htmlFor="state">Estado</Label>
                                    <select
                                        id="state"
                                        value={formData.state}
                                        onChange={(e) => handleInputChange('state', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="Operativo">Operativo</option>
                                        <option value="Mantenimiento">Mantenimiento</option>
                                        <option value="Atención">Requiere Atención</option>
                                        <option value="Fuera de servicio">Fuera de Servicio</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <Label htmlFor="type">Categoría/Tipo</Label>
                                    <Input
                                        id="type"
                                        type="text"
                                        value={formData.type}
                                        onChange={(e) => handleInputChange('type', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full text-sm"
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <Label htmlFor="description">Descripción</Label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            
                            <div className="mt-4">
                                <Label htmlFor="observation">Observaciones</Label>
                                <textarea
                                    id="observation"
                                    rows={3}
                                    value={formData.observation}
                                    onChange={(e) => handleInputChange('observation', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                        </div>

                        {/* Sección de componentes y partes */}
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <div 
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setShowComponents(!showComponents)}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faTree} className="text-green-600 text-sm" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {equipment.equipment_type === 'equipment' ? 'Componentes y Sub-componentes' : 
                                             equipment.equipment_type === 'subequipment' ? 'Componentes' :
                                             equipment.equipment_type === 'component' ? 'Sub-componentes' :
                                             'Elementos hijos'}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Estructura jerárquica 
                                            {descendants.length > 0 ? ` (${descendants.length} elementos)` : ' (sin elementos)'}
                                        </p>
                                    </div>
                                </div>
                                <FontAwesomeIcon 
                                    icon={showComponents ? faChevronUp : faChevronDown} 
                                    className="text-gray-400"
                                />
                            </div>
                            
                            {showComponents && (
                                <div className="border-t border-gray-200 p-6">
                                    {components.length > 0 ? (
                                        <div className="mb-4">
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                                <h4 className="text-sm font-medium text-blue-900 mb-2">
                                                    📋 Vista de Elementos Jerárquicos
                                                </h4>
                                                <ul className="text-sm text-blue-800 space-y-1">
                                                    <li>• Aquí puedes ver y editar todos los elementos bajo este {equipment.equipment_type_label || equipment.equipment_type}</li>
                                                    <li>• Cada elemento muestra su jerarquía completa</li>
                                                    <li>• Haz clic en el ícono de lápiz para editar un elemento</li>
                                                    <li>• Los cambios se guardan inmediatamente</li>
                                                </ul>
                                            </div>
                                            
                                            <EditableComponentView
                                                components={components}
                                                onComponentUpdate={handleComponentUpdate}
                                                onComponentDelete={handleComponentDelete}
                                                maxDepth={3}
                                                disabled={false}
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <FontAwesomeIcon icon={faTree} className="text-4xl mb-4 text-gray-300" />
                                            <p>Este {equipment.equipment_type_label || equipment.equipment_type} no tiene elementos descendientes</p>
                                            <p className="text-sm">Los elementos se pueden agregar desde el formulario de creación</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Información de jerarquía extendida */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Información de Jerarquía</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-700">Nivel:</span>
                                    <span className="ml-2 text-gray-600">{equipment.hierarchy_level || 0}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">ID:</span>
                                    <span className="ml-2 text-gray-600">{equipment.id}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Tipo:</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                        equipment.equipment_type === 'equipment' ? 'bg-blue-100 text-blue-800' :
                                        equipment.equipment_type === 'subequipment' ? 'bg-green-100 text-green-800' :
                                        equipment.equipment_type === 'component' ? 'bg-yellow-100 text-yellow-800' :
                                        equipment.equipment_type === 'part' ? 'bg-purple-100 text-purple-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {equipment.equipment_type_label || equipment.equipment_type}
                                    </span>
                                </div>
                                {equipment.parent_id && (
                                    <div>
                                        <span className="font-medium text-gray-700">Parent ID:</span>
                                        <span className="ml-2 text-gray-600">{equipment.parent_id}</span>
                                    </div>
                                )}
                                {equipment.parent && (
                                    <div>
                                        <span className="font-medium text-gray-700">Equipo Padre:</span>
                                        <span className="ml-2 text-gray-600">{equipment.parent.name}</span>
                                    </div>
                                )}
                                <div>
                                    <span className="font-medium text-gray-700">Hijos:</span>
                                    <span className="ml-2 text-gray-600">{equipment.children_count || 0}</span>
                                </div>
                                <div className="md:col-span-2 lg:col-span-3">
                                    <span className="font-medium text-gray-700">Ruta Completa:</span>
                                    <span className="ml-2 text-gray-600 break-all">{equipment.full_path || equipment.name}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Creado:</span>
                                    <span className="ml-2 text-gray-600">
                                        {equipment.created_at ? new Date(equipment.created_at).toLocaleString() : 'N/A'}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Actualizado:</span>
                                    <span className="ml-2 text-gray-600">
                                        {equipment.updated_at ? new Date(equipment.updated_at).toLocaleString() : 'N/A'}
                                    </span>
                                </div>
                                {equipment.hierarchy_data && (
                                    <div>
                                        <span className="font-medium text-gray-700">Datos Jerarquía:</span>
                                        <span className="ml-2 text-gray-600">
                                            {JSON.stringify(equipment.hierarchy_data)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EquipmentDetailPage
