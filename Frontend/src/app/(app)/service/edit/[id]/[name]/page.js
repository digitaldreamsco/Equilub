
'use client'
import { useAuth } from '@/hooks/auth'
import ApexCharts from 'react-apexcharts'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'next/navigation'
import { useServices } from '@/hooks/services'
import Image from 'next/image';
import {useMachine} from '@/hooks/machine'
import { useUsers } from '@/hooks/users'
import { useFormatt }  from '@/hooks/Formatt'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Button from '@/components/Button'

const details = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const params = useParams()
    const name = params.name
    const id = params.id
    const [formattData, setDataFormatt] = useState([])
    const [encargado, setEncargado] = useState('')
    const [maquinas, setMaquinas] = useState([])
    const imagenInputRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [tmpMaquinas, setTmpMaquinas] = useState({})
    const [nombreMaquina, setNombreMaquina] = useState('')
    const [estado, setEstado] = useState('')
    const [tipoMaquina, setTipoMaquina] = useState('')
    const [observacion, setObservacion] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const [services, setSevices] = useState({})
    // Estado para almacenar usuarios y errores
    const [employed, setUsuarios] = useState([]);
    
     // Simular una llamada a la API para obtener los servicios
     const obtenerServicios = async () => {
        // Reemplazar esto con una llamada real a tu API
        const {getServicesId} = useServices()
        getServicesId({
            setSevices,
            id:id,
        })
    }

    const EncargadoSelect = () => {
        // Hook personalizado para obtener usuarios con roles
        const { getUsersWithRoles } = useUsers();
            getUsersWithRoles({
            setData: setUsuarios, // Almacena los usuarios en el estado
            })          // Maneja errores si ocurren
        
    }    
const fetchMaquinas = () => {
    const { getMachine } = useMachine()

    getMachine({
        setMaquinas,
    })
}

const fetchFormatt = () => {
    const { formmatDate } = useFormatt()

    formmatDate({
        setDataFormatt,
    })
}
const handleOpenModal = () => {
    setIsModalOpen(true)
}

const handleCloseModal = () => {
    setIsModalOpen(false)
    // Limpiar campos al cerrar el modal
    setNombreMaquina('')
    setEstado('')
    setTipoMaquina('')
    setObservacion('')
    setDescripcion('')
}


const handleSubmitModal = async (e) => {
    e.preventDefault();
    try {
        const {saveNewMachine} = useMachine()
        saveNewMachine({
            name: nombreMaquina,
            state: estado,
            type: tipoMaquina,
            observation: observacion,
            description: descripcion, 
            setTmpMaquinas,
            setErrors
        })
        
        // Limpia los campos del modal
        setNombreMaquina('')
        setEstado('')
        setTipoMaquina('')
        setObservacion('')
        setDescripcion('')
        // Agregar la nueva máquina directamente al estado
        setMaquinas((prevMaquinas) => [...prevMaquinas, {id: tmpMaquinas.id, nombreMaquina: tmpMaquinas.name, estado: tmpMaquinas.state, type: tmpMaquinas.type, observation: tmpMaquinas.observation, description: tmpMaquinas.description}])
        // Cierra el modal
        handleCloseModal()
    } catch (error) {
        alert('Error al guardar la máquina')
        console.error(error)
    }
}

const handleImageUpload = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setSevices(prev =>({...prev,image: e.target.result}));
        };
        reader.readAsDataURL(file);
    }
}, []);

const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageUpload(e.dataTransfer.files[0]);
    }
}, [handleImageUpload]);

const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
}, [])

