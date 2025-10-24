'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/app/(app)/Header';
import { useAuth } from '@/hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChartLine, 
    faCog, 
    faExpand, 
    faCompress,
    faUpload,
    faSync,
    faChartBar
} from '@fortawesome/free-solid-svg-icons';
import PowerBIEmbedded from '@/components/PowerBIEmbedded';
import DynamicDashboard from '@/components/DynamicDashboard';

const PowerBIPage = () => {
    const { user } = useAuth({ middleware: 'auth' });
    const [powerBIUrl, setPowerBIUrl] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [dashboardRefresh, setDashboardRefresh] = useState(0);
    const [activeTab, setActiveTab] = useState('powerbi'); // 'powerbi' o 'dynamic'

    useEffect(() => {
        // Cargar URL de Power BI desde localStorage si existe
        const savedUrl = localStorage.getItem('powerbi-url');
        if (savedUrl) {
            setPowerBIUrl(savedUrl);
        }
    }, []);

    const handleUrlChange = (e) => {
        const newUrl = e.target.value;
        setPowerBIUrl(newUrl);
        localStorage.setItem('powerbi-url', newUrl);
    };

    const handleFileUpload = (uploadResult) => {
        console.log('Archivo subido:', uploadResult);
        // Refrescar el dashboard dinámico
        setDashboardRefresh(prev => prev + 1);
    };

    const refreshDashboard = () => {
        setDashboardRefresh(prev => prev + 1);
    };

    return (
        <>
            <Header title="Power BI & Dashboard" />
            
            <div className="py-12 px-5 bg-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faChartLine} className="text-blue-600 text-2xl mr-4" />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Power BI & Dashboard</h1>
                                    <p className="text-gray-600">Visualización avanzada de datos y reportes</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={refreshDashboard}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    title="Actualizar dashboard"
                                >
                                    <FontAwesomeIcon icon={faSync} className="mr-2" />
                                    Actualizar
                                </button>
                                
                                <button
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                                >
                                    <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                <button
                                    onClick={() => setActiveTab('powerbi')}
                                    className={`${
                                        activeTab === 'powerbi'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
                                >
                                    <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                                    Power BI Embebido
                                </button>
                                <button
                                    onClick={() => setActiveTab('dynamic')}
                                    className={`${
                                        activeTab === 'dynamic'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
                                >
                                    <FontAwesomeIcon icon={faChartBar} className="mr-2" />
                                    Dashboard Dinámico
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Contenido basado en tab activo */}
                    {activeTab === 'powerbi' && (
                        <div className="space-y-6">
                            {/* Configuración de Power BI */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center mb-4">
                                    <FontAwesomeIcon icon={faCog} className="text-gray-600 mr-3" />
                                    <h3 className="text-lg font-semibold text-gray-900">Configuración de Power BI</h3>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="powerbi-url" className="block text-sm font-medium text-gray-700 mb-2">
                                            URL del Reporte de Power BI
                                        </label>
                                        <input
                                            id="powerbi-url"
                                            type="url"
                                            value={powerBIUrl}
                                            onChange={handleUrlChange}
                                            placeholder="https://app.powerbi.com/reportEmbed?reportId=..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Pega aquí la URL de embed de tu reporte de Power BI
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Power BI Embedded */}
                            <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
                                <PowerBIEmbedded
                                    reportUrl={powerBIUrl}
                                    height={isFullscreen ? '100vh' : '600px'}
                                    title="Reporte de Power BI"
                                />
                            </div>

                            {/* Información de ayuda */}
                            {!powerBIUrl && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                    <h4 className="text-lg font-semibold text-blue-900 mb-3">
                                        🔗 Cómo obtener la URL de Power BI
                                    </h4>
                                    <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                                        <li>Ve a Power BI Service (app.powerbi.com)</li>
                                        <li>Abre tu reporte</li>
                                        <li>Haz clic en "Archivo" → "Insertar reporte" → "Sitio web o portal"</li>
                                        <li>Copia la URL que aparece en el iframe</li>
                                        <li>Pégala en el campo de configuración de arriba</li>
                                    </ol>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'dynamic' && (
                        <div className="space-y-6">
                            {/* Dashboard Dinámico */}
                            <DynamicDashboard 
                                onFileUpload={handleFileUpload}
                                showUploadSection={true}
                                refreshTrigger={dashboardRefresh}
                            />
                            
                            {/* Información de ayuda para dashboard dinámico */}
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-green-900 mb-3">
                                    📊 Dashboard Dinámico
                                </h4>
                                <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                                    <li>Sube archivos Excel (.xlsx, .xls, .csv) para generar gráficos automáticamente</li>
                                    <li>Los datos se procesan y se crean equipos en el sistema</li>
                                    <li>Las estadísticas se actualizan en tiempo real</li>
                                    <li>Formato de Excel esperado: Nombre, Tipo, Estado, Categoría, Descripción</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PowerBIPage;
