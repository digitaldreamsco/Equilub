'use client'
import React, { useEffect, useState } from "react"

import Input from "@/components/Input"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"

const page = () =>{
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const params = useParams()
    const name = params.name
    const [data, setData] = useState({id: user[0].id, email: '', tmppassword: '' })
    const [confirmPassword, setConfirmPassword] = useState('') // Estado para la confirmación de contraseña
    const [viewPassword, setViewPassword] = useState('password') // Estado para la confirmación de contraseña
    const [viewConfirmPassword, setViewConfirmPassword] = useState('password') // Estado para la confirmación de contraseña
    const [error, setError] = useState('') // Estado para el mensaje de error

    // obtener los datos en memoria local
    const localStorageData = () => {
        
        if(localStorage.getItem(`@credentials_user_app/#${user[0].id}/code/data`)) {
            let query = JSON.parse(atob(localStorage.getItem(`@credentials_user_app/#${user[0].id}/code/data`)))
            setData(query)
            setConfirmPassword(query.tmppassword)
        }else{
            if(localStorage.getItem(`@create_user_app/#${user[0].id}/code/data`)) {
                let query = JSON.parse(atob(localStorage.getItem(`@create_user_app/#${user[0].id}/code/data`)))
                setData(prev => ({...prev,email: query.email}))
            }
        }
    }
    // envio de datos localmente => LOCALSTORAGE
    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.tmppassword !== confirmPassword) {
            setError('Las contraseñas no coinciden') // Establece el mensaje de error
            return
        }
        localStorage.setItem(`@credentials_user_app/#${user[0].id}/code/data`, btoa(JSON.stringify(data)))
        router.push(`/users/create/permissions/${name}`)
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
                <h3 className="font-bold mb-12">Credenciales del: <span className="uppercase">{name}</span> </h3>
                    <div className="px-5">
                        <form onSubmit={handleSubmit} className="flex flex-wrap justify-center items-center gap-2 space-y-3">
                        <div className="w-full">
                                <h4>Correo Electrónico (Email) (*) <span className="text-xs">Puedes cambiar el correo de inicio de sesión</span></h4>
                                <Input type="email" className='block mt-1 w-full rounded-full text-sm' placeholder="Correo Electrónico" value={data.email} onChange={(e)=>setData(prev => ({...prev, email: e.target.value}))} required/>
                            </div>
                            <div className="flex w-full gap-3 ">

                                <div className="w-1/2 relative">
                                    <h4>Contraseña (*)</h4>
                                    <Input type={viewPassword} className='block mt-1 w-full rounded-full text-sm' placeholder="123456" value={data.tmppassword} onChange={(e)=>{setData(prev => ({...prev, tmppassword: e.target.value})), setError('') }}  required/>
                                    <FontAwesomeIcon icon={faEye} className="absolute top-10 end-5 cursor-pointer" onClick={() => {(viewPassword==='password')?setViewPassword('text'):setViewPassword('password')}} />
                                </div>
                                <div className="w-1/2 relative">
                                    <h4>Confirmar Contraseña (*)</h4>
                                    <Input type={viewConfirmPassword} className='block mt-1 w-full rounded-full text-sm' placeholder="123456" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value), setError('')}}  required/>
                                    <FontAwesomeIcon icon={faEye} className="absolute top-10 end-5 cursor-pointer" onClick={() => {(viewConfirmPassword==='password')?setViewConfirmPassword('text'):setViewConfirmPassword('password')}} />
                                </div>
                            </div>
                            {error && <p className="text-red-500">{error}</p>} 
                        
                            <div className="flex justify-between w-full mt-12">
                            <Link href={`/users/create/personal-informations/${name}`} className="px-5 py-3 border border-1 border-gray-300 hover:border-blue-300 hover:bg-blue-800 hover:text-white  rounded-full font-bold">Anterior</Link>
                            <button type="submit"  className="px-5 py-3 bg-blue-800 text-white  rounded-full font-bold">Siguiente</button>
                        </div>
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