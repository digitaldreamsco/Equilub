'use client'
import Header from '@/app/(app)/Header'
import axios from 'axios'
import { useAuth } from '@/hooks/auth'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useState, useEffect } from 'react'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [maxImages, setMaxImages] = useState(5)
    const [basicImages, setBasicImages] = useState(3)
    const [platinumImages, setPlatinumImages] = useState(7)
    const [goldImages, setGoldImages] = useState(10)
    const [errors, setErrors] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        // Cargar la configuración actual
        const fetchConfig = async () => {
            try {
                const response = await axios.get('/api/image-config')
                setMaxImages(response.data.max_images.toString())
            } catch (error) {
                console.error('Error al cargar la configuración:', error)
            }
        }
        fetchConfig()
    }, [])

    const submitForm = async (event) => {
        event.preventDefault()
        setErrors([])
        setMessage('')

        try {
            const response = await axios.post('/api/image-config', { 
                max_images: maxImages,
                basic_images: basicImages,
                platinum_images: platinumImages,
                gold_images: goldImages
            })
            setMessage('Configuración guardada exitosamente')
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors)
            } else {
                setErrors(['Ocurrió un error al guardar la configuración'])
            }
        }
    }

    return (
        <>
        {/* header */}
            
            {/* div container */}
            <div className="py-0 bg-gray-100">
                <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8 bg-white">
                            {/* data user api  */}
                            <h3 className='font-bold'>Home / Configuración / <span className='font-normal'> Imágenes</span> </h3>
                            
                            <div className='flex justify-start items-center mt-12'>
                                <div className='w-1/2 pb-8 text-start'>
                                    <h4 className="text-lg font-semibold mb-4">Configuración de imágenes</h4>
                                    <form onSubmit={submitForm}>
                                       
                                        <div className="mb-4">
                                            <Label htmlFor="basic_images">Básico</Label>
                                            <Input
                                                id="basic_images"
                                                type="number"
                                                value={basicImages}
                                                className="block mt-1 w-full"
                                                onChange={(e) => setBasicImages(e.target.value)}
                                                required
                                            />
                                            <InputError messages={errors.basic_images} className="mt-2" />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="platinum_images">Platinum</Label>
                                            <Input
                                                id="platinum_images"
                                                type="number"
                                                value={platinumImages}
                                                className="block mt-1 w-full"
                                                onChange={(e) => setPlatinumImages(e.target.value)}
                                                required
                                            />
                                            <InputError messages={errors.platinum_images} className="mt-2" />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="gold_images">Gold</Label>
                                            <Input
                                                id="gold_images"
                                                type="number"
                                                value={goldImages}
                                                className="block mt-1 w-full"
                                                onChange={(e) => setGoldImages(e.target.value)}
                                                required
                                            />
                                            <InputError messages={errors.gold_images} className="mt-2" />
                                        </div>
                                        <Button className={'w-full mt-5'}>Guardar configuración</Button>
                                    </form>
                                    {message && <p className="mt-4 text-green-600">{message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard