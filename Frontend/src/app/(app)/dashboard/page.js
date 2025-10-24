
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
    
    // Todos los useState deben estar al principio
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
    const [eventos, setEventos] = useState([]);
    const [servicios, setServicios] = useState({
        actuales: [],
        proximos: []
    });
    const [estudiosLubricacionPorEmpresa, setEstudiosLubricacionPorEmpresa] = useState({
        series: [
            {
                name: 'Empresa A',
                data: [31, 40, 28, 51, 42, 109, 100]
            },
            {
                name: 'Empresa B',
                data: [11, 32, 45, 32, 34, 52, 41]
            },
            {
                name: 'Empresa C',
                data: [20, 25, 30, 35, 40, 45, 50]
            },
            {
                name: 'Empresa D',
                data: [15, 22, 18, 29, 33, 38, 42]
            }
        ],
        options: {
            chart: {
                type: 'area',
                height: 350,
                stacked: false,
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    opacityFrom: 0.6,
                    opacityTo: 0.8,
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left'
            },
            xaxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul']
            }
        }
    });
    const [state_donus, setState_donus] = useState({
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                type: 'donut',
            },
            labels: ['Operativo', 'Mantenimiento', 'Fuera de Servicio', 'En Revisión', 'Disponible'],
            colors: ['#28a745', '#ffc107', '#dc3545', '#17a2b8', '#6c757d'],
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%'
                    }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return Math.round(val) + "%"
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " equipos"
                    }
                }
            }
        }
    });
    const [estudiosLubricacion, setEstudiosLubricacion] = useState({
        series: [{
            name: 'Estudios de Lubricación',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }],
        options: {
            chart: {
                type: 'line',
                height: 350
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            xaxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'],
                title: {
                    text: 'Meses'
                }
            },
            yaxis: {
                title: {
                    text: 'Cantidad de Estudios'
                }
            },
            title: {
                text: 'Estudios de Lubricación por Mes',
                align: 'center'
            },
            colors: ['#2563eb'],
            markers: {
                size: 4
            },
            grid: {
                borderColor: '#e5e7eb'
            }
        }
    });
    
    // Todos los useRef después de useState
    const fileInputRef = useRef(null);
    const chartRef = useRef(null);

    
    useEffect(() => {
        loadDashboardData();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [filter, equipmentData]);

    useEffect(() => {
        // Convertir los servicios a eventos para FullCalendar
        if (servicios.actuales && servicios.proximos) {
            const eventosCalendario = [...servicios.actuales, ...servicios.proximos].map(servicio => ({
                title: servicio.nombre,
                date: servicio.fecha,
                extendedProps: {
                    hora: servicio.hora,
                    lugar: servicio.lugar,
                    trabajador: servicio.trabajador
                }
            }))
            setEventos(eventosCalendario)
        }
    }, [servicios]);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            // Usar datos de prueba por ahora
            const mockData = [
                { id: 1, name: 'Tractor CAT 320', state: 'Operativo', equipment_type: 'equipment' },
                { id: 2, name: 'Excavadora John Deere', state: 'Mantenimiento', equipment_type: 'equipment' },
                { id: 3, name: 'Cargadora Volvo', state: 'Operativo', equipment_type: 'equipment' },
                { id: 4, name: 'Motor Diesel', state: 'Fuera de servicio', equipment_type: 'subequipment' },
                { id: 5, name: 'Bomba Hidráulica', state: 'Operativo', equipment_type: 'component' },
            ];
            
            // Datos mock para servicios
            const mockServicios = {
                actuales: [
                    {
                        id: 1,
                        nombre: 'Mantenimiento Preventivo - Tractor CAT',
                        fecha: '2025-09-19',
                        hora: '10:00',
                        lugar: 'Sede Central',
                        trabajador: 'Juan Pérez'
                    },
                    {
                        id: 2,
                        nombre: 'Inspección Hidráulica - Excavadora',
                        fecha: '2025-09-19',
                        hora: '14:00',
                        lugar: 'Taller Norte',
                        trabajador: 'María García'
                    }
                ],
                proximos: [
                    {
                        id: 3,
                        nombre: 'Cambio de Aceite - Cargadora Volvo',
                        fecha: '2025-09-20',
                        hora: '08:00',
                        lugar: 'Sede Central',
                        trabajador: 'Carlos López'
                    },
                    {
                        id: 4,
                        nombre: 'Revisión General - Motor Diesel',
                        fecha: '2025-09-21',
                        hora: '15:30',
                        lugar: 'Taller Sur',
                        trabajador: 'Ana Martínez'
                    }
                ]
            };
            
            setEquipmentData(mockData);
            setServicios(mockServicios);
            calculateStats(mockData);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        const operativeCount = data.filter(item => item.state === 'Operativo').length;
        const maintenanceCount = data.filter(item => item.state === 'Mantenimiento').length;
        const criticalCount = data.filter(item => item.state === 'Fuera de servicio').length;
        
        const stats = {
            totalEquipment: data.length,
            operativeEquipment: operativeCount,
            maintenanceEquipment: maintenanceCount,
            criticalEquipment: criticalCount
        };
        
        // Actualizar el gráfico donut con datos reales
        setState_donus(prevState => ({
            ...prevState,
            series: [operativeCount, maintenanceCount, criticalCount, 0, 0]
        }));
        
        setStats(stats);
    };

    const applyFilter = () => {
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

        // Crear archivo Excel usando una librería como xlsx
        const ws = window.XLSX ? window.XLSX.utils.json_to_sheet(exportData) : null;
        if (!ws) {
            alert('Librería de Excel no disponible. Instalando...');
            // Cargar dinámicamente la librería
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
            script.onload = () => exportToExcel(); // Reintentar después de cargar
            document.head.appendChild(script);
            return;
        }
        
        const wb = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(wb, ws, 'Equipos');
        
        const fileName = `equipos_${new Date().toISOString().split('T')[0]}.xlsx`;
        window.XLSX.writeFile(wb, fileName);
    };

    const exportToPDF = async () => {
        // Implementación básica de exportación a PDF
        window.print();
    };

    // Configuración de gráficos mejorados
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

     // Simular una llamada a la API para obtener los datos de estudios de lubricación
     const obtenerEstudiosLubricacion = async () => {
        try {
          const response = await apiClient.get('/estudios-lubricacion'); // Endpoint del backend
          const data = response.data;
      
          setEstudiosLubricacion({
            series: data.series,
            options: {
              ...estudiosLubricacion.options,
              xaxis: { categories: data.categorias },
            },
          });
        } catch (error) {
          console.error('Error al obtener los estudios de lubricación:', error);
        }
      };

      
        // Simular una llamada a la API para obtener los datos de estudios de lubricación por empresa
        const obtenerEstudiosLubricacionPorEmpresa = async () => {
            try {
              const response = await apiClient.get('/estudios-lubricacion-empresa'); // Endpoint del backend
              const data = response.data;
          
              setEstudiosLubricacionPorEmpresa({
                series: data.series,
                options: {
                  ...estudiosLubricacionPorEmpresa.options,
                  xaxis: { categories: data.categorias },
                },
              });
            } catch (error) {
              console.error('Error al obtener los estudios por empresa:', error);
            }
          };

    return (
        <>
        {/* header */}
            
            {/* div container */}
            <div className="p-5">
                
                <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <h3 className='text-xl mt-2 font-bold'>Panel de Control</h3>
                        {/* dashboard para admin y super admin */}
                        {user.roles['name'] === 'admin' || user.roles['name'] === 'super-admin' ? (
                    <div className='grid gap-4 grid-cols-2 flex mt-1'>
                    <div  className="p-8 bg-white mt-4 border-t-4 border-blue-900 rounded-lg">
                                {/* data user api  */}
                                <h3 className='flex items-center space-x-3'> <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} className=' border-lime-400 fill-gray-300 mr-3'  viewBox="0 0 512 512">
                                <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/>
                                        </svg>  Reporte de los Servicios</h3>
                                <hr className='mt-3'></hr>
                                <ApexCharts className='mt-12' options={state_donus.options} series={state_donus.series} type="donut" height={380} />
                                    
                            </div>
                           <div className='py-4'>
                           <div className="p-8 bg-white border-t-4 border-blue-900 rounded-lg">
                                <h3 className='flex items-center space-x-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} className='fill-gray-300 mr-3' viewBox="0 0 512 512">
                                        <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                                    </svg>
                                    Servicios de hoy    
                                </h3>
                                <hr className='mt-3 mb-4'></hr>
                                <ul className="space-y-4">
                                    {servicios.actuales.map(servicio => (
                                        <li key={servicio.id} className="bg-gray-100 p-4 rounded-lg">
                                            <div className="font-bold">{servicio.nombre}</div>
                                            <div className="text-sm text-gray-600">
                                                <span className="mr-3">{servicio.hora}</span>
                                                <span className="mr-3">{servicio.lugar}</span>
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                <span>Trabajador: {servicio.trabajador}</span>
                                            </div>
                                            {/* Temporalmente comentado para evitar errores de params */}
                                            <button 
                                                onClick={() => console.log('Ver detalles de servicio:', servicio.id)}
                                                className="float-right right-0 -mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded-full text-sm"
                                            >
                                                Ver más
                                            </button>
                                            
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-8 bg-white border-t-4 border-blue-900 rounded-lg mt-4">
                                <h3 className='flex items-center space-x-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} className='fill-gray-300 mr-3' viewBox="0 0 512 512">
                                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                                    </svg>
                                    Próximos Servicios
                                </h3>
                                <hr className='mt-3 mb-4'></hr>
                                <ul className="space-y-4">
                                {user.name}
                                    {servicios.proximos.map(servicio => (
                                        <li key={servicio.id} className="bg-gray-100 p-4 rounded-lg">
                                            <div className="font-bold">{servicio.nombre}</div>
                                            <div className="text-sm text-gray-600">
                                                <span className="mr-3">{servicio.hora}</span>
                                                <span className="mr-3">{servicio.lugar}</span>
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                <span>Trabajador: {servicio.trabajador}</span>
                                            </div>
                                            {/* Temporalmente comentado para evitar errores de params */}
                                            <button 
                                                onClick={() => console.log('Ver próximo servicio:', servicio.id)}
                                                className="float-right right-0 -mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full text-sm"
                                            >
                                                Ver más
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                           </div>
                    </div>
                       ):null} 
                       {user.roles['name'] === 'admin' || user.roles['name'] === 'super-admin' ? (
                        <>
                        <div className='grid  gap-4 grid-cols-1 flex'>
                            
                            <div className="p-8 bg-white mt-8 border-t-4 border-blue-900 rounded-lg">
                                <h3 className='flex items-center space-x-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} className='border-lime-400 fill-gray-300 mr-3' viewBox="0 0 512 512">
                                        <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8V128h-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48V352h28.2l91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16V352c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V128H16zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128V352c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V144c0-8.8-7.2-16-16-16H544zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"/>
                                    </svg>
                                    Estudios de Lubricación por Empresa
                                </h3>
                                <hr className='mt-3'></hr>
                                <ApexCharts options={estudiosLubricacionPorEmpresa.options} series={estudiosLubricacionPorEmpresa.series} type="area" height={350} />
                            </div>
                        </div>
                        
                        <div className="p-8 bg-white mt-8 border-t-4 border-blue-900 rounded-lg">
                            <h3 className='flex items-center space-x-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} className='border-lime-400 fill-gray-300 mr-3' viewBox="0 0 512 512">
                                    <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8V128h-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48V352h28.2l91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16V352c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V128H16zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128V352c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V144c0-8.8-7.2-16-16-16H544zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"/>
                                </svg>
                                Estudios de Lubricación
                            </h3>
                            <hr className='mt-3'></hr>
                            <ApexCharts options={estudiosLubricacion.options} series={estudiosLubricacion.series} type="line" height={350} />
                        </div>
                        </>
                       ):null}
                       {/* dashboard para client */}
                       {user.roles['name'] === 'operate' ? (
                        <>
                            <div className='grid gap-4 grid-cols-2 flex mt-1'>
                            <div className='py-4'>
                            <div className="p-8 bg-white border-t-4 border-blue-900 rounded-lg">
                                    <h3 className='flex items-center space-x-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} className='fill-gray-300 mr-3' viewBox="0 0 512 512">
                                            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                                        </svg>
                                        Servicios de hoy    
                                    </h3>
                                    <hr className='mt-3 mb-4'></hr>
                                    <ul className="space-y-4">
                                        
                                        {
                                        (servicios.actuales.length > 0) ?
                                        servicios.actuales.map(servicio => (
                                            <li key={servicio.id} className="bg-gray-100 p-4 rounded-lg">
                                                <div className="font-bold">{servicio.name}</div>
                                                <div className="text-sm text-gray-600">
                                                    <span className="mr-3">{servicio.hora}</span>
                                                    <span className="mr-3">{servicio.direccion}</span>
                                                </div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    <span>Maquina: {servicio.machine.name}</span>
                                                </div>
                                                {/* Temporalmente comentado para evitar errores de params */}
                                                <button 
                                                    onClick={() => console.log('Ver detalle servicio:', servicio.id)}
                                                    className="float-right right-0 -mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded-full text-sm"
                                                >
                                                    Detalle del Servicio
                                                </button>
                                            </li>
                                        )): 
                                        // sino viene ningun registro mostramos esto
                                        <div className='flex justify-center items-center'>
                                            <div>
                                            <img src='../imagen/maquina.png'></img>
                                            <h3>No tienes Servicios Asignados</h3>
                                            </div>
                                            
                                        </div>}
                                    </ul>
                                </div>
                                <div className="p-8 bg-white border-t-4 border-blue-900 rounded-lg mt-4">
                                    <h3 className='flex items-center space-x-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} className='fill-gray-300 mr-3' viewBox="0 0 512 512">
                                            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                                        </svg>
                                        Próximos Servicios
                                    </h3>
                                    <hr className='mt-3 mb-4'></hr>
                                    <ul className="space-y-4">
                                        
                                         {
                                        (servicios.proximos.length > 0) ?
                                         servicios.proximos.map(servicio => (
                                            <li key={servicio.id} className="bg-gray-100 p-4 rounded-lg">
                                                <div className="font-bold">{servicio.name}</div>
                                                <div className="text-sm text-gray-600">
                                                    <span className="mr-3">{servicio.hora}</span>
                                                    <span className="mr-3">{servicio.direccion}</span>
                                                </div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    <span>Maquina: {servicio.machine.name}</span>
                                                </div>
                                                <button className="float-right right-0 -mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full text-sm">
                                                    Ver más
                                                </button>
                                            </li>
                                        )):
                                        // sino viene ningun registro mostramos esto
                                        <div className='flex justify-center items-center'>
                                            <div>
                                            <img src='../imagen/maquina.png'></img>
                                            <h3>No tienes Servicios Asignados</h3>
                                            </div>
                                            
                                        </div>
                                        } 
                                    </ul>
                                </div>
                            </div>
                            <div className='py-4'>
                                    <div className="p-8 bg-white border-t-4 border-blue-900 rounded-lg">
                                            <h3 className='flex items-center space-x-3'>
                                                <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} className='fill-gray-300 mr-3' viewBox="0 0 512 512">
                                                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                                                </svg>
                                                Calendario de Servicios
                                            </h3>
                                            <hr className='mt-3 mb-5'></hr>
                                            <FullCalendar
                                    plugins={[dayGridPlugin]}
                                    initialView="dayGridMonth"
                                    locale={esLocale}
                                    events={eventos}
                                    height="auto"
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'dayGridMonth,dayGridWeek'
                                    }}
                                    eventContent={(eventInfo) => (
                                        <>
                                            <b>{eventInfo.timeText}</b>
                                            <i>{eventInfo.event.title}</i>
                                        </>
                                    )}
                                    dayCellClassNames="custom-day-cell"
                                />
                                
                                    </div>
                                </div>
                            </div>
                        </>
                       ):null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard