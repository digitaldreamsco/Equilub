'use client'

import { useEffect, useState } from "react"
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { useLubrications } from "@/hooks/lubrications"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"


const NewstudylubriPage = () => {
    // variables a definir
    const params = useParams()
    const name = params.name
    const id = params.id
    const searchParams = useSearchParams()
    const keysId = searchParams.get('tb')
    const router = useRouter()
    const [lubrication, setLubrication] = useState({})

     // Simular una llamada a la API para obtener los servicios
     const obtenerEstudio = async () => {
        const { getLubricationsId } = useLubrications()
        await getLubricationsId({
            setLubrication,
            id: id,
        })
        
    }
    // obteniendo la infoamción del servidor por si algun cambio
    useEffect(() => {
        if (id) {
            obtenerEstudio()  
        }
    }, []);
    // funcion de guardado 
    const handleTabsFormSubmit = (e) => {
        e.preventDefault()
        if (lubrication?.value?.length > ( parseFloat(keysId) + 1)){
            router.push(`/study-lubrications/new/${id}/${name}?tb=${(parseFloat(keysId) + 1)}`) 
        }else{
            handleFormSubmit()        
        }
    }
    // enviar datos al servidor
    const handleFormSubmit = () => {
    alert('Se ha guardado correctamente')
    
    }

    return (
        <div className="px-5 bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-8 bg-white">
                        {/* migaja de pan (backdrum) */}
                        <h3 className='font-bold mb-6'>
                            Home / Servicios / 
                            <span className='font-normal ml-2'>
                                {lubrication?.value && Array.isArray(lubrication.value) && lubrication.value.length > 0 
                                    ?( lubrication.value[keysId]?.name || lubrication.value[keysId]?.titulo )
                                    : 'Cargando...'}
                            </span>
                        </h3>
                        {/* Descripción del cuestionario */}
                        <h3 className='font-bold text-xl mb-6'>{lubrication?.value && Array.isArray(lubrication.value) && lubrication.value.length > 0 
                                    ? lubrication.value[keysId]?.descripcion || lubrication.value[keysId]?.descripcion 
                                    : 'Cargando...'} 
                        </h3>
                       <form onSubmit={handleTabsFormSubmit}>
                        {/* titulo de el contenido  */}
                        {lubrication?.value ? 
                            <div  className="w-full flex justify-between pe-[6.5rem]">
                                <p>Preguntas</p>
                                <p>Calificación</p>
                            </div> 
                        : null }
                        {/* recorrer el contenido que viene en array */}
                        { lubrication?.value && 
                          Array.isArray(lubrication.value) && 
                          lubrication.value.length > 0 && 
                          lubrication.value[keysId]?.preguntas &&
                          Object.entries(lubrication.value[keysId].preguntas).map((items, key) => (
                            <div className="mb-3" key={key}>
                               
                                    <div className='bg-gray-100 mt-2 p-5 flex items-center rounded-[10px] font-bold flex relative hover:bg-gray-200'>
                                    <span className={`absolute right-0 top-0 text-xs${(items[1].Obligatorio) ? ' text-red-300 bg-red-100 ' : null }  px-3 py-1 rounded-md`}>{(items[1].Obligatorio) ? 'Obligatorio' : null} </span>
                                        <span className="font-normal w-[80%]">{items[1].titulo}  </span>
                                        
                                        <select className="w-1/6 absolute right-10 font-normal rounded-full text-sm border-gray-300" 
                                         defaultValue={items[1].campo || ''}
                                         onChange={(e) => {
                                             items[1].campo = e.target.value;
                                             //actualizar el estado:
                                             setLubrication(prev => ({...prev}));
                                         }}
                                         required={items[1].Obligatorio}
                                        >
                                            {/* opción por defecto... */}
                                            <option value={''}> Selecciona</option> 
                                            {/* recorriendo las demas opciones que trae del formulario... */}
                                            {(() => {
                                                const options = [];
                                                for (let i = 1; i <= items[1].calificacion; i++) {
                                                    options.push(
                                                        <option key={i} value={i}>
                                                            {i}
                                                        </option>
                                                    );
                                                }
                                                return options;
                                            })()}
                                        </select>
                                    </div>
                            </div>
                          ))
                        }
                        <div className="relative mt-[10%]">
                        <button className="bg-blue-800 px-4 py-2 mt-[50px] text-white font-bold text-sm rounded-full absolute bottom-0 right-0">{(parseFloat(keysId + 1) < lubrication?.value?.length ) ? ' Siguiente ' : 'Enviar estudio de lubricación' }</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewstudylubriPage
