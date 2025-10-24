'use client'
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faEdit, faTimesCircle, faGear, faUserShield, faTrashAlt, faUserAltSlash } from "@fortawesome/free-solid-svg-icons"
import Dropdown from "@/components/Dropdown"
import DropdownLink, { DropdownButton } from "@/components/DropdownLink"
import DialogDelete from '@/components/Dialog'
import DialogRolPermission from '@/components/Dialog'
import Input from "@/components/Input"
import Link from "next/link"
const page = () =>{
    
    return(
        <>
        <div className="py-0">
        <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
        <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <div className="px-8 py-8 pb-8 bg-white h-screen min-h-[500px]">
            <h3 className='font-bold mb-6'>Home / Usuarios / <span className='font-normal'>Nuevo usuario</span></h3>
                <h3 className="font-bold mb-12">Nuevo Usuario</h3>
                    <div className="grid grid-cols-4 gap-4">
                        <Link href={'create/personal-informations/super administrador'}>
                        <div className="px-4 py-4 shadow-md text-center rounded-lg hover:bg-gray-200 cursor-pointer">
                            <FontAwesomeIcon icon={faUserShield} className="text-2xl border border-1 border-gray-500 rounded-full px-5 py-5" />
                            <div className="text-center font-bold text-black mt-5">
                                <h3>Super Administrador</h3>
                            </div>
                        </div>
                        </Link>
                        <Link href={'create/personal-informations/operario'}>
                        <div className="px-4 py-4 shadow-md text-center rounded-lg hover:bg-gray-200 cursor-pointer">
                            <FontAwesomeIcon icon={faUserShield} className="text-2xl border border-1 border-gray-500 rounded-full px-5 py-5" />
                            <div className="text-center font-bold text-black mt-5">
                                <h3>Operario</h3>
                            </div>
                        </div>
                        </Link>
                        <Link href={'create/personal-informations/cliente'}>
                        <div className="px-4 py-4 shadow-md text-center rounded-lg hover:bg-gray-200 cursor-pointer">
                            <FontAwesomeIcon icon={faUserShield} className="text-2xl border border-1 border-gray-500 rounded-full px-5 py-5" />
                            <div className="text-center font-bold text-black mt-5">
                                <h3>Cliente</h3>
                            </div>
                        </div>
                        </Link>
                       
                    </div>
                </div>
                </div>
            </div>
        </div>
       
        </>
    )
}

export default page