'use client'

import { useAuth } from '@/hooks/auth'
import NavPage from '@/app/(app)/users/create/Navigation'
import Loading from '@/app/(app)/Loading'

import { useState } from 'react'
const PageLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    
    if (!user) {
        return <Loading />
    }

    return (
        <>
        <div className="p-5 bg-gray-100 ">
            <div className='h-auto w-full flex'>
                <div className='w-[14%] h-screen bg-white fixed '>
                    {/* main app */}
                    <NavPage user={user} />
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

export default PageLayout