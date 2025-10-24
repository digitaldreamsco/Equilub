'use client'
import { useState, useRef, useCallback } from 'react'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Image from 'next/image'
import { redirect, useParams } from 'next/navigation'
import Link from 'next/link';

const NewstudyPage = () => {
    const [titulo, setTitulo] = useState('')
    const [maquina, setMaquina] = useState('')
    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')
    const [encargado, setEncargado] = useState('')
    const [imagen, setImagen] = useState(null)
    const imagenInputRef = useRef(null)
    

    return (
        <div className="px-5 bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-8 bg-white">
                        <h3 className='font-bold mb-6'>Home / Servicios / <span className='font-normal'>Estudio de lubricación</span></h3>
                        <h3 className='font-bold text-xl mb-6'>¿Que vas a hacer?</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4">
                                <Image src="/imagen/imagen-estudio.png" alt="Crear Nuevo Estudio" width={150} height={150} className="mb-4" />
                                <h4 className='font-bold mb-4'>Crear Nuevo Estudio</h4>
                                <Button className='text-xs' onClick={() => {/* lógica para crear nuevo estudio */}}>Crear Estudio</Button>
                            </div>
                            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4">
                                <Image src="/imagen/imagen-formato.png" alt="Formato de Estudio" width={150} height={150} className="mb-4" />
                                <h4 className='font-bold mb-4'>Formato de Estudio</h4>
                                <Link href="/study-lubrications/format/new">
                                    <Button className='text-xs'>Crear Formato</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewstudyPage
