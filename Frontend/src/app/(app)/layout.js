'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import NavTopbar from '@/app/(app)/NavTopbar'
import Loading from '@/app/(app)/Loading'


import { useState } from 'react'
const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    
    if (!user) {
        return <Loading />
    }
    

    return (
        <>
        <div className="min-h-screen bg-gray-100 ">
        
            {/* header app */}
            <NavTopbar user={user} />
            <div className='h-auto w-full flex'>
                <div className='w-[16%] h-screen bg-white fixed mt-[3.5%]'>
                    {/* main app */}
                    <Navigation user={user} />
                </div>
                {/* content app */}
                <main className='ml-[16%] w-full bg-gray-50/50 mt-[5%]'>
                    {children}
                </main>
            </div>
            
        </div>
        
        </>
    )
}

export default AppLayout
