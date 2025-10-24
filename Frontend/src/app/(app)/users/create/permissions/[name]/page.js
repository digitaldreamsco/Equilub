'use client'
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useUsers } from "@/hooks/users"

const page = () =>{
    // declaracion de variables
    const params = useParams()
    const name = params.name
    const [permission, setPermission ] = useState([])
    const [permissionUser, setPermissionUser ] = useState([])
    const [userPermission, setUserPermission ] = useState('')
    const deleteUser = () => {
        setModalDelete(false)
    }
    // obteniendo permissos 
    const getPermissionUser  = async () => {
        (name === 'operario') ? (setUserPermission(4)) 
        : (name === 'super%20administrador') ? (setUserPermission(2)) 
        : (name === 'client') ? (setUserPermission(3))
        : (name === 'admin') ? (setUserPermission(1))
        : setUserPermission(0)
        const {getPermissionUser} = useUsers()
        await getPermissionUser({
            roles: name,
            setPermission
        })
        
    }

    // asignando los permisos
    const addPermissionsUser = () => {
        const permissionItem = permission.filter(permission =>(
            permission.default_roles === userPermission
        ))
        setPermissionUser(permissionItem)
    }

    const handleCheckboxChange = (permissionName) => {
        setPermissionUser((prevPermissions) => {
            if (prevPermissions.includes(permissionName)) {
                // Si el permiso ya está en el array, lo eliminamos
                return prevPermissions.filter((perm) => perm !== permissionName)
            } else {
                // Si el permiso no está en el array, lo agregamos
                return [...prevPermissions, permissionName]
            }
        })
    }
 // Ejecutar después de que los permisos se hayan cargado
 useEffect(() => {
    if (permission.length > 0) {
        addPermissionsUser()
        console.log(permissionUser)
    }
}, [permission])

useEffect(()=>{
        getPermissionUser()
    },[])
    return(
        <>
        <div className="py-0">
        <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
        <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <div className="px-8 py-8 pb-8 bg-white h-screen min-h-[500px] overflow-auto">
                <h3 className="font-bold mb-12">Configuración de Permisos para: <span className="uppercase">{name}</span> </h3>
                <div className="">
                    <p>Por defecto</p>
                    <div className="grid gap-x-2 gap-y-2 grid-flow-row-dense grid-cols-3 grid-rows-3 border border-1 border-gray-200 rounded-lg px-4 py-4 ">
                            {
                            (permission.length > 0) ? (
                                permission.map(permission => (
                                    (permission.default_roles === userPermission) ? (
                                        <div className="flex items-center">
                                            <input className="mr-3" type="checkbox" checked onChange={() => handleCheckboxChange(permission.name)} /> {permission.name}
                                        </div>
                                    ):null
                                ))
                            ) :null
                            }
                    </div>
                                      
                </div>
                <div className="">
                      <p className="mt-12">Permisos</p>
                       <div className="grid gap-x-2 gap-y-2 grid-flow-row-dense grid-cols-3 grid-rows-3 border border-1 border-gray-200 rounded-lg px-4 py-4 ">
                            {
                                (permission.length > 0) ? (
                                    permission.map(permission => (
                                        (permission.default_roles !== userPermission) ? (
                                            <div className="flex items-center">
                                                <input className="mr-3" type="checkbox" onChange={() => handleCheckboxChange(permission.name)} /> {permission.name}
                                            </div>
                                        ):null
                                    ))
                                ) :null
                            }
                        </div>
                                                
                </div>
                <div className="flex justify-between w-full mt-12">
                            <Link href={`/users/credentials/${name}`} className="px-5 py-3 border border-1 border-gray-300 hover:border-blue-300 hover:bg-blue-800 hover:text-white  rounded-full font-bold">Anterior</Link>
                            <button type="button"  className="px-5 py-3 bg-blue-800 text-white  rounded-full font-bold">Siguiente</button>
                </div>
                </div>
                </div>
            </div>
        </div>
       
        </>
    )
}

export default page