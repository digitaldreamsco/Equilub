'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChartLine, 
    faSpinner,
    faExclamationTriangle,
    faRefresh,
    faExpand,
    faCompress,
    faCog
} from '@fortawesome/free-solid-svg-icons';

function PowerBIEmbeddedComponent({ 
    reportUrl = null, 
    width = "100%", 
    height = "600px",
    title = "Dashboard Power BI"
}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const iframeRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (reportUrl) {
            setLoading(true);
            setError(false);
        }
    }, [reportUrl]);

    const handleIframeLoad = () => {
        setLoading(false);
        setError(false);
    };

    const handleIframeError = () => {
        setLoading(false);
        setError(true);
    };

    const retryLoad = () => {
        setLoading(true);
        setError(false);
        if (iframeRef.current) {
            iframeRef.current.src = iframeRef.current.src + '?t=' + Date.now();
        }
    };

    const toggleFullscreen = () => {
        if (!fullscreen) {
            if (containerRef.current?.requestFullscreen) {
                containerRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setFullscreen(!fullscreen);
    };

    // Sample Power BI dashboard con datos locales si no hay URL
    const renderLocalDashboard = () => (
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Métricas básicas */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Equipos</p>
                            <p className="text-2xl font-bold text-blue-600">247</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 text-xl">🏭</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Operativos</p>
                            <p className="text-2xl font-bold text-green-600">198</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-green-600 text-xl">✅</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">En Mantenimiento</p>
                            <p className="text-2xl font-bold text-yellow-600">35</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <span className="text-yellow-600 text-xl">⚠️</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Críticos</p>
                            <p className="text-2xl font-bold text-red-600">14</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <span className="text-red-600 text-xl">🚨</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Área del gráfico */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-4">Tendencias de Mantenimiento</h3>
                <div className="h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <FontAwesomeIcon icon={faChartLine} className="text-4xl text-blue-500 mb-2" />
                        <p className="text-gray-600">Gráfico de Power BI aparecería aquí</p>
                        <p className="text-sm text-gray-500">Conecte su reporte de Power BI para ver datos en tiempo real</p>
                    </div>
                </div>
            </div>

            {/* Tabla de equipos recientes */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
                <div className="space-y-3">
                    {[
                        { name: "Sistema de Control Industrial", status: "Mantenimiento programado", time: "Hace 2 horas" },
                        { name: "Unidad de Control Central", status: "Operativo", time: "Hace 4 horas" },
                        { name: "Sensor de Temperatura", status: "Requiere atención", time: "Hace 6 horas" },
                        { name: "Válvula Neumática", status: "Mantenimiento completado", time: "Hace 1 día" }
                    ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.status}</p>
                            </div>
                            <span className="text-xs text-gray-400">{item.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div 
            ref={containerRef}
            className={`relative ${fullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}
            style={{ width, height: fullscreen ? '100vh' : height }}
        >
            {/* Header */}
            <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-3">
                <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faChartLine} className="text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                    {reportUrl && (
                        <button
                            onClick={retryLoad}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Recargar"
                        >
                            <FontAwesomeIcon icon={faRefresh} />
                        </button>
                    )}
                    <button
                        onClick={toggleFullscreen}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title={fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                    >
                        <FontAwesomeIcon icon={fullscreen ? faCompress : faExpand} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="relative" style={{ height: fullscreen ? 'calc(100vh - 60px)' : 'calc(100% - 60px)' }}>
                {reportUrl ? (
                    <>
                        {/* Loading State */}
                        {loading && (
                            <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
                                <div className="text-center">
                                    <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600 mb-4 animate-spin" />
                                    <p className="text-lg text-gray-600">Cargando Power BI Dashboard...</p>
                                    <p className="text-sm text-gray-500 mt-2">Conectando con {reportUrl}</p>
                                </div>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
                                <div className="text-center">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-red-600 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar Power BI</h3>
                                    <p className="text-gray-600 mb-4">No se pudo conectar con el reporte de Power BI</p>
                                    <button
                                        onClick={retryLoad}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faRefresh} className="mr-2" />
                                        Reintentar
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Power BI Iframe */}
                        <iframe
                            ref={iframeRef}
                            src={reportUrl}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                            className={loading || error ? 'invisible' : 'visible'}
                            style={{ border: 'none' }}
                        />
                    </>
                ) : (
                    /* Local Dashboard when no Power BI URL */
                    renderLocalDashboard()
                )}
            </div>

            {/* Configuration hint */}
            {!reportUrl && (
                <div className="absolute top-16 right-4 bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-sm">
                    <div className="flex items-start space-x-2">
                        <FontAwesomeIcon icon={faCog} className="text-blue-600 mt-1" />
                        <div>
                            <p className="text-sm font-medium text-blue-900">Configurar Power BI</p>
                            <p className="text-xs text-blue-700 mt-1">
                                Agregue la URL de su reporte de Power BI para mostrar datos en tiempo real
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PowerBIEmbeddedComponent;
