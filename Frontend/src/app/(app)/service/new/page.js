'use client'
import { useState, useRef, useCallback } from 'react'
import { useEffect } from 'react'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Button from '@/components/Button'
import {useServices} from '@/hooks/services'
import {useMachine} from '@/hooks/machine'
import { useAuth } from '@/hooks/auth'
import Image from 'next/image'
import { useUsers } from '@/hooks/users'
import { useFormatt }  from '@/hooks/Formatt'
import { useClient } from '@/hooks/clients'
import { useTypeOfIdentity } from '@/hooks/typeOfIdentity'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faRandom } from '@fortawesome/free-solid-svg-icons'


const NewServicePage = () => {
    const { user } = useAuth({ middleware: 'auth' })

    // formulario de envio
    const [titulo, setTitulo] = useState('')
    const [maquina, setMaquina] = useState('')
    const [cliente, setCliente] = useState('')
    const [tmpMaquinas, setTmpMaquinas] = useState({})
    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')
    const [encargado, setEncargado] = useState('')
    const [imagen, setImagen] = useState(null)
    const [formato, setFormato] = useState('')
    const imagenInputRef = useRef(null)

    // dropdowns
    const [maquinas, setMaquinas] = useState([])
    const [client, setClient] = useState({})
    const [typeOfIdentitys, setTypeOfIdentitys] = useState([])
    const [sex, setSex] = useState([
        { id: 'M', name: 'Masculino' },
        { id: 'F', name: 'Femenino' },
        { id: 'NB', name: 'No Binario' },
        { id: 'LBGTI', name: 'LBGTI' },
    ])

    
    // modales
    const [isModalOpenClients, setIsModalOpenClients] = useState(false)
    const [isModalOpenMachine, setIsModalOpenMachine] = useState(false)

    // campos de crear nueva maquina
    const [nombreMaquina, setNombreMaquina] = useState('')
    const [estado, setEstado] = useState('')
    const [tipoMaquina, setTipoMaquina] = useState('')
    const [observacion, setObservacion] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [direccion, setDireccion] = useState('')
  
    const [data, setData] = useState([])
    const [formattData, setDataFormatt] = useState([])


    // campos de crear nuevo cliente
    const [tipodecliente, setTipodeCliente] = useState(1) // empresa o cliente normal
    const [tipodeidentidad, setTipodeIdentidad] = useState('')
    const [numeroidentidad, setNumeroidentidad] = useState('')
    const [nombreClients, setNombreClients] = useState('')
    const [apellidoClients, setApellidoClients] = useState('')
    const [sexoClients, setSexoClients] = useState('')
    const [direccionClients, setDireccionClients] = useState('')
    const [telefonoClients, setTelefonoClients] = useState('')
    const [correoClients, setCorreoClients] = useState('')
    const [apellidolegal, setApellidolegal] = useState('')
    const [direccionLegal, setDireccionLegal] = useState('')
    const [telefonoLegal, setTelefonoLegal] = useState('')
    const [correoLegal, setCorreoLegal] = useState('')
    const [nombrelegal, setNombrelegal] = useState('')
    const [sexoLegal, setSexoLegal] = useState('')
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')

    // tab mostrar información 
    const [isOpenTablegal, setisOpenTablegal] = useState(false)
    const [isOpenTabCredentials, setIsOpenTabCredentials] = useState(false)
    
    
    // Estado para almacenar usuarios y errores
    const [employed, setUsuarios] = useState([]);

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

const fetchClient = () => {
    const { getClient } = useClient()

    getClient({
        setClient,
    })
}

const fetchFormatt = () => {
    const { formmatDate } = useFormatt()

    formmatDate({
        setDataFormatt,
    })
}

const handletipeOfIdentity = () =>{
    const { getActiveTypeOfIdentity } = useTypeOfIdentity()

    getActiveTypeOfIdentity({
        setTypeOfIdentitys,
    })
}

// cargar maquinas
useEffect(() => {
    EncargadoSelect()
    fetchMaquinas()
    fetchFormatt()
    fetchClient()
}, [])


    const handleImageUpload = useCallback((file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagen(e.target.result);
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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {saveNewServices} = useServices()
        await saveNewServices({
                    name: titulo,
                    description: descripcion,
                    date: fecha,
                    hora: hora,
                    direccion: direccion,
                    formatt_id:formato,
                    client_id: cliente,
                    image:imagen,
                    machine_id: maquina,
                    user_id: encargado,
                    create_user_id: user[0].id,
                    image: imagen,
                    setData
                })
        // Limpiar campos después de guardar
        setTitulo('');
        setDescripcion('');
        setFecha('');
        setHora('');
        setDireccion('');
        setFormato('');
        setImagen(null);
        setMaquina('');
        setEncargado('');
    }

    const handleCloseModalClients = () => {
        setIsModalOpenClients(false);
        // Limpiar campos al cerrar el modal
        setNombreMaquina('');
        setEstado('');
        setTipoMaquina('');
        setObservacion('');
        setDescripcion('');
    };
    const handleCloseModalMachine = () => {
        setIsModalOpenMachine(false);
        // Limpiar campos al cerrar el modal
        setNombreMaquina('');
        setEstado('');
        setTipoMaquina('');
        setObservacion('');
        setDescripcion('');
    };

const handleSubmitModalMachine = async (e) => {
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
            isReloadMachine: true,
            setMaquinas
        }).then(()=>{
            fetchMaquinas()
        })
        
        // Limpia los campos del modal
        setNombreMaquina('')
        setEstado('')
        setTipoMaquina('')
        setObservacion('')
        setDescripcion('')
        // Agregar la nueva máquina directamente al estado
        fetchMaquinas()
        // Cierra el modal
        handleCloseModalMachine()
    } catch (error) {
        alert('Error al guardar la máquina');
        console.error(error);
    }
}