const handleSubmit = () =>{
    const {updateUser} = useServices()
    updateUser({
        id: id,
        name: services.name,
        description: services.description,
        hora: services.hora,
        direccion: services.direccion,
        date: services.date,
        machine_id: services.machine_id,
        formatt_id: services.formatt_id,
        user_id: services.user_id,
        image: services.image,
    })
}

    useEffect(() => {
        obtenerServicios()
        EncargadoSelect()
        fetchMaquinas()
        fetchFormatt()
    }, [])

    return (
        <>
        {/* header */}
            
        <div className="py-5 px-5 bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-8 bg-white">
                        <h3 className='font-bold mb-6'>Home / Servicios / <span className='font-normal'>Nuevo Servicio</span></h3>
                        <h3 className='font-bold mb-6'>Nuevo Servicio</h3>
                        
                            <div className="mb-4">
                                <Label htmlFor="titulo">Título del Servicio</Label>
                                <Input
                                    id="titulo"
                                    type="text"
                                    value={services.name}
                                    onChange={(e) => setSevices(prev =>({...prev, name: e.target.value}))}
                                    required
                                    className="w-full rounded-full text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="descripcion">Descripción del Servicio</Label>
                                <textarea
                                    id="descripcion"
                                    type="text"
                                    value={services.description}
                                    onChange={(e) => setSevices(prev =>({...prev, description: e.target.value}))}
                                    required
                                    className="w-full rounded-[12px] border-gray-300 shadown-md text-sm"
                                    rows={5}
                                    cols={1}
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="lugar">Lugar del Servicio</Label>
                                <Input
                                    id="lugar"
                                    type="text"
                                    value={services.direccion}
                                    onChange={(e) => setSevices(prev =>({...prev, direccion: e.target.value}))}
                                    required
                                    className="w-full rounded-full text-sm"
                                />
                            </div>

                            <div className="mb-4 flex items-center">
                              <div className="w-[70%]">
                               <Label htmlFor="maquina">Máquina a realizar servicio</Label>
                                    <select
                                        id="maquina"
                                        value={services.machine_id} // Máquina seleccionada
                                        onChange={(e) => setSevices(prev =>({...prev, machine_id:e.target.value}))} // Actualiza la máquina seleccionada
                                        required
                                        className="w-full text-sm rounded-full border-1 border-gray-300">
                                            <option value="">Seleccione una máquina</option>
                                            {
                                            (maquinas.length > 0) ?  
                                            Object( maquinas.map((item) => (
                                            <option key={item.id} value={item.id}>
                                            {item.name}
                                            </option>
                                        ))
                                        ): null}
                                    </select>
                                </div>
                                <div className="w-[20%] flex items-center justify-center">
                                    <button onClick={handleOpenModal} className="text-sm text-blue-800">
                                        Crear nueva máquina
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="fecha">Fecha del Servicio</Label>
                                <Input
                                    id="fecha"
                                    type="date"
                                    value={services.date}
                                    onChange={(e) => setSevices(prev=>({...prev, date: e.target.value}))}
                                    required
                                    className="w-full rounded-full text-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="hora">Hora del Servicio</Label>
                                <Input
                                    id="hora"
                                    type="time"
                                    value={services.hora}
                                    onChange={(e) => setSevices(prev=>({...prev, hora: e.target.value}))}
                                    required
                                    className="w-full rounded-full text-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="encargado">Encargado de la operación</Label>
                                <select
                                    id="encargado"
                                    value={services.user_id}
                                    onChange={(e) => setSevices(prev=>({...prev, user_id: e.target.value}))}
                                    required
                                    className="w-full text-sm rounded-full border-1 border-gray-300"
                                >
                                    <option value="">Seleccione un encargado</option>
                                    {
                                        (employed?.length > 0) ? (
                                            employed.map((usuario) => (
                                                <option key={usuario.id} value={usuario.id}>
                                                    {`${usuario.roles.name} - ${usuario.name}`}
                                                </option>
                                            ))
                                        ): null
                                    }
                                </select>
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="encargado">Formato de estudio de lubricación</Label>
                                <select
                                    id="encargado"
                                    type="text"
                                    value={services.formatt_id}
                                    onChange={(e) => setSevices(prev =>({...prev, formatt_id: e.target.value}))}
                                    required
                                    className="w-full text-sm rounded-full border-1 border-gray-300"
                                >
                                    
                                    <option value="">Seleccione un formato</option>
                                    {
                                        (formattData?.length > 0) ? (
                                            formattData.map((formatt) => (
                                                <option key={formatt.id} value={formatt.id}>
                                                    {`${formatt.name}`}
                                                </option>
                                            ))
                                        ): null
                                    }
                                </select>   
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="imagen">Imagen del Servicio</Label>
                                <div 
                                    className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
                                    onClick={() => imagenInputRef.current.click()}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <div className="space-y-1 text-center">
                                        {services?.image ? (
                                            <img src={services?.image} alt="Imagen del Servicio" width={200} height={200} className="mx-auto" />
                                        ) : (
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="imagen-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Subir un archivo</span>
                                                <input 
                                                    id="imagen-upload" 
                                                    name="imagen-upload" 
                                                    type="file" 
                                                    className="sr-only" 
                                                    ref={imagenInputRef}
                                                    onChange={(e) => handleImageUpload(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </label>
                                            <p className="pl-1">o arrastrar y soltar</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button className="text-xs" onClick={handleSubmit} type="submit">Actualizar Servicio</Button>
                            </div>
                        
                    </div>
                </div>
            </div>
            {/* ventana modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-[500px]">
                        <h2 className="font-bold mb-4">Nueva Máquina</h2>
                        <form onSubmit={handleSubmitModal}>
                            <div className="mb-4">
                                <Label htmlFor="nombreMaquina">Nombre de Máquina</Label>
                                <Input
                                    id="nombreMaquina"
                                    type="text"
                                    value={nombreMaquina}
                                    onChange={(e) => setNombreMaquina(e.target.value)}
                                    required
                                    className="w-full text-sm rounded-full"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="estado">Estado</Label>
                                <Input
                                    id="estado"
                                    type="text"
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                    required
                                    className="w-full text-sm rounded-full"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="tipoMaquina">Tipo de Máquina</Label>
                                <Input
                                    id="tipoMaquina"
                                    type="text"
                                    value={tipoMaquina}
                                    onChange={(e) => setTipoMaquina(e.target.value)}
                                    required
                                    className="w-full text-sm rounded-full"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="observacion">Observación</Label>
                                <Input
                                    id="observacion"
                                    type="text"
                                    value={observacion}
                                    onChange={(e) => setObservacion(e.target.value)}
                                    required
                                    className="w-full text-sm rounded-full"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="descripcion">Descripción</Label>
                                <Input
                                    id="descripcion"
                                    type="text"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    required
                                    className="w-full text-sm rounded-full"
                                />
                            </div>
                            <div className="flex justify-end">
                            <Button className='bg-gray-500 text-blue-800 text-xs mr-2' type="button" onClick={handleCloseModal}>Cancelar</Button>
                                <Button className='text-xs' type="submit">Guardar</Button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}

export default details