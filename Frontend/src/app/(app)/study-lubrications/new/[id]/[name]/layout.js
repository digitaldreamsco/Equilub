'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/study-lubrications/new/[id]/[name]/Navigation'
import NavTopbar from '@/app/(app)/NavTopbar'
import Loading from '@/app/(app)/Loading'
import { useLubrications } from '@/hooks/lubrications'
import { useParams } from 'next/navigation'

import React, {useEffect, useState } from 'react'
const AppLayout = ({ children }) => {
    
    const { user } = useAuth({ middleware: 'auth' })
    
    if (!user) {
        return <Loading />
    }
    

    return (
        <>
        <head>
        <link rel="icon" type="image/x-icon" href="/imagen/logotype.png"></link>
        </head>
        
        <div className="min-h-screen bg-gray-100 p-5">
        
            
            <div className='h-auto w-full flex'>
                <div className='w-[15%] h-screen bg-white fixed '>
                    {/* main app */}
                                  
                    <Navigation />
                 
                </div>
                {/* content app */}
                <main className='ml-[18%] w-full bg-gray-50/50'>
                {children}
                </main>
            </div>
            
        </div>
        
        </>
    )
}

export default AppLayout
