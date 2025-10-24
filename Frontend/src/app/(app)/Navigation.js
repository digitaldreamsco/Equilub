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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookBookmark, faBookSkull, faCarSide, faCircleInfo, faDashboard, faGear, faHome, faHomeAlt, faHouseDamage, faMoneyBill, faPlus, faSdCard, faSheetPlastic, faUserAlt, faUserPlus, faChevronRight, faChevronUp, faLanguage, faGears, faEnvelope, faPaperPlane, faPaperclip, faToiletPaper, faNewspaper, faTractor, faAngleRight, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faServicestack } from '@fortawesome/free-brands-svg-icons'

const Navigation = ({ user }) => {
    const { logout } = useAuth()
    const nameUrl = usePathname().split('/');
    const [open, setOpen] = useState(false)
    const [activeMenu, setActiveMenu] = useState(null)
    const [options, setOption] = useState(null)

    const toggleMenu = (menuName) => {
        setActiveMenu(activeMenu === menuName ? null : menuName)
    }

    // Verificar permisos de lubricación de forma segura
    const hasLubricationPermissions = () => {
        // Si el usuario es super-admin, tiene todos los permisos
        if (user?.roles?.name === 'super-admin') {
            return true;
        }
        
        if (!user || !user.permission || !Array.isArray(user.permission)) {
            return false;
        }
        
        return user.permission.some(permission => 
            permission?.permission_id?.includes('read-study') || 
            permission?.permission_id?.includes('create-study') ||
            permission?.permission_id?.includes('read-format')
        );
    };

    // Función helper para obtener permisos de forma segura
    const getPermissions = () => {
        if (!user || !user.permission || !Array.isArray(user.permission)) {
            console.log('❌ No user permissions found:', { user });
            return [];
        }
        console.log('✅ User permissions:', user.permission);
        return user.permission;
    };

    // Función helper para verificar si el usuario tiene un permiso específico
    const hasPermission = (permissionName) => {
        // Si el usuario es super-admin, tiene todos los permisos
        if (user?.roles?.name === 'super-admin') {
            console.log(`🔐 Super-admin has permission "${permissionName}": true`);
            return true;
        }
        
        const permissions = getPermissions();
        const hasIt = permissions.some(permission => permission?.permission_id?.includes(permissionName));
        console.log(`🔐 Checking permission "${permissionName}":`, hasIt);
        return hasIt;
    };

    const userHasLubricationPermissions = hasLubricationPermissions();

    return (
        <nav className="bg-white pt-12 h-screen">
            {/* Botón "Nuevo" */}
            <div className='mb-[3rem] px-5 mt-2 z-50 relative'>
                <Dropdown
                    align="left"
                    width="60"
                    trigger={
                        <button className="flex bg-blue-900 text-white w-[90%] border justify-center border-blue-800 text-center px-2 py-2 rounded-full text-blue-800 hover:fill-black hover:bg-blue-700 font-bold ml-3 items-center text-md font-medium focus:outline-none transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faPlus} className='mr-3 ml-1 text-white fill-blue-900 text-center text-md' />
                            Nuevo 
                        </button>
                    }>
                        
                    <div className='w-full'>
                        {/* Nuevo Usuario */}
                        {hasPermission('create-user') && (
                            <DropdownButton className="flex items-center justify-left text-sm w-full">
                                <Link className='flex hover:bg-blue-800 hover:text-white w-full px-4 py-2' href={'/users/create'}>
                                    <FontAwesomeIcon icon={faPlus} className='mr-3' />
                                    Nuevo Usuario
                                </Link>    
                            </DropdownButton>
                        )}
                        
                        {/* Nuevo Servicio */}
                        {hasPermission('create-service') && (
                            <DropdownButton className="flex items-center justify-left text-sm w-full">
                                <Link className='flex hover:bg-blue-800 hover:text-white w-full px-4 py-2' href={'/service/new'}>
                                    <FontAwesomeIcon icon={faPlus} className='mr-3' />
                                    Nuevo Servicio
                                </Link>    
                            </DropdownButton>
                        )}
                        
                        {/* Nuevo Estudio */}
                        {hasPermission('create-study') && (
                            <DropdownButton className="flex w-full items-center justify-left text-sm">
                                <Link className='flex hover:bg-blue-800 hover:text-white w-full px-4 py-2' href={'/study-lubrications/new'}>
                                    <FontAwesomeIcon icon={faPlus} className='mr-3' />
                                    Nuevo Estudio
                                </Link>
                            </DropdownButton>
                        )}
                        
                        {/* Nuevo Formato */}
                        {hasPermission('create-format') && (
                            <DropdownButton className="flex w-full items-center justify-left text-sm">
                                <Link className='flex hover:bg-blue-800 hover:text-white w-full px-4 py-2' href={'/study-lubrications/format/new'}>
                                    <FontAwesomeIcon icon={faPlus} className='mr-3' />
                                    Nuevo Formato
                                </Link>
                            </DropdownButton>
                        )}

                        {/* Nuevo Cliente */}
                        {hasPermission('create-client') && (
                            <DropdownButton className="flex w-full items-center justify-left text-sm">
                                <Link className='flex hover:bg-blue-800 hover:text-white w-full px-4 py-2' href={'/client/new/'}>
                                    <FontAwesomeIcon icon={faPlus} className='mr-3' />
                                    Nuevo Cliente
                                </Link> 
                            </DropdownButton>
                        )}
                        
                        {/* Nuevo Equipo */}
                        {hasPermission('create-machine') && (
                            <DropdownButton className="flex w-full items-center justify-left text-sm">
                                <Link className='flex hover:bg-blue-800 hover:text-white w-full px-4 py-2' href={'/machine/new/'}>
                                    <FontAwesomeIcon icon={faPlus} className='mr-3' />
                                    Nuevo Equipo
                                </Link> 
                            </DropdownButton>
                        )}
                        
                        {/* Nuevo Mensaje */}
                        {hasPermission('create-message') && (
                            <DropdownButton className="flex w-full items-center justify-left text-sm">
                                <Link className='flex hover:bg-blue-800 hover:text-white w-full px-4 py-2' href={'/message'}>
                                    <FontAwesomeIcon icon={faPlus} className='mr-3' />
                                    Nuevo Mensaje
                                </Link>  
                            </DropdownButton>
                        )}
                    </div>
                </Dropdown>
            </div>

            {/* Menú de acordeón */}
            <div className="sm:-my-px sm:px-3 space-y-2 overflow-auto relative h-[450px] z-1">
                {/* Panel de Control */}
                <div>
                    <Link
                        href={'/dashboard'}
                        className={`w-full rounded-md border-gray-300 border text-left text-gray-700 text-sm flex font-bold items-center py-4 px-3 hover:bg-gray-200 ${nameUrl[1] === 'dashboard' ? 'bg-gray-200' : ''}`}
                    >
                        <FontAwesomeIcon icon={faHome} className='mr-3 text-blue-900 fill-blue-900 w-5 h-5' />
                        <span>Panel de Control</span>
                    </Link>
                </div>

                {/* Dashboard Power BI */}
                <div>
                    <Link
                        href={'/dashboard-powerbi'}
                        className={`w-full rounded-md border-gray-300 border text-left text-gray-700 text-sm flex font-bold items-center py-4 px-3 hover:bg-gray-200 ${nameUrl[1] === 'dashboard-powerbi' ? 'bg-gray-200' : ''}`}
                    >
                        <FontAwesomeIcon icon={faChartLine} className='mr-3 text-blue-900 fill-blue-900 w-5 h-5' />
                        <span>Dashboard Avanzado</span>
                    </Link>
                </div>

                {/* Power BI y Reportes */}
                <div>
                    <Link
                        href={'/powerbi'}
                        className={`w-full rounded-md border-gray-300 border text-left text-gray-700 text-sm flex font-bold items-center py-4 px-3 hover:bg-gray-200 ${nameUrl[1] === 'powerbi' ? 'bg-gray-200' : ''}`}
                    >
                        <FontAwesomeIcon icon={faChartLine} className='mr-3 text-purple-600 fill-purple-600 w-5 h-5' />
                        <span>Power BI y Reportes</span>
                    </Link>
                </div>
                
                {/* Usuarios */}
                {hasPermission('read-user') && (
                    <div>
                        <button
                            onClick={() => toggleMenu('users')}
                            className={`w-full border-gray-300 border rounded-md text-left text-sm text-gray-700 flex font-bold items-center py-4 px-3 hover:bg-gray-200 ${nameUrl[1] === 'users' ? 'bg-gray-200' : ''}`}
                        >
                            <FontAwesomeIcon icon={faUserPlus} className='mr-3 text-blue-900 fill-yellow-500 w-5 h-5' />
                            <span>Usuarios</span>
                            <FontAwesomeIcon 
                                icon={activeMenu === 'users' ? faChevronUp : faChevronRight} 
                                className='absolute right-6 text-xs text-gray-400'
                            />
                        </button>
                        
                        {activeMenu === 'users' && (
                            <div className="pl-3">
                                <Link href="/users" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                                    <FontAwesomeIcon 
                                        icon={faAngleRight} 
                                        className='left-6 me-2 text-xs text-gray-400'
                                    />
                                    Lista de usuarios
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Clientes */}
                {hasPermission('read-client') && (
                    <div>
                        <button
                            onClick={() => toggleMenu('client')}
                            className={`w-full border-gray-300 border rounded-md text-left text-sm text-gray-700 flex font-bold items-center py-4 px-3 hover:bg-gray-200 ${nameUrl[1] === 'client' ? 'bg-gray-200' : ''}`}
                        >
                            <FontAwesomeIcon icon={faUserAlt} className='mr-3 text-blue-900 fill-yellow-500 w-5 h-5' />
                            <span>Clientes</span>
                            <FontAwesomeIcon 
                                icon={activeMenu === 'client' ? faChevronUp : faChevronRight} 
                                className='absolute right-6 text-xs text-gray-400'
                            />
                        </button>
                        {activeMenu === 'client' && (
                            <div className="pl-3">
                                <Link href="/client" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                                    <FontAwesomeIcon 
                                        icon={faAngleRight} 
                                        className='left-6 me-2 text-xs text-gray-400'
                                    />
                                    Ver clientes
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Servicios */}
                {hasPermission('read-service') && (
                    <div>
                        <button
                            onClick={() => toggleMenu('services')}
                            className={`w-full border-gray-300 border rounded-md text-left text-sm text-gray-700 flex font-bold items-center py-4 px-3 hover:bg-gray-200 ${nameUrl[1] === 'service' ? 'bg-gray-200' : ''}`}
                        >
                            <FontAwesomeIcon icon={faServicestack} className='mr-3 text-blue-900 fill-yellow-500 w-5 h-5' />
                            <span>Servicios</span>
                            <FontAwesomeIcon 
                                icon={activeMenu === 'services' ? faChevronUp : faChevronRight} 
                                className='absolute right-6 text-xs text-gray-400'
                            />
                        </button>
                        {activeMenu === 'services' && (
                            <div className="pl-3">
                                <Link href="/service" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                                    <FontAwesomeIcon 
                                        icon={faAngleRight} 
                                        className='left-6 me-2 text-xs text-gray-400'
                                    />
                                    Ver servicios
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Equipos y Sistemas */}
                {hasPermission('read-machine') && (
                    <div>
                        <button
                            onClick={() => toggleMenu('machine')}
                            className={`w-full border-gray-300 border rounded-md text-left text-sm text-gray-700 flex font-bold items-center py-4 px-3 hover:bg-gray-200 ${nameUrl[1] === 'machine' ? 'bg-gray-200' : ''}`}
                        >
                            <FontAwesomeIcon icon={faTractor} className='mr-3 text-blue-900 fill-yellow-500 w-5 h-5' />
                            <span>rutas-MTTO</span>
                            <FontAwesomeIcon 
                                icon={activeMenu === 'machine' ? faChevronUp : faChevronRight} 
                                className='absolute right-6 text-xs text-gray-400'
                            />
                        </button>
                        {activeMenu === 'machine' && (
                            <div className="pl-3">
                                <Link href="/machine" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                                    <FontAwesomeIcon 
                                        icon={faAngleRight} 
                                        className='left-6 me-2 text-xs text-gray-400'
                                    />
                                    Ver equipos
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Estudio de Lubricación */}
                {userHasLubricationPermissions && (
                    <div>
                        <button
                            onClick={() => toggleMenu('lubrication')}
                            className={`w-full border-gray-300 border rounded-md text-left text-sm text-gray-700 flex font-bold items-center py-4 px-3 hover:bg-gray-200 ${nameUrl[1] === 'study-lubrications' ? 'bg-gray-200' : ''}`}
                        >
                            <FontAwesomeIcon icon={faBookBookmark} className='mr-3 text-blue-900 fill-yellow-500 w-5 h-5' />
                            <span>Estudio de Lubricación</span>
                            <FontAwesomeIcon 
                                icon={activeMenu === 'lubrication' ? faChevronUp : faChevronRight} 
                                className='absolute right-6 text-xs text-gray-400'
                            />
                        </button>
                        {activeMenu === 'lubrication' && (
                            <div className="pl-3">
                                {hasPermission('read-study') && (
                                    <Link href="/study-lubrications" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                                        <FontAwesomeIcon 
                                            icon={faAngleRight} 
                                            className='left-6 me-2 text-xs text-gray-400'
                                        />
                                        Ver estudios
                                    </Link>
                                )}
                                {hasPermission('read-format') && (
                                    <Link href="/study-lubrications/format" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                                        <FontAwesomeIcon 
                                            icon={faAngleRight} 
                                            className='left-6 me-2 text-xs text-gray-400'
                                        />
                                        Ver Formato de estudio
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Carta de Lubricación */}
                {hasPermission('read-card') && (
                    <div>
                        <button
                            onClick={() => toggleMenu('lubricationCard')}
                            className={`w-full border-gray-300 border rounded-md text-left text-sm text-gray-700 flex font-bold items-center py-4 px-3 hover:bg-gray-200 ${nameUrl[1] === 'cards-lubrications' ? 'bg-gray-200' : ''}`}
                        >
                            <FontAwesomeIcon icon={faSheetPlastic} className='mr-3 text-blue-900 fill-yellow-500 w-5 h-5' />
                            <span>Carta de Lubricación</span>
                            <FontAwesomeIcon 
                                icon={activeMenu === 'lubricationCard' ? faChevronUp : faChevronRight} 
                                className='absolute right-6 text-xs text-gray-400'
                            />
                        </button>
                        {activeMenu === 'lubricationCard' && (
                            <div className="pl-3">
                                <Link href="/cards-lubrications" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                                    <FontAwesomeIcon 
                                        icon={faAngleRight} 
                                        className='left-6 me-2 text-xs text-gray-400'
                                    />
                                    Ver Cartas
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Configuración */}
                {hasPermission('read-config-system') && (
                    <div>
                        <button
                            onClick={() => toggleMenu('config')}
                            className={`w-full rounded-md border border-gray-300 text-left text-gray-700 flex font-bold items-center py-4 px-3 hover:bg-gray-200 ${nameUrl[1] === 'config' ? 'bg-gray-200' : ''}`}
                        >
                            <FontAwesomeIcon icon={faGear} className='mr-3 text-blue-900 fill-yellow-500 w-5 h-5' />
                            <span>Ajustes</span>
                            <FontAwesomeIcon 
                                icon={activeMenu === 'config' ? faChevronUp : faChevronRight} 
                                className='absolute right-6 text-xs text-gray-400'
                            />
                        </button>
                        {activeMenu === 'config' && (
                            <div className="pl-3">
                                <Link href="/config" className="block py-2 px-4 text-md text-gray-600 hover:bg-gray-100">
                                    <FontAwesomeIcon 
                                        icon={faAngleRight} 
                                        className='left-6 me-2 text-xs text-gray-400'
                                    />
                                    Generales
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Estado de disponibilidad */}
            <div className='float-left bottom-0 fixed'>
                <div className='text-gray-700 flex font-normal items-center mt-3 py-2 px-4 text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='mr-3 text-green-100 fill-green-500 w-3 h-3' viewBox="0 0 640 512">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
                    </svg>
                    <span>Versión 2.0.5</span>
                </div>
            </div>
        </nav>
    )
}

export default Navigation

