'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/app/(app)/Header';
import { useAuth } from '@/hooks/auth';
import PowerBIEmbeddedComponent from '@/components/PowerBIEmbedded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChartLine, 
    faUpload, 
    faFileExcel, 
    faList,
    faCog,
    faInfoCircle,
    faDatabase,
    faDownload,
    faEye,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

function PowerBIPage() {
    const { user } = useAuth({ middleware: 'auth' });
    const [powerbiUrl, setPowerbiUrl] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showUploadPanel, setShowUploadPanel] = useState(false);

    useEffect(() => {
        loadUploadedFiles();
    }, []);

    const loadUploadedFiles = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/excel/files');
            const data = await response.json();
            
            if (data.success) {
                setUploadedFiles(data.files);
            }
        } catch (error) {
            console.error('Error loading files:', error);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
            alert('Por favor selecciona un archivo Excel válido (.xlsx, .xls, .csv)');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('excelFile', file);

        try {
            const response = await fetch('http://localhost:8000/api/upload-excel', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (result.success) {
                alert('Archivo subido exitosamente');
                loadUploadedFiles(); // Recargar lista
            } else {
                alert('Error al subir archivo: ' + result.error);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error al subir archivo');
        } finally {
            setLoading(false);
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
            alert('Error al descargar archivo');
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <>
            <Header title="Dashboard Power BI y Reportes" />
            <div className="py-5 px-5">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-lg p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    <FontAwesomeIcon icon={faChartLine} className="mr-3" />
                                    Power BI Dashboard y Reportes
                                </h1>
                                <p className="text-blue-100">
                                    Visualización avanzada de datos y análisis de equipos industriales
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowUploadPanel(!showUploadPanel)}
                                    className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg transition-colors"
                                >
                                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                                    Gestionar Archivos
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Configuration Panel */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Power BI Configuration */}
                        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center mb-4">
                                <FontAwesomeIcon icon={faCog} className="text-blue-600 mr-2" />
                                <h3 className="text-lg font-semibold">Configuración de Power BI</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL del Reporte de Power BI
                                    </label>
                                    <input
                                        type="url"
                                        value={powerbiUrl}
                                        onChange={(e) => setPowerbiUrl(e.target.value)}
                                        placeholder="https://app.powerbi.com/reportEmbed?reportId=..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start space-x-2">
                                        <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-blue-900">Cómo obtener la URL de Power BI</p>
                                            <ul className="text-xs text-blue-700 mt-1 space-y-1">
                                                <li>1. Abra su reporte en Power BI Service</li>
                                                <li>2. Vaya a Archivo → Insertar reporte → Sitio web o portal</li>
                                                <li>3. Copie la URL proporcionada</li>
                                                <li>4. Pegue la URL en el campo de arriba</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <h3 className="text-lg font-semibold mb-4">
                                <FontAwesomeIcon icon={faDatabase} className="text-gray-600 mr-2" />
                                Estadísticas Rápidas
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Archivos subidos:</span>
                                    <span className="font-semibold">{uploadedFiles.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Dashboard conectado:</span>
                                    <span className={`font-semibold ${powerbiUrl ? 'text-green-600' : 'text-red-600'}`}>
                                        {powerbiUrl ? 'Sí' : 'No'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Usuario:</span>
                                    <span className="font-semibold">{user?.name || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upload Panel */}
                    {showUploadPanel && (
                        <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">
                                    <FontAwesomeIcon icon={faFileExcel} className="text-green-600 mr-2" />
                                    Gestión de Archivos Excel
                                </h3>
                                <button
                                    onClick={() => setShowUploadPanel(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Upload Section */}
                                <div>
                                    <h4 className="font-medium mb-3">Subir Nuevo Archivo</h4>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <FontAwesomeIcon icon={faUpload} className="text-4xl text-gray-400 mb-4" />
                                        <p className="text-gray-600 mb-4">Arrastra un archivo Excel aquí o haz clic para seleccionar</p>
                                        <input
                                            type="file"
                                            accept=".xlsx,.xls,.csv"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className={`cursor-pointer inline-flex items-center px-4 py-2 rounded-lg text-white transition-colors ${
                                                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                                            }`}
                                        >
                                            <FontAwesomeIcon icon={faUpload} className="mr-2" />
                                            {loading ? 'Subiendo...' : 'Seleccionar Archivo'}
                                        </label>
                                    </div>
                                </div>

                                {/* Files List */}
                                <div>
                                    <h4 className="font-medium mb-3">Archivos Subidos ({uploadedFiles.length})</h4>
                                    <div className="max-h-64 overflow-y-auto space-y-2">
                                        {uploadedFiles.length > 0 ? uploadedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm text-gray-900">{file.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatFileSize(file.size)} • {file.created_at}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => downloadFile(file.name)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                                                        title="Descargar"
                                                    >
                                                        <FontAwesomeIcon icon={faDownload} />
                                                    </button>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="text-center py-8 text-gray-500">
                                                <FontAwesomeIcon icon={faFileExcel} className="text-4xl mb-2 text-gray-300" />
                                                <p>No hay archivos subidos</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Power BI Dashboard */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <PowerBIEmbeddedComponent
                            reportUrl={powerbiUrl}
                            height="700px"
                            title="Dashboard Principal de Equipos"
                        />
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600 mt-1" />
                            <div>
                                <h4 className="font-medium text-blue-900">Funcionalidades del Dashboard</h4>
                                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                                    <li>• <strong>Análisis en tiempo real:</strong> Conecte sus datos de Power BI para visualizaciones actualizadas</li>
                                    <li>• <strong>Upload de Excel:</strong> Suba archivos Excel para procesar y analizar datos de equipos</li>
                                    <li>• <strong>Gestión de archivos:</strong> Administre sus archivos subidos con opciones de descarga</li>
                                    <li>• <strong>Dashboard interactivo:</strong> Explore datos con filtros y controles interactivos</li>
                                    <li>• <strong>Exportación:</strong> Exporte datos procesados en múltiples formatos</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PowerBIPage;
