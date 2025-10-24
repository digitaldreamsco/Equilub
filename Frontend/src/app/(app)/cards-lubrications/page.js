'use client'
import { faDownload, faEye, faPencilAlt, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useCallback } from 'react'

const NewCardLubricationsPage = () => {
    const [titulo, setTitulo] = useState('');
    const [maquina, setMaquina] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [encargado, setEncargado] = useState('');
    const [imagen, setImagen] = useState(null);
    const imagenInputRef = useRef(null);
    const [isModalOpenDownload, setIsModalOpenDownload] = useState(false);
    const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);
    const [formato, setFormato] = useState('');

    const toggleModal = () => {
        setIsModalOpenDownload(!isModalOpenDownload);
    };
    const toggleModal2 = () => {
        setIsModalOpenDetails(!isModalOpenDetails);
    };

    return (
        <div className="px-5 bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-8 bg-white">
                        <h3 className='font-bold mb-6'>Home / Servicios / <span className='font-normal'>Carta de lubricación</span></h3>
                        <h2 className="text-2xl font-bold mb-6">Cartas de estudios de lubricación</h2>
                        <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referencia</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maquina</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {/* {idiomas.map((idioma, index) => ( */}
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">131351318-5</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    Rf-4588
                                                    {/* {idioma.estado === 'Activo' ? (
                                                        <span className="text-green-500">
                                                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                                                            {idioma.estado}
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-500">
                                                            <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                                                            {idioma.estado}
                                                        </span>
                                                    )} */}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button onClick={toggleModal2} className="text-gray-500 hover:text-gray-700 mr-3">
                                                        <FontAwesomeIcon icon={faEye} className='w-[25px]' />
                                                    </button>
                                                    <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700 mr-3">
                                                        <FontAwesomeIcon icon={faDownload} className='w-[25px]' />
                                                    </button>
                                                    {/* <button className="text-gray-500 hover:text-gray-700 mr-3">
                                                        <FontAwesomeIcon icon={faPencilAlt} className='w-[25px]' />
                                                    </button> */}
                                                    <button className="text-red-500 hover:text-red-700">
                                                        <FontAwesomeIcon icon={faTrash} className='w-[25px]' />
                                                    </button>
                                                </td>
                                            </tr>
                                        {/* ))} */}
                                    </tbody>
                                </table>
                            </div>
                       

                        {isModalOpenDownload && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="bg-white p-5 rounded shadow-lg w-[400px] overflow-y-auto max-h-[90vh]">
                                    <h2 className="text-xl font-bold mb-4">Descargar Archivo</h2>
                                    <p>Título del archivo:</p>
                                    <input 
                                        type="text" 
                                        value={titulo} 
                                        onChange={(e) => setTitulo(e.target.value)} 
                                        className="border rounded-full w-full px-4 mb-4 text-sm"
                                        placeholder="Ingrese el título del archivo"
                                    />
                                    <p>Formato a descargar:</p>
                                    <select 
                                        value={formato} 
                                        onChange={(e) => setFormato(e.target.value)} 
                                        className="border rounded-full w-full text-sm px-4 mb-4"
                                    >
                                        <option value="">Seleccione un formato</option>
                                        <option value="Excel">Excel</option>
                                        <option value="PDF">PDF</option>
                                        <option value="Imagen">Imagen</option>
                                    </select>
                                    <div className='flex justify-end'>
                                        <button onClick={toggleModal} className="mt-4 text-gray-500 hover:text-gray-700 mr-5">
                                            Cerrar
                                        </button>
                                        <button onClick={''} className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-full hover:text-blue-700">
                                            Exportar
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        )}
                        {isModalOpenDetails && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="bg-white p-5 rounded shadow-lg w-auto overflow-y-auto max-h-[90vh]">
                                    <h2 className="text-xl font-bold mb-4">Carta de Lubricación</h2>
                                    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div className='mb-5' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src="/imagen/default-logo.png" alt="Logo" style={{ width: '150px' }} /> {/* Cambia la ruta del logo */}
                
                <h2 className='font-bold' style={{ textAlign: 'center' }}>REACH STACKER</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    <p><strong>Versión:</strong> (dejar espacio para la versión)</p>
                    <p><strong>Fecha:</strong> 15/12/2023</p>

                    <h3>Información del Fabricante</h3>
                    <p><strong>Fabricante:</strong> Konecranes</p>
                    <p><strong>Modelo / Año:</strong> SMV4531TB5 - 2013</p>
                    <p><strong>Número de serie:</strong> (número de serie)</p>
                    <p><strong>Tipo de equipo:</strong> (tipo de equipo)</p>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="/imagen/maquina.png" alt="Imagen de la máquina" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            </div>

            <h3>Puntos de Lubricación</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#f2f2f2' }}>Punto</th>
                        <th style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#f2f2f2' }}>Lubricante recomendado</th>
                        <th style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#f2f2f2' }}>Referencias utilizadas</th>
                        <th style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#f2f2f2' }}>Método</th>
                        <th style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#f2f2f2' }}>Frecuencia de lubricación</th>
                        <th style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#f2f2f2' }}>Volumen</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>1</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>SAE 15W-40</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>ATF Dexron III</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>Recipiente</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>1000 h</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>500 l</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>2</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>API GL-3</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>SAE 80W-140</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>Recipiente</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>4000 h</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>1000 l</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>3</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>SAE 80W-90</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>Multipropósito</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>Recipiente</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>4000 h</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>400 l</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>4</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>Multipropósito</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>NLGI 2</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>Recipiente</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>Mensual</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>N/A</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>5</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>SAE 10W-30</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>Multipropósito</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>Recipiente</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>4000 h</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>238 gal</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>6</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>Multipropósito</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>NLGI 2</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>Recipiente</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>Mensual</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>N/A</td>
                    </tr>
                </tbody>
            </table>

            <h3>Información Adicional</h3>
            <p><strong>Elaborado por:</strong> Jaime De Luque</p>
            <p><strong>Revisado por:</strong> (nombre de la persona que revisa)</p>
        </div>
                                    <div className='flex justify-end'>
                                        <button onClick={toggleModal2} className="mt-4 text-gray-500 hover:text-gray-700 mr-5">
                                            Cerrar
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewCardLubricationsPage
