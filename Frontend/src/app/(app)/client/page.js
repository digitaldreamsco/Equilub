'use client';

import React, { useState, useEffect } from 'react'

import { useMachine } from '@/hooks/machine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faGear, faEdit, faTrashAlt, faTractor } from '@fortawesome/free-solid-svg-icons'
import Dropdown from '@/components/Dropdown'
import DropdownLink, { DropdownButton } from "@/components/DropdownLink"
import DialogDelete from '@/components/Dialog'
import DialogDetails from '@/components/Dialog'
import Link from 'next/link'
import Label from '@/components/Label'
import { useClient } from '@/hooks/clients';


function FormularioDinamico() {
    // declaración de variables
    const [modalDelete, setModalDelete] = useState(false)
    const [modalDetail, setModalDetail] = useState(false)

    const [client, setClient] = useState([])
    const [maquina_id, setMaquina_id] = useState('')
    const [maquina_name, setMaquina_name] = useState('')
    const [maquina_description, setMaquina_description] = useState('')
    const [maquina_state, setMaquina_state] = useState('')
    const [maquina_type, setMaquina_type] = useState('')
    const [maquina_observation, setMaquina_observation] = useState('')
    // obtener el listado de maquinas 
    const getClients = () =>{
        // consultando todas las maquinas creadas
            const { getClient } = useClient()
            getClient({
                setClient
            })
    }
    // pasando los datos de la maquina a el modal
    const requestModal = (data) => {
        setModalDetail(true)
        setMaquina_id(data.id)
        setMaquina_name(data.name)
        setMaquina_description(data.description)
        setMaquina_type(data.type)
        setMaquina_state(data.state)
        setMaquina_observation(data.observation)
    }

    // cargar maquinas
useEffect(() => {
    getClients();
  }, []);
    return (
        <div className="py-5 px-5 bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-8 bg-white">
                    <h3 className='font-bold mb-6'>Home / Usuarios / <span className='font-normal'>Lista de clientes</span></h3>
                        <h3 className="font-bold mb-4">Listado de Clientes</h3>
                        <table className="table-fixed w-full border-separate text-left border-collapse">
                            <thead className="border-b-2 border-gray-200">
                                <tr>
                                    <th>Tipo Identidad</th>
                                    <th>Numero Identidad</th>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Dirección</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {client.map((clients) => (
                                        <tr key={client.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{clients.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{clients.service?.name || 'Sin servicio'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{clients.machine?.name || 'Sin máquina'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{clients.documents}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{clients.service?.date || 'Sin fecha'}</td>
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
                    <h3 className="text-xl font-bold mb-3">¿Deseas eliminar esta maquina?</h3>
                    <p>Si eliminas este maquina, no hay forma de recuperar sus datos. ¿Estás seguro?</p>
                    <div className="flex justify-center space-x-3 mt-4">
                        <button className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => deleteUser(selectedUser)}>Eliminar</button>
                        <button className="px-5 py-2 rounded-md border border-gray-500 hover:bg-gray-500" onClick={() => setModalDelete(false)}>Cancelar</button>
                    </div>
                </div>
            </DialogDelete>
            <DialogDetails showModal={modalDetail} hideModals={setModalDetail} widthModal={'auto'}>
                <div className="text-start w-[420px]">
                    <h3 className='text-xl font-bold mb-3'>Detalle de maquina:</h3>
                    <Label for="maquina_name">Nombre de Maquina </Label>
                    <input id='maquina_name' type='text' className='rounded-full text-sm w-full' value={maquina_name} readOnly/>
                    <Label for="maquina_description">Descripción </Label>
                    <textarea rows={5} cols={1} id='maquina_description' type='text' className='rounded-[12px] text-sm w-full' value={maquina_description} readOnly/>
                    <Label for="maquina_type">Tipo de Maquina </Label>
                    <input id='maquina_type' type='text' className='rounded-full text-sm w-full' value={maquina_type} readOnly/>
                    <Label for="maquina_state">Estado </Label>
                    <input id='maquina_state' type='text' className='rounded-full text-sm w-full' value={maquina_state} readOnly/>
                    <Label for="maquina_observation">Observación </Label>
                    <textarea rows={5} cols={1} id='maquina_observation' type='text' className='rounded-[12px] text-sm w-full' value={maquina_observation} readOnly/>
                    <div className="flex justify-center space-x-3 mt-12">
                        <Link href={`/machine/edit/${maquina_id}/${maquina_name}`} className="px-5 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-600" >Editar</Link>
                        <button className="px-5 py-2 rounded-md border border-gray-500 hover:bg-gray-500" onClick={() => setModalDetail(false)}>Cancelar</button>
                    </div>
                </div>
            </DialogDetails>
            
        </div>
    );
}

export default FormularioDinamico;