const handleSubmitModalClients = async (e) => {
    e.preventDefault()

    //   // campos de crear nuevo cliente
   
        const {saveNewClient} = useClient()
        saveNewClient({
            type_client: tipodecliente,
            type_id: tipodeidentidad,
            number_id: numeroidentidad,
            name: nombreClients,
            lastname: apellidoClients, 
            cellphone: telefonoClients, 
            address: direccionClients, 
            email: correoClients, 
            Sex: sexoClients, 
            People_legal: `${nombrelegal},${apellidolegal}`,
            cellphone_legal: telefonoLegal, 
            email_legal: correoLegal, 
            Sex_legal: sexoLegal, 
            stated: 1,
            user: user,
            password: password, 
            setClient
        }).then(()=>{
            fetchClient()
        })
        
        // Limpia los campos del modal
        setNombreMaquina('')
        setEstado('')
        setTipoMaquina('')
        setObservacion('')
        setDescripcion('')
        // Agregar la nueva máquina directamente al estado
        fetchClient()
        // Cierra el modal
        handleCloseModalClients()
    
}
// crear numeros aleatorios para contraseña

  const randomNumber = () => {
    const number = Math.floor(10000000 + Math.random() * 90000000) // Genera un número de 8 dígitos
    setPassword(number)

}
    return (
        <div className="py-5 px-5 bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-8 bg-white">
                        <h3 className='font-bold mb-6'>Home / Servicios / <span className='font-normal'>Nuevo Servicio</span></h3>
                        <h3 className='font-bold mb-6'>Nuevo Servicio</h3>
                        
                            <div className="mb-4">
                                <Label htmlFor="titulo">Título del Servicio (*)</Label>
                                <Input
                                    id="titulo"
                                    type="text"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    required
                                    className="w-full rounded-full text-sm"
                                    placeholder="Ingresa el titulo del servicio"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="descripcion">Descripción del Servicio</Label>
                                <textarea
                                    id="descripcion"
                                    type="text"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
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
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    className="w-full rounded-full text-sm"
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                              <div className="w-[70%]">
                               <Label htmlFor="client">Cliente a realizar servicio {cliente}</Label>
                                    
                                    <select
                                        id="client"
                                        value={cliente} // Máquina seleccionada
                                        onChange={(e) => setCliente(e.target.value)} // Actualiza la máquina seleccionada
                                        required
                                        className="w-full rounded-full text-sm rounded-full border-1 border-gray-300">
                                            <option value="">Seleccione una cliente</option>
                                            {
                                            (client.length > 0) ?  
                                            
                                            Object( client.map((item) => (
                                            <option key={item.id} value={item.id}>
                                            {item.name}
                                            </option>
                                        ))
                                        ): null}
                                    </select>
                                </div>
                                <div className="w-[20%] flex items-center justify-center ">
                                    <button onClick={() => {setIsModalOpenClients(true), handletipeOfIdentity() }} className="text-sm rounded-full bg-blue-900 px-8 py-2 text-white mt-5 hover:bg-blue-800">
                                        Crear nuevo cliente
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4 flex items-center">
                              <div className="w-[70%]">
                               <Label htmlFor="maquina">Máquina a realizar servicio</Label>
                                    <select
                                        id="maquina"
                                        value={maquina} // Máquina seleccionada
                                        onChange={(e) => setMaquina(e.target.value)} // Actualiza la máquina seleccionada
                                        required
                                        className="w-full rounded-full text-sm rounded-full border-1 border-gray-300">
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
                                    <button onClick={() => setIsModalOpenMachine(true)} className="text-sm rounded-full bg-blue-900 px-8 py-2 text-white mt-5 hover:bg-blue-800">
                                        Crear nueva máquina
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="fecha">Fecha del Servicio</Label>
                                <Input
                                    id="fecha"
                                    type="date"
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                    required
                                    className="w-full rounded-full text-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="hora">Hora del Servicio</Label>
                                <Input
                                    id="hora"
                                    type="time"
                                    value={hora}
                                    onChange={(e) => setHora(e.target.value)}
                                    required
                                    className="w-full rounded-full text-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="encargado">Encargado de la operación</Label>
                                <select
                                    id="encargado"
                                    value={encargado}
                                    onChange={(e) => setEncargado(e.target.value)}
                                    required
                                    className="w-full rounded-full text-sm rounded-md border-1 border-gray-300"
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
                                    value={formato}
                                    onChange={(e) => setFormato(e.target.value)}
                                    required
                                    className="w-full rounded-full text-sm rounded-md border-1 border-gray-300"
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
                                        {imagen ? (
                                            <Image src={imagen} alt="Imagen del Servicio" width={200} height={200} className="mx-auto" />
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
                                <Button className="text-xs" onClick={handleSubmit} type="submit">Crear Servicio</Button>
                            </div>
                        
                    </div>
                </div>
            </div>
            {/* ventana modal */}
            {isModalOpenClients && (
                <div className={`fixed inset-0 backdrop-opacity-50 bg-gray-800/50 flex ${(!isOpenTablegal || !isOpenTabCredentials)?'items-center':'items-start'} justify-center z-50 overflow-auto`}>
                    <div className="bg-white p-6 rounded shadow-lg w-[500px] mt-10">
                        <h2 className="font-bold mb-4">Nuevo Cliente <span className='font-normal text-xs'>(empresa o persona natural)</span> </h2>
                        <form onSubmit={handleSubmitModalClients}>
                        <div className='flex mb-5 space-x-8'>
                            <div className='cursor-pointer' onClick={() => setTipodeCliente(1)}>
                                <Input type='radio' name='clients' className={'mr-3'} checked={tipodecliente === 1} onChange={() => setTipodeCliente(1)}></Input> Empresa
                            </div>
                            <div className='cursor-pointer' onClick={() => setTipodeCliente(2)}>
                                <Input type='radio' name='clients'  className={'mr-3'} checked={tipodecliente === 2} onChange={() => setTipodeCliente(2)}></Input> Persona Natural
                            </div>
                            
                                
                        </div>
                            <div className='flex space-x-4'>
                                <div className="mb-4 w-1/2">
                                    
                                    <Label htmlFor="nombreMaquina">Tipo de identidad</Label>
                                     <select
                                        id="tipodeidentidad"
                                        type="text"
                                        value={tipodeidentidad}
                                        onChange={(e) => setTipodeIdentidad(e.target.value)}
                                        required
                                        className="w-full rounded-full text-sm  border-1 border-gray-300"
                                    >
                                        
                                        <option value="">Seleccione</option>
                                        {
                                            (typeOfIdentitys?.length > 0) ? (
                                                typeOfIdentitys.map((identity) => (
                                                    <option key={identity.id} value={identity.id}>
                                                        {`${identity.name}`}
                                                    </option>
                                                ))
                                            ): null
                                        }
                                    </select> 
                                </div>
                                <div className="mb-4 w-1/2">
                                    <Label htmlFor="nombreMaquina">Numero de identidad</Label>
                                    <Input
                                        id="numerodeidentidad"
                                        type="number"
                                        value={numeroidentidad}
                                        onChange={(e) => setNumeroidentidad(e.target.value)}
                                        required
                                        placeholder="No 13531816"
                                        className="w-full text-sm rounded-full"
                                    />
                                </div>
                            </div>
                            
                            <div className='flex space-x-4 w-full'>
                            {(tipodecliente === 2)?(
                                <div className="mb-4 w-1/2">
                                    <Label htmlFor="nombreMaquina">Primer Apellido</Label>
                                    <Input
                                        id="nombreMaquina"
                                        type="text"
                                        value={apellidoClients}
                                        onChange={(e) => setApellidoClients(e.target.value)}
                                        required
                                        placeholder="Escribe el primer apellido"
                                        className="w-full text-sm rounded-full"
                                    />
                                </div>
                            ):null}
                            
                                <div className={(tipodecliente === 2)?"mb-4 w-1/2":"mb-4 w-full"}>
                                    <Label htmlFor="nombreMaquina">Primer Nombre</Label>
                                    <Input
                                        id="nombreMaquina"
                                        type="text"
                                        value={nombreClients}
                                        onChange={(e) => setNombreClients(e.target.value)}
                                        required
                                         placeholder={(tipodecliente === 'natural')?"Escribe el primer nombre":"Escribe el nombre de la comprañia"}
                                        className="w-full text-sm rounded-full"
                                    />
                                </div>
                            </div>
                            <div className='flex space-x-4 w-full'>
                            {(tipodecliente === 2) ? (
                                <div className="mb-4 w-1/3">
                                        <Label htmlFor="nombreMaquina">Sexo</Label>
                                        <select
                                            id="tipodeidentidad"
                                            type="text"
                                            value={sexoClients}
                                            onChange={(e) => setSexoClients(e.target.value)}
                                            required
                                            className="w-full rounded-full text-sm  border-1 border-gray-300"
                                        >
                                            
                                            <option value="">Seleccione</option>
                                            {
                                                (sex?.length > 0) ? (
                                                    sex.map((identity) => (
                                                        <option key={identity.id} value={identity.id}>
                                                            {`${identity.name}`}
                                                        </option>
                                                    ))
                                                ): null
                                            }
                                        </select> 
                                </div>
                            ) : null}
                            
                            <div className={(tipodecliente === 2)?"mb-4 w-1/3":"mb-4 w-1/2"}>
                                    <Label htmlFor="nombreMaquina">Telefono <span className='text-xs'>(contacto)</span></Label>
                                    <Input
                                        id="nombreMaquina"
                                        type="text"
                                        value={telefonoClients}
                                        onChange={(e) => setTelefonoClients(e.target.value)}
                                        required
                                        placeholder={(tipodecliente === 2)?"Escribe telefono ":"Escribe tel. de oficina"}
                                        className="w-full text-sm rounded-full"
                                    />
                                </div>
                                <div className={(tipodecliente === 2)?"mb-4 w-1/3":"mb-4 w-1/2"}>
                                    <Label htmlFor="nombreMaquina">Dirección</Label>
                                    <Input
                                        id="nombreMaquina"
                                        type="text"
                                        value={direccionClients}
                                        onChange={(e) => setDireccionClients(e.target.value)}
                                        required
                                        placeholder={(tipodecliente === 2)?"Escribe dirección residencial":"Escribe dirección de ofi."}
                                        className="w-full text-sm rounded-full"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <Label htmlFor="tipoMaquina">Correo Electrónico</Label>
                                <Input
                                    id="tipoMaquina"
                                    type="text"
                                    value={correoClients}
                                    onChange={(e) => {setCorreoClients(e.target.value), setUsuario(e.target.value)}}
                                    required
                                    placeholder={(tipodecliente === 2)?"Escribe correo personal":"Escribe correo empresarial."}
                                    className="w-full text-sm rounded-full"
                                />
                            </div>

                            {(tipodecliente === 1)?(
                                <>
                                <div className='flex border-b-1 border-gray-400 place-content-between mb-1'>
                                    <h3 className='mt-2'>Información del Representante legal <span className='text-xs'>(opcional)</span></h3>
                                    <button type='button' onClick={()=>{(isOpenTablegal)?setisOpenTablegal(false):setisOpenTablegal(true)}} className='mt-2'><FontAwesomeIcon icon={(isOpenTablegal)?faChevronUp:faChevronDown}></FontAwesomeIcon></button>
                                </div>
                                    
                                    
                                    {isOpenTablegal && (
                                        <>
                                        <div className='flex space-x-4'>
                                            <div className="mb-4 w-1/2">
                                                <Label htmlFor="nombreMaquina">Primer Apellido</Label>
                                                <Input
                                                    id="nombreMaquina"
                                                    type="text"
                                                    value={apellidolegal}
                                                    onChange={(e) => setApellidolegal(e.target.value)}
                                                    
                                                    placeholder="Escribe apellido"
                                                    className="w-full text-sm rounded-full"
                                                />
                                            </div>
                                            <div className="mb-4 w-1/2">
                                                <Label htmlFor="nombreMaquina">Primer Nombre</Label>
                                                <Input
                                                    id="nombreMaquina"
                                                    type="text"
                                                    value={nombrelegal}
                                                    onChange={(e) => setNombrelegal(e.target.value)}
                                                    
                                                    placeholder="Escribe nombre"
                                                    className="w-full text-sm rounded-full"
                                                />
                                            </div>
                                            </div>
                                            <div className='flex space-x-4'>
                                            <div className={"mb-4 w-1/2"}>
                                                <Label htmlFor="nombreMaquina">Telefono <span className='text-xs'>(contacto)</span></Label>
                                                <Input
                                                    id="nombreMaquina"
                                                    type="text"
                                                    value={telefonoLegal}
                                                    onChange={(e) => setTelefonoLegal(e.target.value)}
                                                    
                                                    placeholder={"Escribe tel. de contacto"}
                                                    className="w-full text-sm rounded-full"
                                                />
                                            </div>
                                            <div className={"mb-4 w-1/2"}>
                                                <Label htmlFor="nombreMaquina">Dirección</Label>
                                                <Input
                                                    id="nombreMaquina"
                                                    type="text"
                                                    value={direccionLegal}
                                                    onChange={(e) => setDireccionLegal(e.target.value)}
                                                    
                                                    placeholder={"Escribe dirección."}
                                                    className="w-full text-sm rounded-full"
                                                />
                                            </div>
                                            <div className="mb-4 w-1/3">
                                                    <Label htmlFor="nombreMaquina">Sexo</Label>
                                                    <select
                                                        id="tipodeidentidad"
                                                        type="text"
                                                        value={sexoLegal}
                                                        onChange={(e) => setSexoLegal(e.target.value)}
                                                        required
                                                        className="w-full rounded-full text-sm  border-1 border-gray-300"
                                                    >
                                                        
                                                        <option value="">Seleccione</option>
                                                        {
                                                            (sex?.length > 0) ? (
                                                                sex.map((identity) => (
                                                                    <option key={identity.id} value={identity.id}>
                                                                        {`${identity.name}`}
                                                                    </option>
                                                                ))
                                                            ): null
                                                        }
                                                    </select> 
                                            </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <Label htmlFor="email">Correo Electrónico</Label>
                                        <Input
                                            id="email"
                                            type="text"
                                            value={correoLegal}
                                            onChange={(e) => setCorreoLegal(e.target.value)}
                                            required
                                            placeholder={"Escribe correo personal o corporativo"}
                                            className="w-full text-sm rounded-full"
                                        />
                                    </div>
                                        </>
                                    )}
                                    
                                    
                                </>
                            ):null}

                          
                                <div className='flex border-b-1 border-gray-400 place-content-between mb-8'>
                                    <h3 className='mt-2'>Credenciales Inicio de sesión <span className='text-xs'>(opcional)</span></h3>
                                    <button type='button' onClick={()=>{(isOpenTabCredentials)?setIsOpenTabCredentials(false):setIsOpenTabCredentials(true)}} className='mt-2'><FontAwesomeIcon icon={(isOpenTabCredentials)?faChevronUp:faChevronDown}></FontAwesomeIcon></button>
                                </div>
                                    
                                    
                                    {isOpenTabCredentials && (
                                        <>
                                        <div className='flex space-x-4'>
                                            <div className="mb-4 w-1/2">
                                                <Label htmlFor="user">Usuario</Label>
                                                <Input
                                                    id="user"
                                                    type="text"
                                                    value={usuario}
                                                    onChange={(e) => setUsuario(e.target.value)}
                                                    
                                                    placeholder="Escribe usuario"
                                                    className="w-full text-sm rounded-full"
                                                />
                                            </div>
                                            <div className="mb-4 w-1/2 relative">
                                                <Label htmlFor="password">Contraseña</Label>
                                                <Input
                                                    id="password"
                                                    type="text"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    
                                                    placeholder="Escribe la contraseña"
                                                    className="w-full text-sm rounded-full"
                                                />
                                                <button type='button' onClick={()=>randomNumber()} className='absolute right-4 top-7'><FontAwesomeIcon icon={faRandom} /></button>
                                            </div>
                                            </div>
                                      
                                        </>
                                    )}
                                    
                             
                           
                            <div className="flex justify-end">
                            <Button className='bg-gray-500 text-blue-800 text-xs mr-2' type="button" onClick={handleCloseModalClients}>Cancelar</Button>
                                <Button className='text-xs' type="submit">Guardar</Button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            )}

             {/* ventana modal */}
             {isModalOpenMachine && (
                <div className="fixed inset-0 backdrop-opacity-50 bg-gray-800/50 flex items-start justify-center z-50 overflow-auto">
                    <div className="bg-white p-6 rounded shadow-lg w-[500px] mt-10">
                        <h2 className="font-bold mb-4">Nueva Máquina</h2>
                        <form onSubmit={handleSubmitModalMachine}>
                        
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
                                <Label htmlFor="descripcion">Descripción</Label>
                                <textarea
                                    id="descripcion"
                                    rows={3}
                                    cols={1}
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    required
                                    className="w-full text-sm rounded-[15px] border-gray-300"
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
                                <Label htmlFor="observacion">Observación</Label>
                                <textarea
                                    id="observacion"
                                    rows={7}
                                    cols={1}
                                    value={observacion}
                                    onChange={(e) => setObservacion(e.target.value)}
                                    required
                                    className="w-full text-sm rounded-[15px] border-gray-300"
                                />
                            </div>
                            
                            <div className="flex justify-end">
                            <Button className='bg-gray-500 text-blue-800 text-xs mr-2' type="button" onClick={handleCloseModalMachine}>Cancelar</Button>
                                <Button className='text-xs' type="submit">Guardar</Button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        
    )
}


export default NewServicePage
