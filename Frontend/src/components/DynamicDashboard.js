'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChartBar, 
    faChartPie, 
    faUpload, 
    faDownload,
    faFileExcel,
    faSpinner,
    faSync,
    faTrash,
    faEye
} from '@fortawesome/free-solid-svg-icons';
import DynamicCharts from './DynamicCharts';

const DynamicDashboard = ({ 
    onFileUpload, 
    showUploadSection = true, 
    refreshTrigger = 0 
}) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [processingUpload, setProcessingUpload] = useState(false);

    // Cargar datos del dashboard al montar el componente
    useEffect(() => {
        loadDashboardData();
    }, [refreshTrigger]);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/excel/dashboard-data');
            if (response.ok) {
                const result = await response.json();
                setDashboardData(result.dashboard);
            }
            
            // También cargar lista de archivos
            const filesResponse = await fetch('http://localhost:8000/api/excel/files');
            if (filesResponse.ok) {
                const filesResult = await filesResponse.json();
                setUploadedFiles(filesResult.files || []);
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        setProcessingUpload(true);
        setSelectedFile(file);

        const formData = new FormData();
        formData.append('excelFile', file);

        try {
            const response = await fetch('http://localhost:8000/api/excel/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                // Callback para el componente padre
                if (onFileUpload) {
                    onFileUpload(result.data);
                }
                
                // Recargar datos del dashboard inmediatamente
                await loadDashboardData();
                
                // Limpiar el input de archivo
                event.target.value = '';
                setSelectedFile(null);
                
                // Mostrar mensaje de éxito detallado
                const successMessage = `✅ ¡Archivo procesado exitosamente!
📊 Registros procesados: ${result.data.processed_records}
📈 Dashboard actualizado automáticamente`;
                
                alert(successMessage);
                
                // Scroll al dashboard si hay datos
                setTimeout(() => {
                    const chartSection = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2');
                    if (chartSection) {
                        chartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 500);
            } else {
                alert(`❌ Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('❌ Error al subir el archivo');
        } finally {
            setUploading(false);
            setProcessingUpload(false);
        }
    };

    const downloadFile = async (filename) => {
        try {
            const response = await fetch(`http://localhost:8000/api/excel/download/${filename}`);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('❌ Error al descargar el archivo');
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <FontAwesomeIcon icon={faSpinner} spin className="text-2xl text-blue-600 mr-3" />
                <span className="text-gray-600">Cargando datos del dashboard...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Sección de Upload */}
            {showUploadSection && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-4">
                        <FontAwesomeIcon icon={faUpload} className="text-blue-600 mr-3" />
                        <h3 className="text-lg font-semibold text-gray-900">Subir Archivo Excel</h3>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleFileUpload}
                            disabled={uploading}
                            className="hidden"
                            id="excel-upload"
                        />
                        <label
                            htmlFor="excel-upload"
                            className={`cursor-pointer ${uploading ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                            <FontAwesomeIcon 
                                icon={uploading ? faSpinner : faFileExcel} 
                                spin={uploading}
                                className="text-4xl text-blue-500 mb-3" 
                            />
                            <p className="text-gray-600 mb-2">
                                {uploading ? 'Subiendo archivo...' : 'Haz clic para seleccionar un archivo Excel'}
                            </p>
                            <p className="text-sm text-gray-500">
                                Formatos soportados: .xlsx, .xls, .csv (máximo 10MB)
                            </p>
                            {selectedFile && (
                                <p className="text-sm text-blue-600 mt-2">
                                    Archivo seleccionado: {selectedFile.name}
                                </p>
                            )}
                        </label>
                    </div>
                    
                    {/* Archivo de ejemplo */}
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">📋 Archivo de Ejemplo</h4>
                        <p className="text-sm text-blue-800 mb-3">
                            ¿No tienes un archivo Excel? Usa nuestro archivo de ejemplo para probar la funcionalidad.
                        </p>
                        <a
                            href="/ejemplo_equipos.csv"
                            download
                            className="inline-flex items-center px-3 py-2 border border-blue-300 shadow-sm text-sm leading-4 font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <FontAwesomeIcon icon={faDownload} className="mr-2" />
                            Descargar ejemplo_equipos.csv
                        </a>
                    </div>
                </div>
            )}

            {/* Dashboard de Estadísticas */}
            {processingUpload && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-blue-600 text-2xl mb-3" />
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Procesando archivo...</h3>
                    <p className="text-blue-700">Generando dashboard automáticamente</p>
                </div>
            )}
            
            {dashboardData && !processingUpload && (
                <div className="space-y-6">
                    {/* Estadísticas Generales */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <FontAwesomeIcon icon={faChartBar} className="text-blue-600" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-500">Total Equipos</p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {dashboardData.current_stats?.total_equipment || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <FontAwesomeIcon icon={faChartPie} className="text-green-600" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-500">Tipos</p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {Object.keys(dashboardData.current_stats?.equipment_by_type || {}).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <FontAwesomeIcon icon={faFileExcel} className="text-yellow-600" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-500">Archivos</p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {uploadedFiles.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <FontAwesomeIcon icon={faUpload} className="text-purple-600" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-500">Operativos</p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {dashboardData.current_stats?.equipment_by_state?.['Operativo'] || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gráficos Principales */}
                    <DynamicCharts dashboardData={dashboardData} />

                    {/* Tabla de Datos Recientes */}
                    {dashboardData.recent_uploads && dashboardData.recent_uploads.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center mb-4">
                                <FontAwesomeIcon icon={faUpload} className="text-purple-600 mr-3" />
                                <h4 className="text-lg font-semibold text-gray-900">Últimos Equipos Agregados</h4>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {dashboardData.recent_uploads.slice(0, 5).map((equipment, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                                                    {equipment.name}
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-600">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        equipment.type === 'equipment' ? 'bg-blue-100 text-blue-800' :
                                                        equipment.type === 'component' ? 'bg-green-100 text-green-800' :
                                                        equipment.type === 'part' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {equipment.type}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-600">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        equipment.state === 'Operativo' ? 'bg-green-100 text-green-800' :
                                                        equipment.state === 'Mantenimiento' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {equipment.state}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-500">
                                                    {new Date(equipment.timestamp).toLocaleString('es-ES')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Lista de Archivos Subidos */}
            {uploadedFiles.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faFileExcel} className="text-green-600 mr-3" />
                            <h4 className="text-lg font-semibold text-gray-900">Archivos Subidos</h4>
                        </div>
                        <button
                            onClick={loadDashboardData}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Actualizar lista"
                        >
                            <FontAwesomeIcon icon={faSync} />
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Archivo
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tamaño
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Registros
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {uploadedFiles.slice(0, 10).map((file) => (
                                    <tr key={file.id || file.name} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm text-gray-900">
                                            <div className="flex items-center">
                                                <FontAwesomeIcon icon={faFileExcel} className="text-green-500 mr-2" />
                                                <span className="truncate max-w-xs" title={file.original_name || file.name}>
                                                    {file.original_name || file.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-600">
                                            {formatFileSize(file.size)}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-600">
                                            {file.processed_records || 0}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-600">
                                            {formatDate(file.created_at)}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-600">
                                            <button
                                                onClick={() => downloadFile(file.name)}
                                                className="text-blue-600 hover:text-blue-800 mr-3"
                                                title="Descargar archivo"
                                            >
                                                <FontAwesomeIcon icon={faDownload} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Mensaje cuando no hay datos */}
            {!dashboardData && !loading && !processingUpload && (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <FontAwesomeIcon icon={faChartBar} className="text-4xl text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos de dashboard</h3>
                    <p className="text-gray-600">
                        Sube un archivo Excel para generar estadísticas y gráficos automáticamente
                    </p>
                </div>
            )}
        </div>
    );
};

export default DynamicDashboard;
