'use client';

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useSafeParams } from '@/components/SafeParams'

// Importar componentes estáticos
import { useMachine } from '@/hooks/machine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faGear, faEdit, faTrashAlt, faTractor, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '@/components/Dropdown';
import DropdownLink, { DropdownButton } from "@/components/DropdownLink"
import DialogDelete from '@/components/Dialog';
import Label from '@/components/Label';
import Button from '@/components/Button';
import SubComponentManager from '@/components/SubComponentManager';

function FormularioDinamico() {
    const [modalDelete, setModalDelete] = useState(false)
    const [maquina, setMaquinas] = useState({})
    const [components, setComponents] = useState([])
    const [showComponents, setShowComponents] = useState(false)
    const [originalComponents, setOriginalComponents] = useState([])
    
    // Usar el hook seguro para params
    const params = useSafeParams()
    const name = params.name || ''
    const id = params.id || ''
    
    // consultando todas las maquinas creadas
    const getMachineDetails = () => {
        // consultando todas las maquinas creadas
        const { getMachineId } = useMachine()
        getMachineId({
            id: id,
            setMaquinas: (data) => {
                setMaquinas(data)
                
                // Cargar componentes existentes desde hierarchy_data
                if (data.hierarchy_data && data.hierarchy_data.components) {
                    setComponents(data.hierarchy_data.components)
                    setOriginalComponents(JSON.parse(JSON.stringify(data.hierarchy_data.components)))
                } else {
                    setComponents([])
                    setOriginalComponents([])
                }
            }
        })
    }

    // actualizar información
    const updateMachineId = async(e) => {
        e.preventDefault()
        // consultando todas las maquinas creadas
        const { saveUpdateMachine } = useMachine()
        
        const updateData = {
            id: id,
            name: maquina.name,
            type: maquina.type,
            state: maquina.state,
            observation: maquina.observation,
            description: maquina.description,
            equipment_type: maquina.equipment_type || 'equipment',
            hierarchy_data: {
                components: components,
                updated_at: new Date().toISOString(),
                original_components: originalComponents
            }
        }
        
        saveUpdateMachine(updateData)
    }

    // cargar maquinas
useEffect(() => {
    getMachineDetails();
  }, []);
    return (
        <div className="py-5 px-5 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-8 bg-white">
                        {/* Header */}
                        <div className="flex items-center mb-6">
                            <FontAwesomeIcon icon={faTractor} className="mr-3 text-blue-600 text-xl" />
                            <div>
                                <h2 className="font-bold text-xl text-gray-900">Editar Equipo</h2>
                                <p className="text-sm text-gray-600">
                                    {maquina.name || 'Cargando...'}
                                </p>
                            </div>
                        </div>

                        <form onSubmit={updateMachineId} className="space-y-6">
                            {/* Información básica del equipo */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="maquina_name">Nombre del Equipo</Label>
                                        <input 
                                            id='maquina_name' 
                                            type='text' 
                                            className='w-full text-sm border border-gray-300 rounded-md px-3 py-2' 
                                            value={maquina.name || ''} 
                                            onChange={(e) => setMaquinas(prev => ({...prev, name: e.target.value}))}
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="equipment_type">Tipo de Equipo</Label>
                                        <select
                                            id="equipment_type"
                                            value={maquina.equipment_type || 'equipment'}
                                            onChange={(e) => setMaquinas(prev => ({...prev, equipment_type: e.target.value}))}
                                            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                        >
                                            <option value="equipment">Equipo Principal</option>
                                            <option value="sub_equipment">Sub-equipo</option>
                                            <option value="component">Componente</option>
                                            <option value="part">Parte</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="maquina_state">Estado</Label>
                                        <select
                                            id='maquina_state' 
                                            className='w-full text-sm border border-gray-300 rounded-md px-3 py-2' 
                                            value={maquina.state || 'Operativo'}  
                                            onChange={(e) => setMaquinas(prev => ({...prev, state: e.target.value}))}
                                        >
                                            <option value="Operativo">Operativo</option>
                                            <option value="Mantenimiento">Mantenimiento</option>
                                            <option value="Atención">Requiere Atención</option>
                                            <option value="Fuera de servicio">Fuera de Servicio</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="maquina_type">Categoría/Tipo</Label>
                                        <input 
                                            id='maquina_type' 
                                            type='text' 
                                            className='w-full text-sm border border-gray-300 rounded-md px-3 py-2' 
                                            value={maquina.type || ''}  
                                            onChange={(e) => setMaquinas(prev => ({...prev, type: e.target.value}))}
                                        />
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <Label htmlFor="maquina_description">Descripción</Label>
                                    <textarea 
                                        rows={3} 
                                        id='maquina_description' 
                                        className='w-full text-sm border border-gray-300 rounded-md px-3 py-2' 
                                        value={maquina.description || ''}  
                                        onChange={(e) => setMaquinas(prev => ({...prev, description: e.target.value}))}
                                    />
                                </div>
                                
                                <div className="mt-4">
                                    <Label htmlFor="maquina_observation">Observaciones</Label>
                                    <textarea 
                                        rows={3} 
                                        id='maquina_observation' 
                                        className='w-full text-sm border border-gray-300 rounded-md px-3 py-2' 
                                        value={maquina.observation || ''}  
                                        onChange={(e) => setMaquinas(prev => ({...prev, observation: e.target.value}))}
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
                                    Actualizar Equipo
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Exportar con dynamic loading para evitar problemas de SSR en Next.js 15
export default dynamic(() => Promise.resolve(FormularioDinamico), {
    ssr: false
});
