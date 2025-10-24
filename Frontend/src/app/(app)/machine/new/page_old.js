'use client';

import React, { useState, useEffect } from 'react'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useMachine } from '@/hooks/machine'
import SubComponentManager from '@/components/SubComponentManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTractor, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

function FormularioDinamico() {
    const [nombreMaquina, setMombreMaquina] = useState('')
    const [estado, setEstado] = useState('Operativo')
    const [tipoMaquina, setTipoMaquina] = useState('')
    const [observacion, setObservacion] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [components, setComponents] = useState([])
    const [showComponents, setShowComponents] = useState(false)
    const [equipmentType, setEquipmentType] = useState('equipment')

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const { saveNewMachine } = useMachine()
        
        // Preparar datos de la máquina con componentes
        const machineData = {
            name: nombreMaquina,
            state: estado,
            type: tipoMaquina,
            observation: observacion,
            description: descripcion,
            equipment_type: equipmentType,
            hierarchy_data: {
                components: components,
                created_at: new Date().toISOString()
            }
        }
        
        saveNewMachine({
            ...machineData,
            setTmpMaquinas: () => {}
        })
        
        // Limpia los campos
        setMombreMaquina('')
        setEstado('Operativo')
        setTipoMaquina('')
        setObservacion('')
        setDescripcion('')
        setComponents([])
        setShowComponents(false)
        setEquipmentType('equipment')
    }

    return (
        <div className="py-5 px-5 bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-8 bg-white">
                        <div className="flex items-center mb-6">
                            <FontAwesomeIcon icon={faTractor} className="mr-3 text-blue-600 text-xl" />
                            <h2 className="font-bold text-xl text-gray-900">Nuevo Equipo</h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Información básica del equipo */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="nombreMaquina">Nombre del Equipo</Label>
                                        <Input
                                            id="nombreMaquina"
                                            type="text"
                                            value={nombreMaquina}
                                            onChange={(e) => setMombreMaquina(e.target.value)}
                                            required
                                            className="w-full text-sm"
                                            placeholder="Ej: Retroexcavadora CAT 320D..."
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="tipoEquipo">Tipo de Equipo</Label>
                                        <select
                                            id="tipoEquipo"
                                            value={equipmentType}
                                            onChange={(e) => setEquipmentType(e.target.value)}
                                            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                            required
                                        >
                                            <option value="equipment">Equipo Principal</option>
                                            <option value="sub_equipment">Sub-equipo</option>
                                            <option value="component">Componente</option>
                                            <option value="part">Parte</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="estado">Estado</Label>
                                        <select
                                            id="estado"
                                            value={estado}
                                            onChange={(e) => setEstado(e.target.value)}
                                            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                            required
                                        >
                                            <option value="Operativo">Operativo</option>
                                            <option value="Mantenimiento">Mantenimiento</option>
                                            <option value="Atención">Requiere Atención</option>
                                            <option value="Fuera de servicio">Fuera de Servicio</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="tipoMaquina">Categoría/Tipo</Label>
                                        <Input
                                            id="tipoMaquina"
                                            type="text"
                                            value={tipoMaquina}
                                            onChange={(e) => setTipoMaquina(e.target.value)}
                                            className="w-full text-sm"
                                            placeholder="Ej: Maquinaria pesada, Sistema hidráulico..."
                                        />
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <Label htmlFor="descripcion">Descripción</Label>
                                    <textarea
                                        id="descripcion"
                                        rows={3}
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                        placeholder="Descripción detallada del equipo..."
                                    />
                                </div>
                                
                                <div className="mt-4">
                                    <Label htmlFor="observacion">Observaciones</Label>
                                    <textarea
                                        id="observacion"
                                        rows={3}
                                        value={observacion}
                                        onChange={(e) => setObservacion(e.target.value)}
                                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                        placeholder="Observaciones adicionales, notas importantes..."
                                    />
                                </div>
                            </div>

                            {/* Sección de componentes y partes */}
                            <div className="bg-white border border-gray-200 rounded-lg">
                                <div 
                                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                                    onClick={() => setShowComponents(!showComponents)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FontAwesomeIcon icon={faTractor} className="text-blue-600 text-sm" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Componentes y Partes
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Gestiona la estructura jerárquica del equipo
                                                {components.length > 0 && ` (${components.length} componentes)`}
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
                                        <div className="mb-4">
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <h4 className="text-sm font-medium text-blue-900 mb-2">
                                                    📋 Estructura Jerárquica Flexible
                                                </h4>
                                                <ul className="text-sm text-blue-800 space-y-1">
                                                    <li>• <strong>Componentes:</strong> Partes principales del equipo</li>
                                                    <li>• <strong>Sub-componentes:</strong> Cualquier componente puede tener sub-componentes</li>
                                                    <li>• <strong>Anidación:</strong> Cada sub-componente puede tener sus propios sub-componentes</li>
                                                </ul>
                                                <p className="text-xs text-blue-700 mt-2">
                                                    Máximo 3 niveles de profundidad. Cada elemento puede expandirse individualmente.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <SubComponentManager
                                            components={components}
                                            onComponentsChange={setComponents}
                                            maxDepth={3}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Botones de acción */}
                            <div className="flex justify-end space-x-4 pt-6">
                                <Button 
                                    type="button" 
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2"
                                    onClick={() => window.history.back()}
                                >
                                    Cancelar
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                                >
                                    Guardar Equipo
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormularioDinamico
