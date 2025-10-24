
'use client'
import { useAuth } from '@/hooks/auth'
import ApexCharts from 'react-apexcharts'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useServices } from '@/hooks/services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

const details = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const params = useParams()
    const name = params.name
    const id = params.id
    const [services, setSevices] = useState({
    })
    
     // Simular una llamada a la API para obtener los servicios
     const obtenerServicios = async () => {
        // Reemplazar esto con una llamada real a tu API
        const {getServicesId} = useServices()
        getServicesId({
            setSevices,
            id:id,
        })
    }

    useEffect(() => {
        obtenerServicios()
    }, [])

    return (
        <>
        {/* header */}
            
            {/* div container */}
            <div className="p-5">
                <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <h3 className='text-xl mt-2 font-bold'>Detalle de Servicio</h3>
                        {/* detalle para admin y super admin */}
                        {user[0].roles['name'] === 'admin' || user[0].roles['name'] === 'super-admin' ? (
                        <>
                            <div className='grid gap-4 grid-cols-2 flex mt-1'>
                            <div className='py-4'>
                            <div className="p-8 relative bg-white border-t-4 border-blue-900 rounded-lg">
                                    <h3 className='flex items-center space-x-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} className='fill-gray-300 mr-3' viewBox="0 0 512 512">
                                            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                                        </svg>
                                        Servicio   
                                    </h3>
                                    <Link  href={`/service/edit/${services.id}/${services.name}`} className='absolute top-4 end-10 text-sm bg-blue-800 text-white hover:bg-blue-500 px-4 py-2 rounded-full space-x-3'><FontAwesomeIcon icon={faPencilAlt} />  <span>Editar</span></Link>
                                    <hr className='mt-3 mb-4'></hr>
                                    <ul className="space-y-4">
                                        {
                                            (services) ? (
                                                
                                                    <div key={services.id} className="bg-gray-100 p-4 rounded-lg">
                                                        <div className="font-bold mb-5">{decodeURIComponent(services.name)}</div>
                                                        <div className="text-sm text-gray-600">
                                                            <span >Ref: {(services?.ref)?(
                                                                <input type="text" className="w-full h-auto  rounded-full text-sm" value={services.ref} desabled/>
                                                            ):(<input type="text" className="w-full h-auto  rounded-full text-sm" value={'Ninguno'} desabled/>) }</span>
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            <span >Descripción: {(services?.description)?(
                                                                <input type="text" className="w-full h-auto  rounded-full text-sm" value={services.description} desabled/>
                                                            ):(<input type="text" className="w-full h-auto  rounded-full text-sm" value={'Ninguno'} desabled/>) }</span>
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            <span >Maquina: <strong>{(services?.machine?.name)?(
                                                                <input type="text" className="w-full h-auto  rounded-full text-sm" value={services.machine.name} desabled/>
                                                            ):(<input type="text" className="w-full h-auto  rounded-full text-sm" value={'Ninguno'} desabled/>)}</strong> </span>
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                        <span >Hora: {(services?.hora) ? (
                                                            <input type="time" className="w-full h-auto  rounded-full text-sm" value={services.hora} desabled/>
                                                        ): (<input type="text" className="w-full h-auto  rounded-full text-sm" value={'Ninguno'} desabled/>)}</span>
                                                        </div>
                                                        <div className="text-sm text-gray-600 mt-1">
                                                        <span >Dirección: {(services?.direccion)?(
                                                            <input type="text" className="w-full h-auto  rounded-full text-sm" value={services.direccion} desabled/>
                                                        ):(<input type="text" className="w-full h-auto  rounded-full text-sm" value={'Ninguno'} desabled/>)}</span>
                                                        </div>
                                                        <div className="text-sm text-gray-600 mt-1">
                                                            <span>Encargado: {(services?.user?.name)?(
                                                                <input type="text" className="w-full h-auto  rounded-full text-sm" value={services.user.name} desabled/>
                                                            ):(<input type="text" className="w-full h-auto  rounded-full text-sm" value={'Ninguno'} desabled/>)}</span>
                                                        </div>
                                                        
                                                    </div>
                                                
                                        ) : null
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
                                                Estado de Estudio de lubricación
                                            </h3>
                                            <hr className='mt-3 mb-5'></hr>
                                            <div className={`p-4 mb-5 text-sm bg-${(new Date(services.date) < new Date() && services.state === 2) ? 'red-200' :(new Date(services.date) < new Date() && services.state === 1) ? 'red-200' :(services.state === 3) ? 'gray-100' : (services.state === 1) ? 'green-100' : 'yellow-100'} border-l-4 border-${(new Date(services.date) < new Date() && services.state === 2) ? 'red-500' :(new Date(services.date) < new Date() && services.state === 1) ? 'red-500' :(services.state === 3) ? 'gray-500' : (services.state === 1) ? 'green-500' : 'yellow-500'} text-${(new Date(services.date) < new Date() && services.state === 2) ? 'red-700' :(new Date(services.date) < new Date() && services.state === 1) ? 'red-700' :(services.state === 3) ? 'gray-700' : (services.state === 1) ? 'green-700' : 'yellow-700'}`}>
                                               
                                                <p><strong>Servicio:</strong> Este servicio se encuentra {(new Date(services.date) < new Date() && services.state === 2) ? (`retrazado por ${(Math.floor((new Date() - new Date(services.date))/(1000 * 60 * 60 * 24)) > 1 )?(`${Math.floor((new Date() - new Date(services.date))/(1000 * 60 * 60 * 24))} dias`):(`${Math.floor((new Date() - new Date(services.date))/(1000 * 60 * 60 * 24))} dia`)}`) :(new Date(services.date) < new Date() && services.state === 1) ? `en proceso y retrazada por${(Math.floor((new Date() - new Date(services.date))/(1000 * 60 * 60 * 24)) > 1 )?(`${Math.floor((new Date() - new Date(services.date))/(1000 * 60 * 60 * 24))} dias`):(`${Math.floor((new Date() - new Date(services.date))/(1000 * 60 * 60 * 24))} dia`)}` :(services.state === 3) ? 'Finalizada' : (services.state === 1) ? 'en PROCESO' : 'PENDIENTE POR REALIZAR '} por parte de el empleado.</p>
                                            </div>
                                            <div className='flex justify-center items-center'>
                                                {
                                                    (services?.state !== 3) ? (
                                              
                                                <Link href={`/message`} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded-full text-sm">
                                                        enviar mensaje
                                                </Link>
                                                ):null}
                                            </div>
                                           
                                
                                    </div>
                                    <div className="p-8 bg-white border-t-4 border-blue-900 rounded-lg mt-5">
                                            <h3 className='flex items-center space-x-3'>
                                                Imagen de la maquina
                                            </h3>
                                            <hr className='mt-3 mb-5'></hr>
                                            {(services?.image)?(
                                                <img src={services?.image} width={200} height={200} />
                                            ):(
                                                <div className='w-full h-full flex justify-center items-center'>
                                                    <div className='text-center center'>
                                                        <div className='w-full flex justify-center'>
                                                            <Image src={'/imagen/reloj.png'} width={80} height={80} />
                                                        </div>
                                                            
                                                            <p className="text-sm text-gray-600 mb-4 mt-4">
                                                                Al agregar la imagen de la maquina, se reflejarán aquí <br></br> para que puedas ver que maquina es la que se va a realizar el servicio.
                                                            </p>
                                                    </div>
                                                        
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </>
                       ):null}


                        {/* detalle para operador */}
                       {user[0].roles['name'] === 'operate' ? (
                        <>
                            <div className='grid gap-4 grid-cols-2 flex mt-1'>
                            <div className='py-4'>
                            <div className="p-8 bg-white border-t-4 border-blue-900 rounded-lg">
                                    <h3 className='flex items-center space-x-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} className='fill-gray-300 mr-3' viewBox="0 0 512 512">
                                            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                                        </svg>
                                        Servicios    
                                    </h3>
                                    <hr className='mt-3 mb-4'></hr>
                                    <ul className="space-y-4">
                                        {services ? (
                                            <li key={services.id} className="bg-gray-100 p-4 rounded-lg">
                                                <div className="font-bold mb-5">{decodeURIComponent(services.name)}</div>
                                                <div className="text-sm text-gray-600">
                                                    <span >Ref:: {services.ref}</span>
                                                </div>
                                                <div className="text-sm text-gray-600 space-x-4">
                                                    <span >Maquina: <strong>{services.machine?.name}</strong> </span>
                                                    <span >Estado: <strong>{services.machine?.state}</strong> </span>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <span >Hora: {(services.hora) ? services.hora : '00:00'}</span>
                                                </div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                <span >Dirección: {services.direccion}</span>
                                                </div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    <span>Encargado: {services.user?.name}</span>
                                                </div>
                                                
                                            </li>
                                        ) : null}
                                    </ul>
                                </div>
                       
                            </div>
                            <div className='py-4'>
                                    <div className="p-8 bg-white border-t-4 border-blue-900 rounded-lg">
                                            <h3 className='flex items-center space-x-3'>
                                                <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} className='fill-gray-300 mr-3' viewBox="0 0 512 512">
                                                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                                                </svg>
                                                Realizar Estudio de lubricación
                                            </h3>
                                            <hr className='mt-3 mb-5'></hr>
                                            <div className="p-4 mb-5 text-sm bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                                                <p><strong>Advertencia:</strong> Una vez que inicie el servicio, no podrá cerrarlo hasta que termine. Asegúrese de estar listo antes de continuar.</p>
                                            </div>
                                            <div className='flex justify-center items-center'>
                                                {services && (
                                                <Link href={`/study-lubrications/new/${services.id}/${services.name}/?tb=0`} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded-full text-sm">
                                                        Realizar Estudio
                                                </Link>
                                                )}
                                            </div>
                                           
                                
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

export default details