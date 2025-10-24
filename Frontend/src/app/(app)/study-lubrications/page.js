'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormularioDinamico() {
    const [estudios, setEstudios] = useState([]);

    useEffect(() => {
        const obtenerEstudios = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/study-lubrications');
                setEstudios(response.data);
            } catch (error) {
                console.error('Error al obtener los estudios de lubricación:', error);
            }
        };

        obtenerEstudios();
    }, []);

    return (
        <div className="py-5 px-5 bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-8 bg-white">
                        <h3 className="font-bold mb-6">
                            Home / Servicios / <span className="font-normal">Formatos de lubricación</span>
                        </h3>
                        <h2 className="text-2xl font-bold mb-6">Estudios de lubricación</h2>

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Máquina</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documentos</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha del Servicio</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {estudios.map((estudio) => (
                                        <tr key={estudio.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{estudio.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{estudio.service?.name || 'Sin servicio'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{estudio.machine?.name || 'Sin máquina'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{estudio.documents}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{estudio.service?.date || 'Sin fecha'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormularioDinamico;
