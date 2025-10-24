// imports components and icons
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight, faCircleCheck} from '@fortawesome/free-solid-svg-icons'

// const exports function step
const step = ({ active = 'step1', success_one = false, success_two = false, success_three = false, success_four = false, ...props }) => (
    // start container  
    <>
    <h2 className='font-bold text-lg'>Publica tu inmueble</h2>
    <p className='text-sm'>Sigue los pasos para publicar tu inmueble</p>
    <div className='space-y-3 mb-12 mt-8'>
                                {/* start link */}
                                <div className='flex flex-1 space-x-2'>
                                    <FontAwesomeIcon  className={(success_one) ? 'text-xs mt-1 text-green-500': 'text-xs mt-1 text-gray-200'} icon={faCircleCheck} />
                                    <Link href={(active !== 'step1') ? ((success_one)?'/property/add/step-1':'#'): '#'}>
                                        <h3 className={(active === 'step1') ? 'font-bold': ((success_one) ?'font-bold': 'font-bold text-gray-200')}>Paso 1: <span className='font-normal'> Crear tu inmueble</span> </h3>
                                    </Link>
                                </div>
                                <div className='flex flex-1 space-x-2'>
                                    <FontAwesomeIcon className={(success_two) ? 'text-xs mt-1 text-green-500': 'text-xs mt-1 text-gray-200'} icon={faCircleCheck} />
                                    <Link href={(active !== 'step2') ? ((success_two)?'/property/add/step-2':'#'): '#'}>
                                        <h3 className={(active === 'step2') ? 'font-bold': ((success_two) ?'font-bold': 'font-bold text-gray-200')}>Paso 2: <span className='font-normal'> Datos del inmueble</span> </h3>
                                    </Link>
                                </div>
                                
                                {/* link */}
                                
                                {/* separate */}
                             
                                {/* link */}
                                <div className='flex flex-1 space-x-2'>
                                <FontAwesomeIcon className={(success_three) ? 'text-xs mt-1 text-green-500': 'text-xs mt-1 text-gray-200'} icon={faCircleCheck} />
                                <Link href={(active !== 'step3') ? ((success_three)?'/property/add/step-3':'#'): '#'}>
                                    <h3 className={(active === 'step3') ? 'font-bold': ((success_three) ?'font-bold': 'font-bold text-gray-200')}>Paso 3: <span className='font-normal'> Area y Ubicación del inmueble</span> </h3>
                                </Link>
                                </div>
                                {/* separate */}
                               
                                {/* link */}
                                <div className='flex flex-1 space-x-2'>
                                <FontAwesomeIcon className={(success_four) ? 'text-xs mt-1 text-green-500': 'text-xs mt-1 text-gray-200'} icon={faCircleCheck} />
                                <Link href={(active !== 'step4') ? '#' : '#'}>
                                    <h3 className={(active === 'step4') ? 'font-bold': ((success_four) ?'font-bold': 'font-bold text-gray-200')}>Paso 4: <span className='font-normal'> Imagenes y publicación del inmueble</span> </h3>
                                </Link>
                                </div>
                                {/* end link */}
    </div>
    {/* end container */}
    
    </>
    
)
// exports components to page
export default step