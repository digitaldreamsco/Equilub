import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()
    
    // Crear una copia del objeto params para evitar el error de readonly
    const mutableParams = params ? { ...params } : {}

    const { data: user, error, mutate } = useSWR('/api/user', () => {
        // Verificar si hay token antes de hacer la request
        const token = localStorage.getItem('auth_token')
        if (!token) {
            throw new Error('No token available')
        }
        
        return axios
            .get('/api/user')
            .then(res => {
                // Si la respuesta es un array, tomar el primer elemento
                if (Array.isArray(res.data) && res.data.length > 0) {
                    /* console.log('User data:', res.data[0]) // Log para depuración */
                    return res.data[0]
                }
                // Si es un objeto con datos de usuario
                if (res.data && res.data.user) {
                    return res.data.user
                }
                // Si es directamente el usuario
                return res.data
            })
            .catch(error => {
                if (error.response?.status === 401) {
                    // Token inválido, limpiarlo
                    localStorage.removeItem('auth_token')
                    delete axios.defaults.headers.common['Authorization']
                }
                if (error.response?.status !== 409) throw error

                router.push('/verify-email')
            })
        }
    )

    // Cargar token desde localStorage al inicializar y limpiar si hay error
    useEffect(() => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        
        // Si hay error de autenticación, limpiar token
        if (error?.response?.status === 401) {
            localStorage.removeItem('auth_token')
            delete axios.defaults.headers.common['Authorization']
        }
    }, [error])

    const register = async ({ setErrors, ...props }) => {
        setErrors([])

        axios
            .post('/api/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response?.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)

        // Limpiar tokens anteriores
        localStorage.removeItem('auth_token')
        delete axios.defaults.headers.common['Authorization']

        console.log('Iniciando login con:', props)

        try {
            const response = await axios.post('/api/login', props)
            console.log('Respuesta del login:', response.data)
            
            // Verificar si la respuesta contiene datos de éxito
            if (response.data.success && response.data.data) {
                const { token, user } = response.data.data
                
                // Guardar el token en localStorage
                if (token) {
                    console.log('Token recibido:', token)
                    localStorage.setItem('auth_token', token)
                    // Configurar el header de autorización para futuras requests
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                }
                
                console.log('Mutating user data...')
                // Actualizar los datos del usuario
                await mutate()
                
                console.log('Login exitoso, redirigiendo...')
                // Redirigir manualmente si el middleware no funciona
                router.push('/dashboard')
            } else {
                setErrors({ 
                    email: ['Respuesta inesperada del servidor.'] 
                })
            }
        } catch (error) {
            console.error('Login error:', error)
            
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {})
            } else if (error.response?.status === 401) {
                setErrors({ 
                    email: ['Las credenciales proporcionadas son incorrectas.'] 
                })
            } else {
                setErrors({ 
                    email: ['Error al conectar con el servidor. Intenta de nuevo.'] 
                })
            }
        }
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        setErrors([])
        setStatus(null)

        axios
            .post('/api/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response?.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)

        axios
            .post('/api/reset-password', { token: mutableParams.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response?.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/api/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/api/logout').then(() => {
                // Eliminar el token del localStorage
                localStorage.removeItem('auth_token')
                // Eliminar el header de autorización
                delete axios.defaults.headers.common['Authorization']
                mutate()
            })
        } else {
            // Si hay error, limpiar tokens localmente
            localStorage.removeItem('auth_token')
            delete axios.defaults.headers.common['Authorization']
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            console.log('Usuario autenticado detectado, redirigiendo a:', redirectIfAuthenticated)
            router.push(redirectIfAuthenticated)
        }
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) {
            console.log('Error de autenticación detectado, haciendo logout')
            logout()
        }
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
