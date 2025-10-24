import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ToggleMenu from '@/components/ToggleMenu'
import Notificaciones from '@/components/Notificaciones';
import { faCircle, faVolumeHigh, faDashboard, faUserAltSlash, faUserAlt, faUserCircle, faHouseCircleXmark, faUserCog, faUserLock, faUserSlash, faUserSecret, faUserShield, faMagnifyingGlass, faLevelUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
FontAwesomeIcon
const Navigation = ({ user }) => {
    const { logout } = useAuth()
    const  addProperty  = () => { window.location.href = '/property/add/step-1'}
    const [open, setOpen] = useState(false)
    const menuItems = [
        { toggle: false, icons: faDashboard, label: 'Tema', href: '/dashboard' },
        { toggle: false, icons: faVolumeHigh, label: 'Silenciar', href: '/property' },
        { toggle: true, icons: faUserAltSlash, label: 'Inactivo', href: '/users' },
        
    ];
    return (
        <nav className="bg-white border-b border-gray-100 fixed w-full z-50">
            {/* Primary Navigation Menu */}
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center ml-2">
                            <Link href="/dashboard">
                                <img src='/imagen/default-logo.png' className='w-[150px]'></img>
                            </Link>
                        </div>
                        <div className="flex-shrink-0 flex items-center ml-14">
                            <input type="text" placeholder='Buscar...' className='border w-[25rem] bg-gray-100 border-gray-100 rounded-md px-6 pr-12 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='mr-3 -ml-8 text-black/[0.2] fill-blue-900/[0.02] text-center text-md' />
                        </div>
                        
                       
                    </div>

                    {/* Settings Dropdown */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                    <ToggleMenu title="Opciones" items={menuItems} />
                    <Notificaciones />
                    
                    
                    <svg xmlns="http://www.w3.org/2000/svg" height={'19'} width={'20'} className='mr-3 fill-blue-900' viewBox="0 0 640 512">
                        <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"/>
                    </svg>
                        <Dropdown
                            align="right"
                            width="60"
                            trigger={
                                <button className="flex items-center border rounded-full px-4 py-2 text-md font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                    <FontAwesomeIcon icon={faUserShield} height={20} width={22} className='mr-2 w-5 h-5 text-blue-900' />
                                    <div className='text-md font-normal'>{user[0]?.name}</div>

                                    <div className="ml-1">
                                        <svg
                                            className="fill-current h-4 w-4 fill-blue-900"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            }>
                            <div>
                            {/* Authentication */}
                            <DropdownButton className="flex px-4 py-2 items-center justify-center text-sm" >
                               <Link href={'/my-perfil'}>
                               Mi Perfil
                                <div className='rounded-full bg-red-200 text-red-500 px-3 py-1 text-xs float-end relative ml-[1.5rem]'>
                                            5% Completado
                                </div>
                               </Link>
                                
                                
                            </DropdownButton>
                            <DropdownButton className="flex px-4 py-2 items-center justify-center text-sm" onClick={logout}>
                                Cerrar Sesión 
                                <svg xmlns="http://www.w3.org/2000/svg" className=' text-gray-100 fill-gray-400 float-end ml-[3rem]' height={30} width={20} viewBox="0 0 640 512">
                                    <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
                                </svg>
                                
                            </DropdownButton>
                            </div>
                            
                        </Dropdown>
                    </div>

                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-blue-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={usePathname() === '/dashboard'}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    {/* Responsive Settings Options */}
                    <div className="pt-4 pb-1 border-t border-gray-200">
                   
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-10 w-10 fill-current text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>

                            <div className="ml-3">
                                <div className="font-medium text-base text-gray-800">
                                    {user[0]?.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user[0]?.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* Authentication */}
                            <ResponsiveNavButton onClick={logout}>
                                Logout
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation