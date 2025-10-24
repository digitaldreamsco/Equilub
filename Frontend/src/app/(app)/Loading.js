import { useState, useEffect } from 'react';

const Loading = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // La animación durará 3 segundos

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-blue-900/[0.03] overflow-hidden">
            <div className="relative m-auto text-center">
                <div className="w-full overflow-hidden">
                    <img 
                        src="/imagen/default-logo.png" 
                        className="w-[150px] mx-auto mb-5 animate-reveal-right-to-left" 
                        alt="Logotipo" 
                    />
                </div>
                <h3 className="text-md font-bold mb-4">Estamos preparando todo para ti...</h3>
            </div>
        </div>
    );
}

export default Loading;
