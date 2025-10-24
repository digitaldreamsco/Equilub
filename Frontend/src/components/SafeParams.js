'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Hook seguro para manejar params en Next.js 15
 * Evita el error "Cannot assign to read only property 'params'"
 */
export function useSafeParams() {
    const [safeParams, setSafeParams] = useState({});
    const [isClient, setIsClient] = useState(false);
    
    // Obtener params usando useParams (debe estar en el nivel superior)
    let routeParams = {};
    try {
        routeParams = useParams() || {};
    } catch (error) {
        console.error('Error al obtener useParams:', error);
    }
    
    useEffect(() => {
        setIsClient(true);
        // Crear una copia segura de los params
        const newParams = {};
        Object.entries(routeParams).forEach(([key, value]) => {
            newParams[key] = value;
        });
        setSafeParams(newParams);
    }, [JSON.stringify(routeParams)]);
    
    // Si estamos en el servidor, devolver params vacíos
    if (!isClient) {
        return {};
    }
    
    return safeParams;
}

/**
 * Componente para forzar renderizado del lado del cliente
 */
export function ClientOnly({ children }) {
    const [hasMounted, setHasMounted] = useState(false);
    
    useEffect(() => {
        setHasMounted(true);
    }, []);
    
    if (!hasMounted) {
        return null;
    }
    
    return children;
}