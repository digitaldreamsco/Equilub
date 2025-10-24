'use client'
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faEdit, faTimesCircle, faGear, faUserShield, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import Input from "@/components/Input"
import { useParams } from "next/navigation"
import Link from "next/link"

const page = () =>{
    const params = useParams()
    const name = params.name
    
    const [modalDelete, setModalDelete] = useState(false)
    const [modalRolPermission, setModalRolPermission] = useState(false)
    const deleteUser = () => {
        setModalDelete(false)
    }
    const RolPermissionUser = () => {
        setModalRolPermission(false)
    }
    return(
        <>
        <div className="py-0">
        <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
        <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <div className="px-8 py-8 pb-8 bg-white h-screen min-h-[500px]">
                <h3 className="font-bold mb-12">Configuración de Permisos para: <span className="uppercase">{name}</span> </h3>
                    <div className="text-center items-center space-y-5">
                        <FontAwesomeIcon icon={faUserShield} className="text-[45px] mb-5" />
                        <h3>¿Deseas guardar y activar?</h3>
                        <p className="bg-gray-200 p-3 text-gray-500"><strong>Nota: </strong> 
                        Este usuario actualmente se encuentra en estado de <strong>borrador</strong>, lo que significa que no tiene acceso a la aplicación. <br />
                        Para que el sistema lo reconozca y pueda ingresar, 
                        es necesario activar el usuario. Asegúrate de darle click en guardar y activar.</p>
                        <div className="flex flex-1 justify-center items-center gap-3">
                        <Link href={'#'} className="px-4 py-2 border boder-1 rounded-md border-gray-500 hover:border-yellow-400 hover:bg-yellow-400 hover:font-bold">Guadar Borrador</Link>
                        <Link href={'#'} className="px-4 py-2 border boder-1 rounded-md border-yellow-500 bg-yellow-400 hover:border-yellow-400 hover:bg-yellow-400 hover:font-bold">Guadar y Activar </Link>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>
        </div>
       
        </>
    )
}

export default page