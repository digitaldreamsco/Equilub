'use client'
import Header from '@/app/(app)/Header'
import axios from 'axios'
import { useAuth } from '@/hooks/auth'
import Button from '@/components/Button'
import TextArea from '@/components/Textarea'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [idiomas, setIdiomas] = useState([
        { id: 1, nombre: 'Español', estado: 'Activo', predeterminado: true },
        { id: 2, nombre: 'Inglés', estado: 'Activo', predeterminado: false },
        { id: 3, nombre: 'Francés', estado: 'Inactivo', predeterminado: false }
    ]);

    const setIdiomaPredeterminado = async (index) => {
        try {
            const idiomaSeleccionado = idiomas[index];
            
            // Llamada a la API para actualizar el idioma predeterminado
            await axios.put('/api/idiomas/predeterminado', { id: idiomaSeleccionado.id });
            
            // Si la llamada a la API es exitosa, actualizamos el estado local
            setIdiomas(idiomas.map((idioma, i) => ({
                ...idioma,
                predeterminado: i === index
            })));
        } catch (error) {
            console.error('Error al actualizar el idioma predeterminado:', error);
           alert('Error al actualizar el idioma predeterminado:');
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    const [title, setTitle] = useState('');
    const [descrption, setDescription] = useState('');
    const [typePrpperty, setTypeProperty] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState([])
    const check = (element) => {
        var checkbox = document.getElementById(element);
        checkbox.classList.remove('hidden')
        checkbox?.click();
    }
    return (
        <>
        {/* header */}
            
            {/* div container */}
            <div className="py-6 bg-gray-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-800">Home / Configuración / <span className="font-normal">Idioma</span></h3>
                                <Button>
                                    Nuevo Idioma
                                </Button>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idioma</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predeterminado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {idiomas.map((idioma, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{idioma.nombre}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {idioma.estado === 'Activo' ? (
                                                        <span className="text-green-500">
                                                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                                                            {idioma.estado}
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-500">
                                                            <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                                                            {idioma.estado}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <input 
                                                        type="radio" 
                                                        checked={idioma.predeterminado} 
                                                        onChange={() => setIdiomaPredeterminado(index)}
                                                        className="form-radio h-4 w-4 text-blue-600" 
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-gray-500 hover:text-gray-700 mr-3">
                                                        <FontAwesomeIcon icon={faPencilAlt} className='w-[25px]' />
                                                    </button>
                                                    <button className="text-red-500 hover:text-red-700">
                                                        <FontAwesomeIcon icon={faTrash} className='w-[25px]' />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard