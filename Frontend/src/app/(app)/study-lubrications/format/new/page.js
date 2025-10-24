'use client'
import { useFormatt }  from '@/hooks/Formatt'
import { faArrowDown, faArrowUp, faArrowUp91, faEye, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useState } from 'react'
import DialogFormatt from '@/components/Dialog'
import { generateCalificationOptions } from '../../../../../utils/helpers'



function FormularioDinamico() {
  const [nameformato, setNameFormato] = useState('')
  const [secciones, setSecciones] = useState([])
  const [errors, setErrors] = useState([])
  const [data, setData] = useState(null)
  const [ModalView, setModalview] = useState(false)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0); // Estado para controlar la sección activa, inicializado en 0

  const agregarSeccion = () => {
    setSecciones([...secciones, { titulo: '', descripcion: '', preguntas: [] }])
  }

  const actualizarSeccion = (seccionIndex, campo, valor) => {
    const nuevasSecciones = [...secciones]
    nuevasSecciones[seccionIndex][campo] = valor
    setSecciones(nuevasSecciones)
  }

  const quitarSeccion = (index) => {
    const nuevasSecciones = secciones.filter((_, i) => i !== index)
    setSecciones(nuevasSecciones)
  }

  const moverSeccion = (index, direccion) => {
    if ((direccion === -1 && index > 0) || (direccion === 1 && index < secciones.length - 1)) {
      const nuevasSecciones = [...secciones]
      const temp = nuevasSecciones[index]
      nuevasSecciones[index] = nuevasSecciones[index + direccion]
      nuevasSecciones[index + direccion] = temp
      setSecciones(nuevasSecciones)
    }
  }

  const agregarPregunta = (seccionIndex) => {
    const nuevasSecciones = [...secciones]
    nuevasSecciones[seccionIndex].preguntas.push({ titulo: '', peso: 0, calificacion: 0, Obligatorio: false })
    setSecciones(nuevasSecciones)
  }

  const actualizarPregunta = (seccionIndex, preguntaIndex, campo, valor) => {
    const nuevasSecciones = [...secciones]
    nuevasSecciones[seccionIndex].preguntas[preguntaIndex][campo] = valor
    setSecciones(nuevasSecciones)
  }

  const eliminarPregunta = (seccionIndex, preguntaIndex) => {
    const nuevasSecciones = [...secciones]
    nuevasSecciones[seccionIndex].preguntas.splice(preguntaIndex, 1)
    setSecciones(nuevasSecciones)
  }

  const moverPregunta = (seccionIndex, preguntaIndex, direccion) => {
    const nuevasSecciones = [...secciones]
    const preguntas = nuevasSecciones[seccionIndex].preguntas
    if ((direccion === -1 && preguntaIndex > 0) || (direccion === 1 && preguntaIndex < preguntas.length - 1)) {
      const temp = preguntas[preguntaIndex]
      preguntas[preguntaIndex] = preguntas[preguntaIndex + direccion]
      preguntas[preguntaIndex + direccion] = temp
      setSecciones(nuevasSecciones)
    }
  }

  const showFormatt = () => {

  }

  const { saveNewSeccion } = useFormatt()

  // no, ya esta listo para que mandes a guardar
  const handleGuardar = (nuevaSeccion) => {
    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getFullYear()}${fechaActual.getMonth() + 1}${fechaActual.getHours()}${fechaActual.getSeconds()}`;
    // esto es lo que vas a mandar a guardar en la tabla de FORMATO en el VALUE preguntas
     saveNewSeccion({
      'codigo_id': fechaFormateada,
      'name':nameformato,
      'value': JSON.stringify(secciones),
      'tipo': 'A4',
      'config': JSON.stringify({'stated': 'visibility'}),
    })
  
  }
  

  return (
    <div className="py-5 px-5 bg-gray-100">
      <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
        <div className="overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-8 bg-white">
            <div className='mb-[5px] space-x-4'>
            <h2 className="text-2xl font-bold mb-6">Formato de Lubricación</h2>
            <button 
                  onClick={agregarSeccion}
                  className="float-right right-0 -mt-12 bg-blue-900 hover:bg-blue-800 text-xs text-white font-bold py-2 px-4 rounded-full mb-6 px-5"
                >
                  Nueva Sección
                </button>
                { (secciones.length > 0) ? (
                <button 
                onClick={() => setModalview(true)}
                  className="float-right right-0 -mt-12 bg-blue-500 hover:bg-blue-800 text-xs text-white font-bold py-2 px-4 rounded-full mb-6 px-5"
                >
                  <FontAwesomeIcon  icon={faEye}></FontAwesomeIcon> Vista Previa
                </button>
                ):null}
            </div>
            <div className='mb-[55px] space-x-4'>
                <input className='text-sm rounded-full border  w-full' type='text' placeholder='ingrese el nombre del formato...' value={nameformato} onChange={(e)=> setNameFormato(e.target.value)} />
                {nameformato}
                
            </div>
            { (secciones.length <= 0) ? (
            <div className='w-full h-full flex justify-center items-center'>
              <div className='text-center center'>
                <div className='w-full flex justify-center'>
                    <Image src={'/imagen/reloj.png'} width={80} height={80} />
                </div>
                      
                      <p className="text-sm text-gray-600 mb-4 mt-4">
                          Al agregar una nueva sección, los datos se reflejarán aquí <br></br> para que puedas editarlos y organizarlos fácilmente.
                      </p>
              </div>
                
            </div>
            ) : (
              <>
            {secciones.map((seccion, seccionIndex) => (
              <div key={seccionIndex} className="mb-6 p-4 border border-gray-300 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold">Sección {seccionIndex + 1}</h3>
                  <div>
                    <button 
                      onClick={() => moverSeccion(seccionIndex, -1)}
                      className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-full mr-1"
                    >
                      <FontAwesomeIcon className='text-xs' icon={faArrowUp} />
                    </button>
                    <button 
                      onClick={() => moverSeccion(seccionIndex, 1)}
                      className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-full mr-1"
                    >
                      <FontAwesomeIcon className='text-xs' icon={faArrowDown} />
                    </button>
                    <button 
                      onClick={() => quitarSeccion(seccionIndex)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full"
                    >
                      <FontAwesomeIcon className='text-xs' icon={faTimes} />
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Título de la sección"
                  value={seccion.titulo}
                  onChange={(e) => actualizarSeccion(seccionIndex, 'titulo', e.target.value)}
                  className="w-full p-2 text-sm mb-2 border border-gray-300 rounded-full"
                />
                <textarea
                  placeholder="Descripción de la sección"
                  value={seccion.descripcion}
                  onChange={(e) => actualizarSeccion(seccionIndex, 'descripcion', e.target.value)}
                  className="w-full p-2 mb-2 text-sm border border-gray-300 rounded-md"
                />
                <button 
                  onClick={() => agregarPregunta(seccionIndex)}
                  className="bg-blue-800 hover:bg-blue-780 text-white font-bold py-1 px-2 rounded-full px-5 text-sm mb-2"
                >
                  Nueva Pregunta
                </button>
                {seccion.preguntas.map((pregunta, preguntaIndex) => (
                  <div key={preguntaIndex} className="mb-2 p-2 space-x-3 border border-gray-200 rounded flex">
                    <div className='w-1/4'>
                    <h3>Título de la pregunta</h3>
                      <input
                        type="text"
                        placeholder=""
                        value={pregunta.titulo}
                        onChange={(e) => actualizarPregunta(seccionIndex, preguntaIndex, 'titulo', e.target.value)}
                        className="w-full p-2 mb-1 text-sm border border-gray-300 rounded-full mr-2"
                      />
                    </div>
                    <div className='w-1/4'>
                    <h3>Peso</h3>
                      <input
                        type="number"
                        placeholder="Peso"
                        value={pregunta.peso}
                        onChange={(e) => actualizarPregunta(seccionIndex, preguntaIndex, 'peso', parseInt(e.target.value))}
                        className="w-full p-2 mb-1 border text-sm border-gray-300 rounded-full mr-2"
                      />
                    </div>
                    <div className='w-1/4'>
                    <h3>Calificación Max</h3>
                      <input
                        type="number"
                        placeholder="Calificación"
                        value={pregunta.calificacion}
                        onChange={(e) => actualizarPregunta(seccionIndex, preguntaIndex, 'calificacion', parseInt(e.target.value))}
                        className="w-full p-2 mb-1 border text-sm border-gray-300 rounded-full"
                      />
                    </div>
                    
                    
                    
                    <div className='w-1/8 '> 
                    <h3>Titulo</h3>
                    <div className='flex items-center spaca-x-3 mt-2'>
                        <input
                          type="checkbox"
                          placeholder="Obligatorio"
                          checked={pregunta.Obligatorio}
                          onChange={(e) => actualizarPregunta(seccionIndex, preguntaIndex, 'Obligatorio', e.target.checked)}
                          className="w-1/7 p-2 mb-1 border text-sm border-gray-300 rounded-full"
                        />
                        <p className='ml-2 text-sm font-bold'>Obligatorio</p>
                    </div>
                    
                    
                    </div>
                    <div className="ml-5 flex items-center mt-4">
                      
                      <button 
                        onClick={() => moverPregunta(seccionIndex, preguntaIndex, -1)}
                        className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded-full mr-1"
                      >
                        <FontAwesomeIcon className='text-xs' icon={faArrowUp} />
                      </button>
                      <button 
                        onClick={() => moverPregunta(seccionIndex, preguntaIndex, 1)}
                        className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded-full mr-1"
                      >
                        <FontAwesomeIcon className='text-xs' icon={faArrowDown} />
                      </button>
                      <button 
                        onClick={() => eliminarPregunta(seccionIndex, preguntaIndex)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full mr-1"
                      >
                        <FontAwesomeIcon className='text-xs' icon={faTimes} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {/* Botón de guardado agregado */}
            <div className='flex justify-center items-center'>
                <button 
                      onClick={() => handleGuardar(secciones)} // Llama a la función de guardar
                      className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 text-xs"
                    >
                      Guardar Formato
                </button>
            </div>
            </>
            )
          }
          </div>
        </div>
      </div>
      <DialogFormatt showModal={ModalView} hideModals={setModalview} widthModal={'auto'}>
                <div className="flex justify-center space-x-3 w-[1440px]">
                    <div className="w-[30%] bg-gray-100/[0.4] px-4 py-8 text-start rounded-md">
                        <h3 className="text-xl font-bold mb-3">Secciones</h3>
                        {secciones.map((seccion, seccionIndex) => (
                           // Alterna la sección activa
                          <div key={seccionIndex} onClick={() => setActiveSectionIndex(activeSectionIndex === seccionIndex ? null : seccionIndex)} className="mb-6 p-4 border bg-blue-100 rounded-md">
                            <h3 className="text-sm font-semibold">Sección {seccionIndex + 1}: {seccion.titulo}</h3>
                            
                            {/* Aquí puedes agregar botones para mover o quitar secciones si es necesario */}
                          </div>
                        ))}
                    </div>
                    <div className='w-[70%] py-8'>
                        {secciones.map((seccion, seccionIndex) => (
                          // Mostrar preguntas solo si la sección está activa
                          activeSectionIndex === seccionIndex && (
                            <>
                            <h3 className="text-xl font-bold mb-3">{seccion.titulo}</h3>
                            <p className='mb-3 text-sm'>{seccion.descripcion}</p>
                            <div key={seccionIndex} className="mt-2">
                              {seccion.preguntas.map((pregunta, preguntaIndex) => (
                                <div key={preguntaIndex} className="mb-2 p-2 flex">
                                  <div className='w-[60%]'>
                                      <h4 className="font-semibold">{pregunta.titulo}</h4>
                                  </div>
                                  <div className='w-[20%]'>
                                  <h3 className="text-sm font-bold mb-3">Peso</h3>
                                      <input type='number' className='w-full p-2 mb-1 border text-sm border-gray-300 rounded-full' ></input>
                                  </div>
                                  <div className='w-[20%]'>
                                  <h3 className="text-sm font-bold mb-3">Calificación</h3>
                                      <select className="w-full p-2 mb-1 border text-sm border-gray-300 rounded-full">
                                          {generateCalificationOptions(pregunta.calificacion).map((calificacion) => (
                                              <option key={calificacion} value={calificacion}>
                                                  {calificacion}
                                              </option>
                                          ))}
                                      </select>
                                  </div>
                                  
                                  
                                  {/* Aquí puedes agregar más detalles de la pregunta si es necesario */}
                                </div>
                              ))}
                            </div>
                            </>
                          )
                        ))}
                    </div>
                </div>
                <div className="flex justify-center space-x-3">
                    {/* <button className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={ '' }>Eliminar</button> */}
                    <button className="px-5 py-2 rounded-md border border-gray-500 hover:bg-gray-500" onClick={ ()=>setModalview(false) }>Cerrar Vista Previa</button>
                </div>
        </DialogFormatt>
    </div>
    
  );
}

export default FormularioDinamico;
