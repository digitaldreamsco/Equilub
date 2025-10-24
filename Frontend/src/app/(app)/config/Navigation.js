import { faCameraAlt, faCheckDouble, faDashboard, faEnvelopeOpen, faLanguage, faMoneyBill, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = ({ user }) => {
    const nameUrl = usePathname().split('/');
return (
    <>
        <nav className="bg-white pt-12 h-screen">
            <div className="sm:-my-px ">
                <h3 className='text-uppercase mb-3 font-semibold sm:ml-8'>Configuraciones</h3>
                { Object.entries(user[0]?.permission).map((permission)=>
                <>
                <div key={permission[0]}>
                            <div className='text-bold'>
                            { user[0]?.permission[permission[0]].permission_id.includes('read-user') ? (
                                    <>
                                        <Link href="/config"  className={`text-gray-700 flex font-normal items-center py-2 sm:pl-8 hover:bg-gray-200 ${usePathname() === '/config' ? ' bg-gray-200 ':null}`}>
                                            <FontAwesomeIcon icon={faDashboard} className='mr-2 w-[25px]' />
                                            General
                                        </Link>
                                    </>
                                    ): null
                            }
                            { user[0]?.permission[permission[0]].permission_id.includes('read-user') ? (
                                    <>
                                        <Link href="/config/idiom"  className={`text-gray-700 flex font-normal items-center py-2 sm:pl-8 hover:bg-gray-200 ${nameUrl[2] === 'idiom' ? ' bg-gray-200 ':null}`}>
                                            <FontAwesomeIcon icon={faLanguage} className='mr-2 w-[25px]' />
                                            Idioma
                                        </Link>
                                    </>
                                    ): null
                            }
                            { user[0]?.permission[permission[0]].permission_id.includes('read-user') ? (
                                    <>
                                        <Link href="/config/publish/property" className={`text-gray-700 flex font-normal items-center py-2 sm:pl-8 hover:bg-gray-200 ${nameUrl[2]+'/'+nameUrl[3] === 'publish/property' ? ' bg-gray-200 ':null}`}>
                                        <FontAwesomeIcon icon={faCheckDouble} className='mr-2 w-[25px]' />
                                            Publicar
                                        </Link>
                                    </>
                                    ): null
                            }
                            { user[0]?.permission[permission[0]].permission_id.includes('read-user') ? (
                                    <>
                                        <Link href="/config/stmp" className={`text-gray-700 flex font-normal items-center py-2 sm:pl-8 hover:bg-gray-200 ${nameUrl[2] === 'stmp' ? ' bg-gray-200 ':null}`}>
                                        <FontAwesomeIcon icon={faEnvelopeOpen} className='mr-2 w-[25px]'  />
                                            SMTP
                                        </Link>
                                    </>
                                    ): null
                            }
                            { user[0]?.permission[permission[0]].permission_id.includes('read-user') ? (
                                    <>
                                        <Link href="/config/images" className={`text-gray-700 flex font-normal items-center py-2 sm:pl-8 hover:bg-gray-200 ${nameUrl[2] === 'images' ? ' bg-gray-200 ':null}`}>
                                        <FontAwesomeIcon icon={faCameraAlt} className='mr-2 w-[25px]'  />
                                            Imagenes
                                        </Link>
                                    </>
                                    ): null
                            }
                            { user[0]?.permission[permission[0]].permission_id.includes('read-user') ? (
                                    <>
                                        <Link href="/config/quote" className={`text-gray-700 flex font-normal items-center py-2 sm:pl-8 hover:bg-gray-200 ${nameUrl[2] === 'quote' ? ' bg-gray-200 ':null}`}>
                                        <FontAwesomeIcon icon={faMoneyBillAlt} className='mr-2 w-[25px]'  />
                                            Cotizaciones
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