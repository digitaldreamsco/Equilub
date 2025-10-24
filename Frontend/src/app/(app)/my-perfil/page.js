'use client'


import Input from "@/components/Input";
import { useState } from "react";


const page = () => {
    const [name, setName] = useState('')
    return (
        <>
        {/* panel información */}
        <div className="flex">
            <div className="w-[40%] fixed">
                {/* div información general */}
                <div className="flex flex-1 items-center space-x-8 px-8 py-8 justify-center bg-white mx-10 my-5">
                            <div className=" flex-1 items-center  w-1/2">
                                <div className="p-8  border border-1 rounded-sm">
                                    <img width={90}  src="../../imagen/default-user.png" />
                                </div>
                                <div className="space-y-1 p-0 w-full">
                                <h2 className="font-bold mb-4 text-md">Información Personal</h2> 
                                <p className="text-sm"><strong>Nombre:</strong> Andres Gutierrez</p> 
                                <p className="text-sm"><strong>Telefono:</strong> (304) 247 82-83</p> 
                                <p className="text-sm"><strong>Correo:</strong> andresg9602@hotmail.com</p> 
                                <p className="text-sm"><strong>Dirección:</strong> Calle 41B # 7F-153</p> 
                                
                                    
                                </div>
                                <div className="bg-green-100 p-8 rounded-md mt-8">
                                        <h2 className="font-bold">Nota*</h2>
                                        <p>Este usuario se encuentra activo en la aplicación si tiene un inconveniente con al app porfavor comuniquese con el administrador del sitio para solucionar sus PQRS</p>
                                </div>
                            </div>
                        </div>
                    <div>
                </div>
            </div>
            <div className="w-[60%] ml-[42%]">
                {/* div contenedor  */}
                {/* panel 2 */}
            <div className="flex flex-1 items-center  px-8 py-8 justify-center bg-white mx-10 my-5">
                <div className="flex flex-1 items-center space-x-8 w-full">
                    <div className="space-y-1 w-full">
                    <h2 className="font-bold text-md">Datos Personales</h2> 
                    <hr className="mb-5" />
                    <div className="space-y-4 pt-4">
                        <div className="flex flex-1 w-full space-x-4">
                            <div className="w-1/2">
                                <label for="name">Nombres:</label>
                                <Input type="text" id="name" className={'text-sm w-full'} placeholder="Nombre" value={name} onChange={event => setName(event.target.value)} />
                            </div>
                            <div className="w-1/2">
                                <label for="name">Apellidos:</label>
                                <Input type="text" id="name" className={'text-sm w-full'} placeholder="Nombre" value={name} onChange={event => setName(event.target.value)} />
                            </div>
                        </div>
                        
                        <div>
                            <label for="name">Correo:</label>
                            <Input type="email" id="name" className={'text-sm w-full'} placeholder="Nombre" value={name} onChange={event => setName(event.target.value)} />
                        </div>
                        
                        <div className="flex flex-1 w-full space-x-4">
                            <div className="w-1/2">
                                <label for="name">Telefono:</label>
                                <Input type="tel" id="name" className={'text-sm w-full'} placeholder="Nombre" value={name} onChange={event => setName(event.target.value)} />
                            </div>
                            <div className="w-1/2">
                                <label for="name">Dirección:</label>
                                <Input type="text" id="name" className={'text-sm w-full'} placeholder="Nombre" value={name} onChange={event => setName(event.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-1 justify-end ">
                            <button className="px-8 py-2 bg-yellow-400 text-white rounded-md">Actualizar</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            {/* panel 3 */}
            <div className="flex flex-1 items-center  px-8 py-8 justify-center bg-white mx-10 my-5">
                <div className="flex flex-1 items-center space-x-8 w-full">
                    <div className="space-y-1 w-full">
                    <h2 className="font-bold mb-4 text-md">Dispositivos activo</h2> 
                    <div className="space-y-4">
                    <div className="flex-1 w-full space-x-4">
                            <p>Actualmente, tienes una sesión activa en los siguientes dispositivos:</p>                        
                        </div>
                        <div className="flex flex-1 w-full space-x-4">
                                <div className='rounded-lg cursor-pointer border border-2 px-3 py-3 flex border-green-400 justify-center items-center space-x-2'>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height={40} width={40} className='px-0 py-2  fill-green-400 '  viewBox="0 0 512 512">
                                                    <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className='font-bold'>Windows 10 - Google Chrome</h3>
                                                    <div className='flex space-x-1 items-center'>
                                                        <p className='text-xs'>Estado: Activo</p>
                                                        <span>-</span>
                                                        <p className='text-xs'>22/02/2024</p>
                                                    </div>
                                                    
                                                </div>
                                </div>
                        </div>
                        <div className="flex-1 w-full space-x-4 bg-yellow-100 text-yellow-500 p-4 rounded-lg">
                            <p>Si no reconoces alguno de estos dispositivos, 
                                te recomendamos cerrar la sesión inmediatamente y 
                                cambiar tu contraseña por seguridad.</p>                        
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 items-center bg-white justify-center px-8 py-8  mx-10 my-5">
                <div className="flex flex-1 justify-center items-center space-x-8">
                    <div className="space-y-1 w-full  ">
                    <h2 className="font-bold mb-4 text-md">Eliminar Cuenta</h2> 
                    <div className="space-y-4">
                        <div className="flex-1 w-full space-x-4">
                            <p>la eliminación de su cuenta es un proceso irreversible. Una vez eliminada, todos sus datos, 
                                historial y preferencias serán permanentemente borrados, y no será posible recuperar su 
                                cuenta ni la información asociada. Si está seguro de que desea continuar con la eliminación 
                                de su cuenta, por favor confirme su decisión a continuación:</p>                        
                        </div>
                        <div className="flex-1 w-full flex justify-end  space-x-4 ">
                            <div className="space-y-2 text-center">
                                <button className="px-8 py-2 bg-red-600 rounded-md text-white hover:bg-red-800">Borrar Cuenta</button>
                            </div>
                          </div>
                    </div>
                    </div>
                </div>
            </div>


            <div>

            </div>
            </div>
        </div>
        </>
    )
}
export default page ;