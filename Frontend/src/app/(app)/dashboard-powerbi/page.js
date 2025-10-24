'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/app/(app)/Header';
import { useAuth } from '@/hooks/auth';
import ApexCharts from 'react-apexcharts';
import axios from '@/lib/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChartLine, 
    faUpload, 
    faDownload, 
    faFileExcel, 
    faFilePdf,
    faRefresh,
    faCog,
    faInfoCircle,
    faTractor,
    faWrench,
    faExclamationTriangle,
    faCheckCircle,
    faEye,
    faFilter,
    faCogs,
    faTools
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' });
    const [equipmentData, setEquipmentData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalEquipment: 0,
        operativeEquipment: 0,
        maintenanceEquipment: 0,
        criticalEquipment: 0
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [filter, setFilter] = useState('all');
    const fileInputRef = useRef(null);
    
    useEffect(() => {
        loadDashboardData();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [filter, equipmentData]);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            console.log('🔄 Cargando datos de equipos...');
            const response = await axios.get('/api/machines');
            console.log('✅ Respuesta de equipos:', response.data);
            
            if (response.data && Array.isArray(response.data.data)) {
                setEquipmentData(response.data.data);
                calculateStats(response.data.data);
                console.log(`📊 ${response.data.data.length} equipos cargados`);
            } else if (Array.isArray(response.data)) {
                // Si la respuesta es directamente un array
                setEquipmentData(response.data);
                calculateStats(response.data);
                console.log(`📊 ${response.data.length} equipos cargados`);
            } else {
                console.warn('⚠️ Formato de datos inesperado:', response.data);
                setEquipmentData([]);
            }
        } catch (error) {
            console.error('❌ Error cargando datos de equipos:', error);
            setEquipmentData([]);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        const stats = {
            totalEquipment: data.length,
            operativeEquipment: data.filter(item => item.state === 'Operativo').length,
            maintenanceEquipment: data.filter(item => item.state === 'Mantenimiento').length,
            criticalEquipment: data.filter(item => item.state === 'Fuera de servicio').length
        };
        setStats(stats);
    };

    const applyFilter = () => {
        console.log('🔍 Aplicando filtro:', filter);
        console.log('📦 Equipment data disponible:', equipmentData.length);
        
        let filtered = equipmentData;
        
        switch (filter) {
            case 'equipment':
                filtered = equipmentData.filter(item => item.equipment_type === 'equipment');
                break;
            case 'subequipment':
                filtered = equipmentData.filter(item => item.equipment_type === 'subequipment');
                break;
            case 'component':
                filtered = equipmentData.filter(item => item.equipment_type === 'component');
                break;
            case 'part':
                filtered = equipmentData.filter(item => item.equipment_type === 'part');
                break;
            case 'operative':
                filtered = equipmentData.filter(item => item.state === 'Operativo');
                break;
            case 'maintenance':
                filtered = equipmentData.filter(item => item.state === 'Mantenimiento');
                break;
            case 'critical':
                filtered = equipmentData.filter(item => item.state === 'Fuera de servicio');
                break;
            default:
                filtered = equipmentData;
        }
        
        console.log('✅ Filtered data resultado:', filtered.length);
        setFilteredData(filtered);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
            alert('Por favor selecciona un archivo Excel válido (.xlsx, .xls, .csv)');
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('excelFile', file);

        try {
            const xhr = new XMLHttpRequest();
            
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    setUploadProgress(percentComplete);
                }
            });

            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        alert('Archivo subido exitosamente');
                        loadDashboardData(); // Recargar datos
                    } else {
                        alert('Error al procesar archivo: ' + response.error);
                    }
                } else {
                    alert('Error al subir archivo');
                }
                setUploading(false);
                setUploadProgress(0);
            };

            xhr.onerror = function() {
                alert('Error de conexión al subir archivo');
                setUploading(false);
                setUploadProgress(0);
            };

            // En un proyecto real, esto iría a un endpoint específico para upload
            xhr.open('POST', 'http://localhost:8000/api/upload-excel');
            xhr.send(formData);

        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error al subir archivo');
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const exportToExcel = () => {
        // Preparar datos para exportación
        const exportData = filteredData.map(item => ({
            'ID': item.id,
            'Nombre': item.name,
            'Tipo': item.equipment_type_label || item.equipment_type,
            'Estado': item.state || 'Sin estado',
            'Categoría': item.type || 'Sin categoría',
            'Descripción': item.description || 'Sin descripción',
            'Nivel Jerárquico': item.hierarchy_level || 0,
            'Ruta Completa': item.full_path || item.name,
            'Fecha Creación': item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A',
            'Última Actualización': item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'N/A'
        }));

        // Cargar librería xlsx dinámicamente si no está disponible
        if (!window.XLSX) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
            script.onload = () => exportToExcel(); // Reintentar después de cargar
            document.head.appendChild(script);
            return;
        }
        
        const ws = window.XLSX.utils.json_to_sheet(exportData);
        const wb = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(wb, ws, 'Equipos');
        
        const fileName = `equipos_${new Date().toISOString().split('T')[0]}.xlsx`;
        window.XLSX.writeFile(wb, fileName);
    };

    const exportToPDF = async () => {
        window.print();
    };

    // Configuración de gráficos
    const equipmentTypeChart = {
        series: [
            equipmentData.filter(item => item.equipment_type === 'equipment').length,
            equipmentData.filter(item => item.equipment_type === 'subequipment').length,
            equipmentData.filter(item => item.equipment_type === 'component').length,
            equipmentData.filter(item => item.equipment_type === 'part').length
        ],
        options: {
            chart: { type: 'donut' },
            labels: ['Equipos Principales', 'Sub-equipos', 'Componentes', 'Partes'],
            colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
            responsive: [{
                breakpoint: 380,
                options: {
                    chart: { width: 250 },
                    legend: { position: 'bottom' }
                }
            }]
        }
    };

    const statusChart = {
        series: [{
            name: 'Cantidad',
            data: [
                stats.operativeEquipment,
                stats.maintenanceEquipment,
                stats.criticalEquipment,
                stats.totalEquipment - stats.operativeEquipment - stats.maintenanceEquipment - stats.criticalEquipment
            ]
        }],
        options: {
            chart: { height: 350, type: 'bar' },
            xaxis: {
                categories: ['Operativo', 'Mantenimiento', 'Crítico', 'Sin Estado']
            },
            colors: ['#10B981', '#F59E0B', '#EF4444', '#6B7280'],
            title: { text: 'Estado de Equipos' }
        }
    };

    if (loading) {
        return (
            <>
                <Header title="Dashboard de Equipos" />
                <div className="py-12 px-5">
                    <div className="max-w-7xl mx-auto flex items-center justify-center">
                        <div className="text-center">
                            <FontAwesomeIcon icon={faRefresh} className="text-4xl text-blue-600 mb-4 animate-spin" />
                            <p className="text-xl text-gray-600">Cargando Dashboard...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header title="Dashboard de Equipos y Sistemas" />
            <div className="py-5 px-5">
                <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                    {/* Banner Principal */}
                    <div className="bg-blue-900 text-white rounded-lg p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    <FontAwesomeIcon icon={faChartLine} className="mr-3" />
                                    Dashboard de Equipos y Sistemas
                                </h1>
                                <p className="text-blue-100">
                                    Sistema de monitoreo y gestión de mantenimiento - EQUILUB 2025
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={loadDashboardData}
                                    className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
                                >
                                    <FontAwesomeIcon icon={faRefresh} className="mr-2" />
                                    Actualizar
                                </button>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg transition-colors"
                                    disabled={uploading}
                                >
                                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                                    {uploading ? 'Subiendo...' : 'Subir Excel'}
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".xlsx,.xls,.csv"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </div>
                        </div>
                        
                        {uploading && (
                            <div className="mt-4">
                                <div className="bg-blue-800 rounded-full h-2 overflow-hidden">
                                    <div 
                                        className="bg-green-400 h-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-blue-100 mt-2">
                                    Subiendo archivo... {Math.round(uploadProgress)}%
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Tarjetas de Estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FontAwesomeIcon icon={faTractor} className="text-blue-600 text-xl" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Equipos</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalEquipment}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-xl" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Operativos</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.operativeEquipment}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <FontAwesomeIcon icon={faWrench} className="text-yellow-600 text-xl" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">En Mantenimiento</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.maintenanceEquipment}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-xl" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Críticos</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.criticalEquipment}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gráficos */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Gráfico de Tipos de Equipo */}
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                <FontAwesomeIcon icon={faCogs} className="mr-2 text-blue-600" />
                                Distribución por Tipo
                            </h3>
                            {equipmentData.length > 0 && (
                                <ApexCharts
                                    options={equipmentTypeChart.options}
                                    series={equipmentTypeChart.series}
                                    type="donut"
                                    height={350}
                                />
                            )}
                        </div>

                        {/* Gráfico de Estados */}
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                <FontAwesomeIcon icon={faTools} className="mr-2 text-green-600" />
                                Estado de Equipos
                            </h3>
                            {equipmentData.length > 0 && (
                                <ApexCharts
                                    options={statusChart.options}
                                    series={statusChart.series}
                                    type="bar"
                                    height={350}
                                />
                            )}
                        </div>
                    </div>

                    {/* Controles y Filtros */}
                    <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <FontAwesomeIcon icon={faFilter} className="text-gray-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Filtros y Controles</h3>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={exportToExcel}
                                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
                                    Exportar Excel
                                </button>
                                <button
                                    onClick={exportToPDF}
                                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                                    Exportar PDF
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {[
                                { key: 'all', label: 'Todos', color: 'gray' },
                                { key: 'equipment', label: 'Equipos Principales', color: 'blue' },
                                { key: 'subequipment', label: 'Sub-equipos', color: 'green' },
                                { key: 'component', label: 'Componentes', color: 'yellow' },
                                { key: 'part', label: 'Partes', color: 'purple' },
                                { key: 'operative', label: 'Operativos', color: 'green' },
                                { key: 'maintenance', label: 'En Mantenimiento', color: 'yellow' },
                                { key: 'critical', label: 'Críticos', color: 'red' }
                            ].map(filterOption => (
                                <button
                                    key={filterOption.key}
                                    onClick={() => setFilter(filterOption.key)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                        filter === filterOption.key
                                            ? `bg-${filterOption.color}-600 text-white`
                                            : `bg-${filterOption.color}-100 text-${filterOption.color}-700 hover:bg-${filterOption.color}-200`
                                    }`}
                                >
                                    {filterOption.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Lista de Equipos */}
                    <div className="bg-white rounded-lg shadow-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    <FontAwesomeIcon icon={faEye} className="mr-2 text-gray-600" />
                                    Lista de Equipos ({filteredData.length}) - Total: {equipmentData.length}
                                </h3>
                                <div className="text-sm text-gray-500">
                                    Filtro actual: <span className="font-medium">{filter}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            {filteredData.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Equipo
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tipo
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Estado
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nivel
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actualizado
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredData.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <FontAwesomeIcon 
                                                                icon={faTractor} 
                                                                className="text-blue-500 mr-3" 
                                                            />
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {item.name}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    ID: {item.id}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            item.equipment_type === 'equipment' ? 'bg-blue-100 text-blue-800' :
                                                            item.equipment_type === 'subequipment' ? 'bg-green-100 text-green-800' :
                                                            item.equipment_type === 'component' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-purple-100 text-purple-800'
                                                        }`}>
                                                            {item.equipment_type_label || item.equipment_type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            item.state === 'Operativo' ? 'bg-green-100 text-green-800' :
                                                            item.state === 'Mantenimiento' ? 'bg-yellow-100 text-yellow-800' :
                                                            item.state === 'Fuera de servicio' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {item.state || 'Sin estado'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        Nivel {item.hierarchy_level || 0}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <FontAwesomeIcon icon={faInfoCircle} className="text-4xl text-gray-300 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos disponibles</h3>
                                    <p className="text-gray-500">
                                        No se encontraron equipos con el filtro actual: <strong>{filter}</strong>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
