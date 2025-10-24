'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const Page = () => {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
              <div className="w-1/2 h-screen  px-24 pt-4 pb-8  relative justify-center flex items-center text-center">
                <div className="items-center bg-white/[0.95] px-5 py-10 rounded-xl w-4/6 shadow-lg">
                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your email
                    address and we will email you a password reset link that
                    will allow you to choose a new one.
                </div>

                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            className="block mt-1 w-full rounded-full bg-gray-100"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-center mt-4 ">
                        <Button className="text-sm rounded-full px-8 bg-blue-900 text-white">Email Password Reset Link</Button>
                    </div>
                </form>
                </div>
            </div>
    )
}

export default Page
