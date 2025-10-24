import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChevronRight, 
    faChevronDown, 
    faTractor, 
    faGears, 
    faCog, 
    faCube,
    faEdit,
    faTrash,
    faPlus,
    faArrows,
    faEye
} from '@fortawesome/free-solid-svg-icons';

const EquipmentTreeView = ({ 
    equipments = [], 
    onEdit, 
    onDelete, 
    onAddChild, 
    onMove,
    onView,
    expandedNodes = {},
    onNodeToggle,
    showActions = true,
    selectable = false,
    selectedId = null,
    onSelect
}) => {
    const [localExpanded, setLocalExpanded] = useState({});
    
    // Usar estado local si no se pasa expandedNodes
    const expanded = expandedNodes || localExpanded;
    const setExpanded = onNodeToggle || setLocalExpanded;

    const getEquipmentIcon = (equipmentType) => {
        switch (equipmentType) {
            case 'equipment':
                return faTractor;
            case 'subequipment':
                return faGears;
            case 'component':
                return faCog;
            case 'part':
                return faCube;
            default:
                return faTractor;
        }
    };

    const getEquipmentColor = (equipmentType) => {
        switch (equipmentType) {
            case 'equipment':
                return 'text-blue-600';
            case 'subequipment':
                return 'text-green-600';
            case 'component':
                return 'text-orange-600';
            case 'part':
                return 'text-purple-600';
            default:
                return 'text-gray-600';
        }
    };

    const getStatusColor = (state) => {
        switch (state?.toLowerCase()) {
            case 'operativo':
            case 'operativa':
                return 'bg-green-100 text-green-800';
            case 'mantenimiento':
                return 'bg-yellow-100 text-yellow-800';
            case 'atención':
                return 'bg-orange-100 text-orange-800';
            case 'fuera de servicio':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const toggleNode = (nodeId) => {
        setExpanded(prev => ({
            ...prev,
            [nodeId]: !prev[nodeId]
        }));
    };

    const handleSelect = (equipment) => {
        if (selectable && onSelect) {
            onSelect(equipment);
        }
    };

    const renderEquipment = (equipment, level = 0) => {
        const hasChildren = equipment.children && equipment.children.length > 0;
        const isExpanded = expanded[equipment.id];
        const isSelected = selectable && selectedId === equipment.id;

        return (
            <div key={equipment.id} className="select-none">
                {/* Nodo del equipo */}
                <div 
                    className={`flex items-center py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors ${
                        isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    } ${selectable ? 'cursor-pointer' : ''}`}
                    style={{ marginLeft: `${level * 20}px` }}
                    onClick={() => handleSelect(equipment)}
                >
                    {/* Botón de expansión */}
                    <div className="w-6 flex justify-center">
                        {hasChildren ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleNode(equipment.id);
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FontAwesomeIcon 
                                    icon={isExpanded ? faChevronDown : faChevronRight}
                                    className="text-xs"
                                />
                            </button>
                        ) : (
                            <div className="w-3" />
                        )}
                    </div>

                    {/* Icono del tipo de equipo */}
                    <div className="w-8 flex justify-center">
                        <FontAwesomeIcon 
                            icon={getEquipmentIcon(equipment.equipment_type)}
                            className={`${getEquipmentColor(equipment.equipment_type)} text-sm`}
                        />
                    </div>

                    {/* Información del equipo */}
                    <div className="flex-1 ml-3">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">
                                    {equipment.name}
                                </h4>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(equipment.state)}`}>
                                        {equipment.state}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {equipment.equipment_type_label}
                                    </span>
                                    {equipment.type && (
                                        <span className="text-xs text-gray-400">
                                            • {equipment.type}
                                        </span>
                                    )}
                                </div>
                                {equipment.description && (
                                    <p className="text-xs text-gray-600 mt-1 truncate max-w-md">
                                        {equipment.description}
                                    </p>
                                )}
                            </div>

                            {/* Acciones */}
                            {showActions && (
                                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {onView && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onView(equipment);
                                            }}
                                            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                            title="Ver detalles completos"
                                        >
                                            <FontAwesomeIcon icon={faEye} className="text-xs" />
                                        </button>
                                    )}
                                    {onAddChild && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onAddChild(equipment);
                                            }}
                                            className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                                            title="Agregar sub-equipo"
                                        >
                                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                                        </button>
                                    )}
                                    {onMove && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onMove(equipment);
                                            }}
                                            className="p-1 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                                            title="Mover equipo"
                                        >
                                            <FontAwesomeIcon icon={faArrows} className="text-xs" />
                                        </button>
                                    )}
                                    {onEdit && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit(equipment);
                                            }}
                                            className="p-1 text-yellow-600 hover:bg-yellow-100 rounded transition-colors"
                                            title="Editar equipo"
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="text-xs" />
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(equipment);
                                            }}
                                            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                                            title="Eliminar equipo"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="text-xs" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hijos (recursivo) */}
                {hasChildren && isExpanded && (
                    <div className="ml-4">
                        {equipment.children.map(child => 
                            renderEquipment(child, level + 1)
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-1 group">
            {equipments.map(equipment => renderEquipment(equipment))}
        </div>
    );
};

export default EquipmentTreeView;
