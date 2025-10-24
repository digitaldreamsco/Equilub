import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLubrications } from '@/hooks/lubrications'

const Navigation = () => {
    const params = useParams()
    const name = params.name
    const id = params.id
    const [lubrication, setLubrication] = useState({})
    // Simular una llamada a la API para obtener los servicios
    const obtenerEstudio = async () => {
       const { getLubricationsId } = useLubrications()
       await getLubricationsId({
           setLubrication,
           id: id,
       })
       
   }
   
   useEffect(() => {
       if (id) {
           obtenerEstudio()
       }
   }, []);
  
    
    return (
        <nav className="p-4">
            <h3 className='font-bold text-lg mb-6'>Pasos 1 de {lubrication.value?.length}</h3>
          
            { lubrication?.value && Object.entries(lubrication?.value).map((items, key) => 
                <div key={key}>
                    
                    <Link href={`/study-lubrications/new/${id}/${name}?tb=${key}`}>
                        <div className='bg-gray-100 mt-2 py-5 px-3 rounded-[10px] font-bold flex relative hover:bg-gray-200 text-sm'>
                            {items[1].titulo} <FontAwesomeIcon className='float-right absolute right-3 top-5 bg-blue-800 text-white px-2 py-1 rounded-full' icon={faChevronRight} />
                        </div>
                    </Link>
                    
                    
                </div>

            )}
            
        </nav>
    )
}

export default Navigation