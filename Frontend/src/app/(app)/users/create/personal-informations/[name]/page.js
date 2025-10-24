'use client'
import React, { useEffect, useState } from "react"
import Input from "@/components/Input"
import {useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/auth"


const page = () =>{
    // declaración de variables
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const params = useParams()
    const name = params.name
    const [data, setData] = useState({id: user[0].id, name: '', lastName: '', email: '', cellphone: '', address: '' })
    // obtener los datos en memoria local
    const localStorageData = () => {
        if(localStorage.getItem(`@create_user_app/#${user[0].id}/code/data`)) {
            setData(JSON.parse(atob(localStorage.getItem(`@create_user_app/#${user[0].id}/code/data`))))
        }
    }
    // envio de datos localmente => LOCALSTORAGE
    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem(`@create_user_app/#${user[0].id}/code/data`, btoa(JSON.stringify(data)))
        router.push(`/users/create/credentials/${name}`)
    }

    useEffect(()=>{
        localStorageData()
    },[])

    return(
        <>
        <div className="py-0">
        <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
        <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <div className="px-8 py-8 pb-8 bg-white h-screen min-h-[500px]">
                <h3 className="font-bold mb-12">Datos Personales del: <span className="uppercase">{name}</span> </h3>
                    <div className="px-5">
                        <form onSubmit={handleSubmit} className="flex flex-wrap justify-center items-center gap-2 space-y-3">
                            <div className="flex w-full gap-3 ">
                                <div className="w-1/2">
                                    <h4>Nombres (*)</h4>
                                    <Input type="text" className='block mt-1 w-full rounded-full text-sm' value={data.name} placeholder="Ingresar nombre" onChange={(e)=>setData(prev=>({...prev, name: e.target.value}))} required/>
                                </div>
                                <div className="w-1/2">
                                    <h4>Apellidos (*)</h4>
                                    <Input type="text" className='block mt-1 w-full rounded-full text-sm' value={data.lastName} placeholder="Apellidos" onChange={(e)=>setData(prev=>({...prev, lastName: e.target.value}))} required/>
                                </div>
                            </div>
                            <div className="w-full">
                                <h4>Correo Electrónico (Email) (*)</h4>
                                <Input type="email" className='block mt-1 w-full rounded-full text-sm' value={data.email} placeholder="Correo Electrónico" onChange={(e)=>setData(prev=>({...prev, email: e.target.value}))} required/>
                            </div>
                            <div className="flex w-full gap-3">
                                <div className="w-1/2">
                                    <h4>Telefono de Contacto </h4>
                                    <Input type="tel" className='block mt-1 w-full rounded-full text-sm' value={data.cellphone} placeholder="Telefono" onChange={(e)=>setData(prev=>({...prev, cellphone: e.target.value}))}/>
                                </div>
                                <div className="w-1/2">
                                    <h4>Dirección Residencial</h4>
                                    <Input type="text" className='block mt-1 w-full rounded-full text-sm' value={data.address} placeholder="Dirección" onChange={(e)=>setData(prev=>({...prev, address: e.target.value}))}/>
                                </div>
                            </div>
                        <div className="flex justify-between w-full mt-12">
                            <Link href={'/users/create/'} className="px-5 py-3 border border-1 border-gray-300 hover:border-blue-300 hover:bg-blue-800 hover:text-white  rounded-full font-bold">Anterior</Link>
                            <button type="submit"  className="px-5 py-3 bg-blue-800 text-white  rounded-full font-bold">Siguiente</button>
                        </div>
                        
                        {/* <Link href={'/users/create/credentials/'+name}  className="px-5 py-3 bg-blue-800 text-white absolute float-right right-[5%] bottom-[150px] rounded-full font-bold">Siguiente</Link> */}
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
       
        </>
    )
}

export default page