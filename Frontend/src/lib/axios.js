import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: false, // Para API con tokens no necesitamos cookies
})

// Interceptor para agregar el token a las requests
axios.interceptors.request.use(
    config => {
        // Asegurar que siempre se envía Accept: application/json
        config.headers.Accept = 'application/json'
        
        const token = localStorage.getItem('auth_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// Manejo de errores
axios.interceptors.response.use(
    response => response,
    error => {
        console.error('Error de red:', error); // Agrega un log para el error
        
        // Si el token no es válido, eliminarlo
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token')
            delete axios.defaults.headers.common['Authorization']
        }
        
        return Promise.reject(error);
    }
)

export default axios
