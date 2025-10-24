'use client';

import { useEffect, useState } from 'react';

/**
 * Componente para evitar errores de hidratación
 * Útil para elementos que pueden ser modificados por extensiones del navegador
 */
export default function NoSSR({ children }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return children;
}