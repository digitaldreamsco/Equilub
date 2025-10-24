'use client'
import Header from '@/app/(app)/Header'
import axios from 'axios'
import { useAuth } from '@/hooks/auth'
import Button from '@/components/Button'
import TextArea from '@/components/Textarea'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [facebook, setFacebook] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [instagram, setInstagram] = useState('');
    const [pinterest, setPinterest] = useState('');
    const [twitter, setTwitter] = useState('');
    const [logo, setLogo] = useState(null);
    const [banner, setBanner] = useState(null);
    const logoInputRef = useRef(null);
    const bannerInputRef = useRef(null);
    const [urlWeb, setUrlWeb] = useState('');
    const [errors, setErrors] = useState([])

    const handleImageUpload = useCallback((file, setImage) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleDrop = useCallback((e, setImage) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageUpload(e.dataTransfer.files[0], setImage);
        }
    }, [handleImageUpload]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar los datos
    }

    return (
        <>
            {/* header */}
            
            {/* div container */}
            <div className="py-0 bg-gray-100">
                <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8 bg-white">
                            <h3 className='font-bold mb-6'>Home / Configuración / <span className='font-normal'> General</span></h3>
                            
                            <form onSubmit={handleSubmit} className="w-full">
                                <div className="mb-4">
                                    <Label htmlFor="titulo">Título de la página</Label>
                                    <Input
                                        id="titulo"
                                        type="text"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="descripcion">Descripción</Label>
                                    <ReactQuill
                                        theme="snow"
                                        value={descripcion}
                                        onChange={setDescripcion}
                                        modules={{
                                            toolbar: [
                                                [{ 'header': [1, 2, 3, false] }],
                                                ['bold', 'italic', 'underline', 'strike'],
                                                [{'list': 'ordered'}, {'list': 'bullet'}],
                                                ['link', 'image'],
                                                ['clean']
                                            ],
                                        }}
                                        className="bg-white"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="facebook">Facebook</Label>
                                    <Input
                                        id="facebook"
                                        type="text"
                                        value={facebook}
                                        onChange={(e) => setFacebook(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="whatsapp">WhatsApp</Label>
                                    <Input
                                        id="whatsapp"
                                        type="text"
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="instagram">Instagram</Label>
                                    <Input
                                        id="instagram"
                                        type="text"
                                        value={instagram}
                                        onChange={(e) => setInstagram(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="pinterest">Pinterest</Label>
                                    <Input
                                        id="pinterest"
                                        type="text"
                                        value={pinterest}
                                        onChange={(e) => setPinterest(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="twitter">Twitter</Label>
                                    <Input
                                        id="twitter"
                                        type="text"
                                        value={twitter}
                                        onChange={(e) => setTwitter(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="mb-4 flex space-x-4">
                                    <div className="w-1/2">
                                        <Label htmlFor="logo">Logo</Label>
                                        <div 
                                            className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
                                            onClick={() => logoInputRef.current.click()}
                                            onDrop={(e) => handleDrop(e, setLogo)}
                                            onDragOver={handleDragOver}
                                        >
                                            <div className="space-y-1 text-center">
                                                {logo ? (
                                                    <Image src={logo} alt="Logo" width={100} height={100} className="mx-auto" />
                                                ) : (
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                        <span>Subir un archivo</span>
                                                        <input 
                                                            id="logo-upload" 
                                                            name="logo-upload" 
                                                            type="file" 
                                                            className="sr-only" 
                                                            ref={logoInputRef}
                                                            onChange={(e) => handleImageUpload(e.target.files[0], setLogo)}
                                                            accept="image/*"
                                                        />
                                                    </label>
                                                    <p className="pl-1">o arrastrar y soltar</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-1/2">
                                        <Label htmlFor="banner">Banner</Label>
                                        <div 
                                            className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
                                            onClick={() => bannerInputRef.current.click()}
                                            onDrop={(e) => handleDrop(e, setBanner)}
                                            onDragOver={handleDragOver}
                                        >
                                            <div className="space-y-1 text-center">
                                                {banner ? (
                                                    <Image src={banner} alt="Banner" width={200} height={100} className="mx-auto" />
                                                ) : (
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="banner-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                        <span>Subir un archivo</span>
                                                        <input 
                                                            id="banner-upload" 
                                                            name="banner-upload" 
                                                            type="file" 
                                                            className="sr-only" 
                                                            ref={bannerInputRef}
                                                            onChange={(e) => handleImageUpload(e.target.files[0], setBanner)}
                                                            accept="image/*"
                                                        />
                                                    </label>
                                                    <p className="pl-1">o arrastrar y soltar</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="urlWeb">URL Página Web</Label>
                                    <Input
                                        id="urlWeb"
                                        type="url"
                                        value={urlWeb}
                                        onChange={(e) => setUrlWeb(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex justify-end">
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