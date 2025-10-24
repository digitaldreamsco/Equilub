import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch, 
    faTimes, 
    faTractor, 
    faGears, 
    faCog, 
    faCube 
} from '@fortawesome/free-solid-svg-icons';
import { useMachine } from '@/hooks/machine';

const EquipmentSelector = ({ 
    value = null, 
    onChange, 
    allowedTypes = ['equipment', 'subequipment', 'component', 'part'],
    placeholder = "Seleccionar equipo padre...",
    disabled = false,
    excludeId = null, // Excluir un equipo específico (útil para evitar referencias circulares)
    showFullPath = true,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [equipments, setEquipments] = useState([]);
    const [filteredEquipments, setFilteredEquipments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);

    const { searchMachines, getMachine } = useMachine();

    const getEquipmentIcon = (equipmentType) => {
        switch (equipmentType) {
            case 'equipment': return faTractor;
            case 'subequipment': return faGears;
            case 'component': return faCog;
            case 'part': return faCube;
            default: return faTractor;
        }
    };

    const getEquipmentColor = (equipmentType) => {
        switch (equipmentType) {
            case 'equipment': return 'text-blue-600';
            case 'subequipment': return 'text-green-600';
            case 'component': return 'text-orange-600';
            case 'part': return 'text-purple-600';
            default: return 'text-gray-600';
        }
    };

    useEffect(() => {
        loadEquipments();
    }, []);

    useEffect(() => {
        filterEquipments();
    }, [searchTerm, equipments, allowedTypes, excludeId]);

    useEffect(() => {
        if (value && equipments.length > 0) {
            const equipment = equipments.find(eq => eq.id === value);
            setSelectedEquipment(equipment);
        } else {
            setSelectedEquipment(null);
        }
    }, [value, equipments]);

    const loadEquipments = async () => {
        setLoading(true);
        try {
            await getMachine({ 
                setMaquinas: setEquipments, 
                show_all: true 
            });
        } catch (error) {
            console.error('Error loading equipments:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterEquipments = () => {
        let filtered = equipments.filter(equipment => {
            // Filtrar por tipos permitidos
            if (!allowedTypes.includes(equipment.equipment_type)) {
                return false;
            }

            // Excluir equipo específico
            if (excludeId && equipment.id === excludeId) {
                return false;
            }

            // Filtrar por término de búsqueda
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                return (
                    equipment.name.toLowerCase().includes(term) ||
                    equipment.full_path?.toLowerCase().includes(term) ||
                    equipment.description?.toLowerCase().includes(term)
                );
            }

            return true;
        });

        // Ordenar por nivel de jerarquía y nombre
        filtered.sort((a, b) => {
            if (a.hierarchy_level !== b.hierarchy_level) {
                return a.hierarchy_level - b.hierarchy_level;
            }
            return a.name.localeCompare(b.name);
        });

        setFilteredEquipments(filtered);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelect = (equipment) => {
        setSelectedEquipment(equipment);
        onChange(equipment.id);
        setIsOpen(false);
        setSearchTerm('');
    };

    const handleClear = () => {
        setSelectedEquipment(null);
        onChange(null);
        setSearchTerm('');
    };

    const getDisplayText = () => {
        if (!selectedEquipment) return placeholder;
        
        if (showFullPath && selectedEquipment.full_path) {
            return selectedEquipment.full_path;
        }
        
        return selectedEquipment.name;
    };

    return (
        <div className={`relative ${className}`}>
            {/* Campo de selección */}
            <div
                className={`w-full border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer transition-colors ${
                    disabled 
                        ? 'bg-gray-100 cursor-not-allowed' 
                        : isOpen 
                            ? 'border-blue-500 ring-1 ring-blue-500' 
                            : 'hover:border-gray-400'
                }`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0">
                        {selectedEquipment && (
                            <FontAwesomeIcon 
                                icon={getEquipmentIcon(selectedEquipment.equipment_type)}
                                className={`${getEquipmentColor(selectedEquipment.equipment_type)} text-sm mr-2 flex-shrink-0`}
                            />
                        )}
                        <span className={`truncate ${selectedEquipment ? 'text-gray-900' : 'text-gray-500'}`}>
                            {getDisplayText()}
                        </span>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                        {selectedEquipment && !disabled && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClear();
                                }}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                <FontAwesomeIcon icon={faTimes} className="text-xs" />
                            </button>
                        )}
                        <div className="text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden">
                    {/* Campo de búsqueda */}
                    <div className="p-3 border-b border-gray-200">
                        <div className="relative">
                            <FontAwesomeIcon 
                                icon={faSearch} 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                            />
                            <input
                                type="text"
                                placeholder="Buscar equipos..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Lista de equipos */}
                    <div className="max-h-60 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-center text-gray-500">
                                Cargando equipos...
                            </div>
                        ) : filteredEquipments.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                {searchTerm ? 'No se encontraron equipos' : 'No hay equipos disponibles'}
                            </div>
                        ) : (
                            filteredEquipments.map(equipment => (
                                <div
                                    key={equipment.id}
                                    className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                                    onClick={() => handleSelect(equipment)}
                                >
                                    <FontAwesomeIcon 
                                        icon={getEquipmentIcon(equipment.equipment_type)}
                                        className={`${getEquipmentColor(equipment.equipment_type)} text-sm mr-3 flex-shrink-0`}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-gray-900 truncate">
                                            {equipment.name}
                                        </div>
                                        {showFullPath && equipment.full_path && equipment.full_path !== equipment.name && (
                                            <div className="text-xs text-gray-500 truncate">
                                                {equipment.full_path}
                                            </div>
                                        )}
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                                {equipment.equipment_type_label}
                                            </span>
                                            {equipment.state && (
                                                <span className="text-xs text-gray-500">
                                                    {equipment.state}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Opción "Sin padre" */}
                    {allowedTypes.includes('equipment') && (
                        <div className="border-t border-gray-200">
                            <div
                                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors text-gray-600"
                                onClick={() => handleSelect({ id: null, name: 'Sin equipo padre', equipment_type: 'none' })}
                            >
                                <div className="w-6 mr-3" />
                                <span className="text-sm">Sin equipo padre (Equipo principal)</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EquipmentSelector;
