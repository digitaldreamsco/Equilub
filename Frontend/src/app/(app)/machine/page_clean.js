'use client';

import React, { useState, useEffect } from 'react'
import { useMachine } from '@/hooks/machine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faGear, 
    faEdit, 
    faTrashAlt, 
    faTractor, 
    faPlus,
    faSearch,
    faTree,
    faList,
    faFilter,
    faExpand,
    faCompress
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Label from '@/components/Label'
import EquipmentTreeView from '@/components/EquipmentTreeView'

function EquiposPage() {
    const [equipments, setEquipments] = useState([])
    const [loading, setLoading] = useState(false)
    const [viewMode, setViewMode] = useState('hierarchy')
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [expandedNodes, setExpandedNodes] = useState({})
    const [equipmentTypes, setEquipmentTypes] = useState({})
    const [modalDelete, setModalDelete] = useState(false)
    const [modalDetail, setModalDetail] = useState(false)
    const [selectedEquipment, setSelectedEquipment] = useState(null)

    const { 
        getMachine, 
        getMachineHierarchy, 
        getEquipmentTypes, 
        searchMachines, 
        deleteMachine,
        getMachineId 
    } = useMachine()

    useEffect(() => {
        loadInitialData()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [searchTerm, filterType, viewMode])

    const loadInitialData = async () => {
        setLoading(true)
        try {
            await getEquipmentTypes({ setTypes: setEquipmentTypes })
            
            if (viewMode === 'hierarchy') {
                await getMachineHierarchy({ setMaquinas: setEquipments })
            } else {
                await getMachine({ setMaquinas: setEquipments, show_all: true })
            }
        } catch (error) {
            console.error('Error loading initial data:', error)
        } finally {
            setLoading(false)
        }
    }

    const applyFilters = async () => {
        if (loading) return

        setLoading(true)
        try {
            if (searchTerm.trim()) {
                await searchMachines({
                    setMaquinas: setEquipments,
                    query: searchTerm,
                    equipment_type: filterType !== 'all' ? filterType : null
                })
            } else {
                if (viewMode === 'hierarchy') {
                    await getMachineHierarchy({ setMaquinas: setEquipments })
                } else {
                    await getMachine({ 
                        setMaquinas: setEquipments, 
                        show_all: true,
                        equipment_type: filterType !== 'all' ? filterType : null
                    })
                }
            }
        } catch (error) {
            console.error('Error applying filters:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleViewModeChange = (mode) => {
        setViewMode(mode)
        setSearchTerm('')
    }

    const handleNodeToggle = (nodeId) => {
        setExpandedNodes(prev => ({
            ...prev,
            [nodeId]: !prev[nodeId]
        }))
    }

    const expandAll = () => {
        const allIds = {}
        const collectIds = (items) => {
            items.forEach(item => {
                if (item.children && item.children.length > 0) {
                    allIds[item.id] = true
                    collectIds(item.children)
                }
            })
        }
        collectIds(equipments)
        setExpandedNodes(allIds)
    }

    const collapseAll = () => {
        setExpandedNodes({})
    }

    const handleEdit = (equipment) => {
        window.location.href = `/machine/edit/${equipment.id}/${encodeURIComponent(equipment.name)}`
    }

    const handleDelete = (equipment) => {
        setSelectedEquipment(equipment)
        setModalDelete(true)
    }

    const confirmDelete = async () => {
        if (!selectedEquipment) return

        try {
            await deleteMachine({ id: selectedEquipment.id })
            setModalDelete(false)
            setSelectedEquipment(null)
            applyFilters()
        } catch (error) {
            console.error('Error deleting equipment:', error)
        }
    }

    const handleAddChild = (parentEquipment) => {
        window.location.href = `/machine/new?parent_id=${parentEquipment.id}`
    }

    const handleViewDetails = async (equipment) => {
        try {
            await getMachineId({ 
                setMaquinas: setSelectedEquipment, 
                id: equipment.id 
            })
            setModalDetail(true)
        } catch (error) {
            console.error('Error loading equipment details:', error)
        }
    }

    const getStatusColor = (state) => {
        switch (state?.toLowerCase()) {
            case 'operativo':
            case 'operativa':
                return 'bg-green-100 text-green-800'
            case 'mantenimiento':
                return 'bg-yellow-100 text-yellow-800'
            case 'atención':
                return 'bg-orange-100 text-orange-800'
            case 'fuera de servicio':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="py-5 px-5 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                                <FontAwesomeIcon icon={faTractor} className="mr-3 text-blue-600" />
                                Equipos y Sistemas
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Gestiona la jerarquía de equipos, sub-equipos, componentes y partes
                            </p>
                        </div>
                        <Link
                            href="/machine/new"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Nuevo Equipo
                        </Link>
                    </div>

                    {/* Controles */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                            {/* Búsqueda */}
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <FontAwesomeIcon 
                                        icon={faSearch} 
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Buscar equipos, componentes..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* Filtro por tipo */}
                                <div className="flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="all">Todos los tipos</option>
                                        {Object.entries(equipmentTypes).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Modo de vista */}
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => handleViewModeChange('hierarchy')}
                                        className={`px-3 py-2 text-sm transition-colors ${
                                            viewMode === 'hierarchy' 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faTree} className="mr-2" />
                                        Jerarquía
                                    </button>
                                    <button
                                        onClick={() => handleViewModeChange('list')}
                                        className={`px-3 py-2 text-sm transition-colors border-l border-gray-300 ${
                                            viewMode === 'list' 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faList} className="mr-2" />
                                        Lista
                                    </button>
                                </div>

                                {/* Controles de expansión */}
                                {viewMode === 'hierarchy' && !searchTerm && (
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={expandAll}
                                            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                            title="Expandir todo"
                                        >
                                            <FontAwesomeIcon icon={faExpand} />
                                        </button>
                                        <button
                                            onClick={collapseAll}
                                            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                            title="Contraer todo"
                                        >
                                            <FontAwesomeIcon icon={faCompress} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">Cargando equipos...</p>
                        </div>
                    ) : equipments.length === 0 ? (
                        <div className="p-8 text-center">
                            <FontAwesomeIcon icon={faTractor} className="text-gray-300 text-4xl mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {searchTerm ? 'No se encontraron equipos' : 'No hay equipos registrados'}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm 
                                    ? 'Intenta con otros términos de búsqueda' 
                                    : 'Comienza agregando tu primer equipo al sistema'
                                }
                            </p>
                            {!searchTerm && (
                                <Link
                                    href="/machine/new"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                    Crear Primer Equipo
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="p-6">
                            {viewMode === 'hierarchy' ? (
                                <EquipmentTreeView
                                    equipments={equipments}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onAddChild={handleAddChild}
                                    expandedNodes={expandedNodes}
                                    onNodeToggle={handleNodeToggle}
                                    showActions={true}
                                />
                            ) : (
                                <div className="space-y-4">
                                    {equipments.map(equipment => (
                                        <div key={equipment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3">
                                                        <FontAwesomeIcon 
                                                            icon={faTractor} 
                                                            className="text-blue-600"
                                                        />
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">
                                                                {equipment.name}
                                                            </h3>
                                                            {equipment.full_path && (
                                                                <p className="text-sm text-gray-500">
                                                                    {equipment.full_path}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-4 mt-2">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(equipment.state)}`}>
                                                            {equipment.state}
                                                        </span>
                                                        <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                                            {equipment.equipment_type_label}
                                                        </span>
                                                        {equipment.type && (
                                                            <span className="text-sm text-gray-500">
                                                                {equipment.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {equipment.description && (
                                                        <p className="text-sm text-gray-600 mt-2">
                                                            {equipment.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleViewDetails(equipment)}
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                        title="Ver detalles"
                                                    >
                                                        <FontAwesomeIcon icon={faGear} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(equipment)}
                                                        className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                                                        title="Editar"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(equipment)}
                                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        title="Eliminar"
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de confirmación de eliminación */}
            {modalDelete && selectedEquipment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Eliminar Equipo
                        </h3>
                        <p className="text-gray-600 mb-6">
                            ¿Estás seguro de que deseas eliminar el equipo "{selectedEquipment.name}"? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setModalDelete(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de detalles */}
            {modalDetail && selectedEquipment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Detalles del Equipo: {selectedEquipment.name}
                        </h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Nombre</Label>
                                    <p className="text-gray-900">{selectedEquipment.name}</p>
                                </div>
                                <div>
                                    <Label>Estado</Label>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEquipment.state)}`}>
                                        {selectedEquipment.state}
                                    </span>
                                </div>
                                <div>
                                    <Label>Tipo de Equipo</Label>
                                    <p className="text-gray-900">{selectedEquipment.equipment_type_label}</p>
                                </div>
                                <div>
                                    <Label>Tipo</Label>
                                    <p className="text-gray-900">{selectedEquipment.type || 'No especificado'}</p>
                                </div>
                            </div>
                            {selectedEquipment.full_path && (
                                <div>
                                    <Label>Ruta Completa</Label>
                                    <p className="text-gray-900">{selectedEquipment.full_path}</p>
                                </div>
                            )}
                            {selectedEquipment.description && (
                                <div>
                                    <Label>Descripción</Label>
                                    <p className="text-gray-900">{selectedEquipment.description}</p>
                                </div>
                            )}
                            {selectedEquipment.observation && (
                                <div>
                                    <Label>Observaciones</Label>
                                    <p className="text-gray-900">{selectedEquipment.observation}</p>
                                </div>
                            )}
                            {selectedEquipment.children_count > 0 && (
                                <div>
                                    <Label>Sub-equipos/Componentes</Label>
                                    <p className="text-gray-900">{selectedEquipment.children_count} elementos</p>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setModalDetail(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EquiposPage
