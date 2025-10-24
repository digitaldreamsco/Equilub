'use client'
import Header from '@/app/(app)/Header'
import axios from 'axios'
import { useAuth } from '@/hooks/auth'
import Button from '@/components/Button'
import TextArea from '@/components/Textarea'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [errors, setErrors] = useState([])
    const [smtpHost, setSmtpHost] = useState('');
    const [smtpPort, setSmtpPort] = useState('');
    const [smtpUsuario, setSmtpUsuario] = useState('');
    const [smtpContraseña, setSmtpContraseña] = useState('');
    const [smtpEncriptacion, setSmtpEncriptacion] = useState('');
    const [emailRemitente, setEmailRemitente] = useState('');
    const [nombreRemitente, setNombreRemitente] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar los datos
    }

    const handleTestEmail = () => {
        // Aquí iría la lógica para enviar un correo de prueba
    }

    return (
        <>
            {/* header */}
            
            {/* div container */}
            <div className="py-0 bg-gray-100">
                <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8 bg-white">
                            <h3 className='font-bold mb-6'>Home / Configuración / <span className='font-normal'> SMTP</span></h3>
                            
                            <h2 className="text-lg font-bold mb-4">Configuración del Servidor SMTP</h2>
                            <p className="text-gray-600 mb-6">Configure los ajustes de su servidor SMTP para habilitar el envío de correos electrónicos desde su aplicación. Asegúrese de ingresar la información correcta proporcionada por su proveedor de servicios de correo electrónico.</p>
                            
                            <form onSubmit={handleSubmit} className="w-full">
                                

                                <div className="mb-4">
                                    <Label htmlFor="smtpHost">Servidor SMTP</Label>
                                    <Input
                                        id="smtpHost"
                                        type="text"
                                        value={smtpHost}
                                        onChange={(e) => setSmtpHost(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="smtpPort">Puerto SMTP</Label>
                                    <Input
                                        id="smtpPort"
                                        type="number"
                                        value={smtpPort}
                                        onChange={(e) => setSmtpPort(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="smtpUsuario">Usuario SMTP</Label>
                                    <Input
                                        id="smtpUsuario"
                                        type="text"
                                        value={smtpUsuario}
                                        onChange={(e) => setSmtpUsuario(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="smtpContraseña">Contraseña SMTP</Label>
                                    <Input
                                        id="smtpContraseña"
                                        type="password"
                                        value={smtpContraseña}
                                        onChange={(e) => setSmtpContraseña(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="smtpEncriptacion">Encriptación SMTP</Label>
                                    <select
                                        id="smtpEncriptacion"
                                        value={smtpEncriptacion}
                                        onChange={(e) => setSmtpEncriptacion(e.target.value)}
                                        required
                                        className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    >
                                        <option value="">Seleccione una opción</option>
                                        <option value="tls">TLS</option>
                                        <option value="ssl">SSL</option>
                                        <option value="none">Ninguna</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="emailRemitente">Email del remitente</Label>
                                    <Input
                                        id="emailRemitente"
                                        type="email"
                                        value={emailRemitente}
                                        onChange={(e) => setEmailRemitente(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="nombreRemitente">Nombre del remitente</Label>
                                    <Input
                                        id="nombreRemitente"
                                        type="text"
                                        value={nombreRemitente}
                                        onChange={(e) => setNombreRemitente(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Button 
                                        type="button" 
                                        onClick={handleTestEmail} 
                                        className="bg-gray-700 text-white border border-gray-300 rounded-md hover:bg-gray-100"
                                    >
                                        Enviar correo de prueba
                                    </Button>
                                    <Button type="submit">Guardar cambios</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard