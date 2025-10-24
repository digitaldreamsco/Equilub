import { faCheckDouble, faDashboard, faEnvelopeOpen, faLanguage, faPerson, faPersonArrowUpFromLine, faUserCircle, faUserLargeSlash, faUserLock, faWifi3 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

const Navigation = ({ user }) => {
    const nameUrl = usePathname().split('/');
return (
    <>
        <nav className="bg-white pt-12 h-screen">
            <div className="sm:-my-px ">
                <h3 className='text-uppercase mb-3 font-semibold sm:ml-8'>Nuevo usuario</h3>
                { Object.entries(user[0]?.permission).map((permission)=>
                <>
                <div key={permission[0]}>
                            <div className='text-bold'>
                            { user[0]?.permission[permission[0]].permission_id.includes('read-user') ? (
                                    <>
                                        <Link href={"#"}  className={`text-gray-700 flex font-normal items-center py-2 sm:pl-8 hover:bg-gray-200 ${usePathname() === '/users/create' ? ' bg-gray-200 ':null}`}>
                                            <FontAwesomeIcon icon={faUserCircle} className='mr-2 w-[25px]' />
                                            Perfil de Usuario 
                                        </Link>
                                    </>
                                    ): null
                            }
                            { user[0]?.permission[permission[0]].permission_id.includes('read-user') ? (
                                    <>
                                        <Link href="#"  className={`text-gray-700 flex font-normal items-center py-2 sm:pl-8 hover:bg-gray-200 ${nameUrl[3] === 'personal-informations' ? ' bg-gray-200 ':null}`}>
                                            <FontAwesomeIcon icon={faPerson} className='mr-2 w-[25px]' />
                                            Datos Personales
                                        </Link>
                                    </>
                                    ): null
                            }
                            { user[0]?.permission[permission[0]].permission_id.includes('read-user') ? (
                                    <>
                                        <Link href="#"  className={`text-gray-700 flex font-normal items-center py-2 sm:pl-8 hover:bg-gray-200 ${nameUrl[3] === 'credentials' ? ' bg-gray-200 ':null}`}>
                                            <FontAwesomeIcon icon={faUserLock} className='mr-2 w-[25px]' />
                                            Credenciales
                                        </Link>
                                    </>
                                    ): null
                            }
                            { user[0]?.permission[permission[0]].permission_id.includes('read-user') ? (
                                    <>
                                        <Link href="#" className={`text-gray-700 flex font-normal items-center py-2 sm:pl-8 hover:bg-gray-200 ${nameUrl[3] === 'permissions' ? ' bg-gray-200 ':null}`}>
                                        <FontAwesomeIcon icon={faPersonArrowUpFromLine} className='mr-2 w-[25px]' />
                                            Permisos 
                                        </Link>
                                    </>
                                    ): null
                            }
                            { user[0]?.permission[permission[0]].permission_id.includes('read-user') ? (
                                    <>
                                        <Link href="#" className={`text-gray-700 flex font-normal items-center py-2 sm:pl-8 hover:bg-gray-200 ${nameUrl[2] === 'stmp' ? ' bg-gray-200 ':null}`}>
                                        <FontAwesomeIcon icon={faWifi3} className='mr-2 w-[25px]'  />
                                            Publicar
                                        </Link>
                                    </>
                                    ): null
                            }
                            </div>
                </div>
                </>
                 )}
            </div>
        </nav>
    </>
)

}

export default Navigation