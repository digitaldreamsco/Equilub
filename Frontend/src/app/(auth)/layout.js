'use client'

import NoSSR from '@/components/NoSSR';

const Layout = ({ children }) => {
    const imagenFront = '/imagen/blanco-vertical.png';
    const imagenFondo = '/imagen/fondoRepeat.png';
    return (
        <NoSSR>
            <div className="flex w-full text-center justify-center" suppressHydrationWarning={true}>
                <div className='w-1/2 flex justify-center items-center bg-blue-900' style={{backgroundImage: `url(${imagenFondo})`, backgroundSize: 'auto', backgroundPosition: 'center'}} suppressHydrationWarning={true}>
                    
                    <img src={imagenFront} className='w-[40%] ' />
                </div>
                {children}
            </div>
        </NoSSR>
    )
}

export default Layout
