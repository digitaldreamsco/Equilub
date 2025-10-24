'use client';

import React, { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const DynamicCharts = ({ dashboardData }) => {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    // Preparar datos para gráfico de tipos
    const prepareTypeChartData = () => {
        if (!dashboardData?.current_stats?.equipment_by_type) return null;
        
        const data = dashboardData.current_stats.equipment_by_type;
        const labels = Object.keys(data).map(type => {
            const typeMap = {
                'equipment': 'Equipos',
                'component': 'Componentes', 
                'part': 'Partes',
                'subequipment': 'Sub-equipos'
            };
            return typeMap[type] || type;
        });
        
        const values = Object.values(data);
        
        return {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: [
                        '#3B82F6', // Azul
                        '#10B981', // Verde
                        '#F59E0B', // Amarillo
                        '#8B5CF6', // Púrpura
                    ],
                    borderColor: [
                        '#2563EB',
                        '#059669',
                        '#D97706',
                        '#7C3AED',
                    ],
                    borderWidth: 2,
                }
            ]
        };
    };

    // Preparar datos para gráfico de estados
    const prepareStateChartData = () => {
        if (!dashboardData?.current_stats?.equipment_by_state) return null;
        
        const data = dashboardData.current_stats.equipment_by_state;
        const labels = Object.keys(data);
        const values = Object.values(data);
        
        return {
            labels,
            datasets: [
                {
                    label: 'Cantidad de Equipos',
                    data: values,
                    backgroundColor: labels.map(state => {
                        if (state === 'Operativo') return '#10B981';
                        if (state === 'Mantenimiento') return '#F59E0B';
                        if (state === 'Fuera de servicio') return '#EF4444';
                        return '#6B7280';
                    }),
                    borderColor: labels.map(state => {
                        if (state === 'Operativo') return '#059669';
                        if (state === 'Mantenimiento') return '#D97706';
                        if (state === 'Fuera de servicio') return '#DC2626';
                        return '#4B5563';
                    }),
                    borderWidth: 2,
                }
            ]
        };
    };

    const typeChartData = prepareTypeChartData();
    const stateChartData = prepareStateChartData();

    // Configuración específica para gráfico de barras
    const barChartOptions = {
        ...chartOptions,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        },
        plugins: {
            ...chartOptions.plugins,
            title: {
                display: false
            }
        }
    };

    // Configuración específica para gráfico de dona
    const doughnutOptions = {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            title: {
                display: false
            }
        }
    };

    useEffect(() => {
        // Forzar re-render de gráficos cuando cambien los datos
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
        
        return () => clearTimeout(timer);
    }, [dashboardData]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Equipos por Tipo */}
            {typeChartData && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <h4 className="text-lg font-semibold text-gray-900">Distribución por Tipo</h4>
                    </div>
                    <div className="h-64">
                        <Doughnut 
                            data={typeChartData} 
                            options={doughnutOptions}
                        />
                    </div>
                </div>
            )}

            {/* Gráfico de Equipos por Estado */}
            {stateChartData && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <h4 className="text-lg font-semibold text-gray-900">Estado de Equipos</h4>
                    </div>
                    <div className="h-64">
                        <Bar 
                            data={stateChartData} 
                            options={barChartOptions}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DynamicCharts;
