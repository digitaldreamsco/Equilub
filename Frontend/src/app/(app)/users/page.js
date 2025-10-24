'use client';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEdit, faTrashAlt, faGear } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "@/components/Dropdown";
import DropdownLink, { DropdownButton } from "@/components/DropdownLink";
import DialogDelete from '@/components/Dialog';
import DialogRolPermission from '@/components/Dialog';
import axios from '@/lib/axios';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalRolPermission, setModalRolPermission] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // Para manejar acciones sobre usuarios específicos

    // Función para obtener los usuarios
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data.data); // Asumiendo que la API devuelve los usuarios bajo "data"
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    // Llama a fetchUsers cuando el componente se monte
    useEffect(() => {
        fetchUsers();
    }, []);

    // Funciones para manejar acciones (editar, eliminar, rol/permiso)
    const deleteUser = (userId) => {
        console.log(`Eliminar usuario con ID: ${userId}`);
        setModalDelete(false);
    };

    const handleEdit = (userId) => {
        console.log(`Editar usuario con ID: ${userId}`);
    };

    const RolPermissionUser = (userId) => {
        console.log(`Gestionar permisos de usuario con ID: ${userId}`);
        setModalRolPermission(false);
    };

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="px-8 py-8 pb-8 bg-white h-screen min-h-[500px]">
                        <h3 className='font-bold mb-6'>Home / Usuarios / <span className='font-normal'>Lista de usuarios</span></h3>
                        <h3 className="font-bold mb-12">Listado de Usuarios</h3>
                        <table className="table-fixed w-full border-separate text-left border-collapse">
                            <thead className="border-b-2 border-gray-200">
                                <tr>
                                    <th>Usuario</th>
                                    <th>Rol / Tipo de Usuario</th>
                                    <th>Fecha Ingreso / Fecha Actualización</th>
                                    <th>Configuración</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="flex items-center space-x-4">
                                            <img src="/imagen/default-user.png" width={30} alt="default-user" />
                                            <h2>{user.name} {user.lastname}</h2>
                                        </td>
                                        <td>
                                            {user.roles.name} - <span className="text-sm text-green-400">
                                                <FontAwesomeIcon icon={faCheckCircle} /> Activo
                                            </span>
                                        </td>
                                        <td>{new Date(user.created_at).toLocaleDateString()} / {new Date(user.updated_at).toLocaleDateString()}</td>
                                        <td className="flex justify-end space-x-4">
                                            <Dropdown
                                                align="right"
                                                width="38"
                                                trigger={
                                                    <button className="flex items-center border rounded-full p-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                                        <FontAwesomeIcon icon={faGear} />
                                                    </button>
                                                }>
                                                <div className="z-50 bg-white shadow-lg rounded-md border border-gray-300">
                                                    <DropdownButton onClick={() => setModalRolPermission(true)} className="flex px-4 w-full py-2 items-center justify-start text-sm space-x-4 hover:bg-gray-100">
                                                        <FontAwesomeIcon className="text-red-600" icon={faEdit} />
                                                        <p>Rol / Permiso</p>
                                                    </DropdownButton>
                                                    <DropdownLink
                                                        href="/my-perfil" // Navega a /my-perfil
                                                        className="flex px-4 w-full py-2 items-center justify-start text-sm space-x-4 hover:bg-gray-100">
                                                        <FontAwesomeIcon className="text-gray-600" icon={faEdit} />
                                                        <p>Editar</p>
                                                    </DropdownLink>
                                                    <DropdownButton onClick={() => setModalDelete(true)} className="flex px-4 w-full py-2 items-center justify-start text-sm space-x-4 hover:bg-gray-100">
                                                        <FontAwesomeIcon className="text-red-600" icon={faTrashAlt} />
                                                        <p>Eliminar</p>
                                                    </DropdownButton>
                                                </div>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <DialogDelete showModal={modalDelete} hideModals={setModalDelete} widthModal={'auto'}>
                <div className="text-center">
                    <FontAwesomeIcon icon={faTrashAlt} className="text-red-600 h-16 w-16" />
                    <h3 className="text-xl font-bold mb-3">¿Deseas eliminar este usuario?</h3>
                    <p>Si eliminas este usuario, no hay forma de recuperar sus datos. ¿Estás seguro?</p>
                    <div className="flex justify-center space-x-3 mt-4">
                        <button className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => deleteUser(selectedUser)}>Eliminar</button>
                        <button className="px-5 py-2 rounded-md border border-gray-500 hover:bg-gray-500" onClick={() => setModalDelete(false)}>Cancelar</button>
                    </div>
                </div>
            </DialogDelete>
        </div>
    );
};

export default UsersPage;