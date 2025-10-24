'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const Page = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()

        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
    }

    return (
    <>
        <div className="mb-5 px-5 py-1 text-center">
                           <Link href={'/'}><img  src="/imagen/logo.png" className="w-full px-20 pb-8" /></Link> 
                            <h2 className="text-3xl font-bold mb-3">Registrarme</h2>
                            <p>Llena esta información</p>
        </div>
        <form onSubmit={submitForm} className='text-left'>
            {/* Name */}
            <div>
                <Label htmlFor="name">Nombres</Label>

                <Input
                    id="name"
                    type="text"
                    value={name}
                    className="block mt-1 w-full"
                    onChange={event => setName(event.target.value)}
                    required
                    autoFocus
                />

                <InputError messages={errors.name} className="mt-2" />
            </div>
            <div>
                <Label htmlFor="lastname">Apellidos</Label>

                <Input
                    id="lastname"
                    type="text"
                    value={lastname}
                    className="block mt-1 w-full"
                    onChange={event => setLastname(event.target.value)}
                    required
                    autoFocus
                />

                <InputError messages={errors.lastname} className="mt-2" />
            </div>

            {/* Email Address */}
            <div className="mt-4">
                <Label htmlFor="email">Correo Electrónico</Label>

                <Input
                    id="email"
                    type="email"
                    value={email}
                    className="block mt-1 w-full"
                    onChange={event => setEmail(event.target.value)}
                    required
                />

                <InputError messages={errors.email} className="mt-2" />
            </div>

            {/* Password */}
            <div className="mt-4">
                <Label htmlFor="password">Contraseña</Label>

                <Input
                    id="password"
                    type="password"
                    value={password}
                    className="block mt-1 w-full"
                    onChange={event => setPassword(event.target.value)}
                    required
                    autoComplete="new-password"
                />

                <InputError messages={errors.password} className="mt-2" />
            </div>

            {/* Confirm Password */}
            <div className="mt-4">
                <Label htmlFor="passwordConfirmation">
                    Confirmar Contraseña
                </Label>

                <Input
                    id="passwordConfirmation"
                    type="password"
                    value={passwordConfirmation}
                    className="block mt-1 w-full"
                    onChange={event =>
                        setPasswordConfirmation(event.target.value)
                    }
                    required
                />

                <InputError
                    messages={errors.password_confirmation}
                    className="mt-2"
                />
            </div>

            <div className="items-center mt-4 text-center">
                <Button className=" w-full mb-5 mt-4">Registrarme</Button>
                <Link
                    href="/login"
                    className="underline text-sm text-gray-600 hover:text-gray-900 mt-10">
                    Ya tienes cuenta?
                </Link>
            </div>
        </form>
    </>
        
    )
}

export default Page
