'use client'
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import {useServices} from '@/hooks/services'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import allLocales from '@fullcalendar/core/locales-all';
import Input from '@/components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChevronLeft, faChevronRight, faEllipsisVertical, faListAlt, faPencilAlt, faSearch, faTractor, faTrash, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';


const Calendario = () => {
  const [search, setSearch] = useState('');
  const [tareas, setTareas] = useState([]);
  const [services, setSevices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;

  const getServicesAll = () => {
    const { getServicesAllCalendar } = useServices()
    getServicesAllCalendar({
      setTareas,
      setSevices,
    })
  }

  const getSearchService = () => {
    if(search){
      const { getSearchServices } = useServices()
    getSearchServices({
      setTareas,
      setSevices,
      query: search, 
    })
    }else{
      getServicesAll()
    }
    
  }

  const openMain = (services_id) => {
    let servc = document.getElementsByClassName('services-r-' + services_id);
    if (servc.length > 0) { // Verifica que se haya encontrado al menos un elemento
        servc[0].classList.toggle('hidden'); // Accede al primer elemento
    } else {
        console.error('Elemento no encontrado: services-r-' + services_id);
    }
};

// cargar maquinas
useEffect(() => {
  getServicesAll();
}, []);

  const indexOfLastService = currentPage * recordsPerPage;
  const indexOfFirstService = indexOfLastService - recordsPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  return (
    <div className='p-10'>
      <div className='p-5 w-full h-full bg-white rounded-lg'>
        <div className='flex relative mb-12'>
          <div>
        <h3 className='font-bold mb-6'>Home / Usuarios / <span className='font-normal'>Servicios</span></h3>
          <h3 className="font-bold text-xl">Listado de Servicios</h3>
          </div>
            <input className="rounded-full text-sm w-[25em] pr-10 absolute end-0 top-12" type="search" value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => {if(event.key === 'Enter') getSearchService()}}  placeholder="Buscar Servicios por: ref, nombre, fecha..." />
            <button className='absolute rounded-full end-0 top-12 py-2 px-4 hover:bg-gray-500 ' onClick={()=>getSearchService()}><FontAwesomeIcon icon={faSearch}/></button>
        </div>
      
        <div className='flex '>
        <div className='w-[45%] px-5 py-2'>
          {/* listado de los servicios */}
          {
            (currentServices.length > 0) ? (
              currentServices.map(service => (
                <div className={`p-5 relative rounded-[12px] bg-${(new Date(service.date) < new Date() && service.state === 2) ? 'red-200' : (new Date(service.date) < new Date() && service.state === 1) ? 'red-200' : (service.state === 3) ? 'gray-200' : (service.state === 1) ? 'green-200' :  'yellow-200/[0.4]'} mb-2 w-full`}>
                  <h3 className='font-bold text-lg capitalize'>{service.name} </h3>
                  <p className='text-sm mb-2 text-gray-700'><FontAwesomeIcon className={`text-${(new Date(service.date) < new Date() && service.state === 2) ? 'red-500' :(new Date(service.date) < new Date() && service.state === 1) ? 'red-500' :(service.state === 3) ? 'gray-500' : (service.state === 1) ? 'green-500' : 'orange-500' } `} icon={faUserAlt} /> {service.user.name}{(service.user.lastname)?service.user.lastname:null}  - <FontAwesomeIcon className={`text-${(new Date(service.date) < new Date() && service.state === 2) ? 'red-500' :(new Date(service.date) < new Date() && service.state === 1) ? 'red-500' :(service.state === 3) ? 'gray-500' : (service.state === 1) ? 'green-500' : 'orange-500' } `} icon={faCalendar} /> {service.date}</p>
                  <div className={`text-sm text-white px-5 w-auto py-1 bg-${(new Date(service.date) < new Date() && service.state === 2) ? 'red-500' :(new Date(service.date) < new Date() && service.state === 1) ? 'red-500' :(service.state === 3) ? 'gray-500' : (service.state === 1) ? 'green-500' : 'orange-400'} rounded-full relative`}>
                    <FontAwesomeIcon className='text-white mr-2' icon={faTractor} /> <strong>Maquina:</strong>  {service.machine.name}
                    <div className='absolute top-1 end-10 w-[80px]'>Estado: {service.machine.state}</div>
                  </div>
                  <div onClick={()=>openMain(service.id)} className='absolute top-4 end-8 cursor-pointer hover:bg-white px-4 py-2 rounded-full'  >
                    <FontAwesomeIcon className={`text-${(new Date(service.date) < new Date() && service.state === 2) ? 'red-400' :(new Date(service.date) < new Date() && service.state === 1) ? 'red-400' :(service.state === 3) ? 'gray-400' : (service.state === 1) ? 'green-400' : 'orange-400'}`} icon={faEllipsisVertical}/>
                  </div>
                  <div  className={`services-r-${service.id} hidden absolute inline-grid z-50 w-[8rem] w-auto top-6 end-[4.5rem] bg-white shadown-lg`}>
                        <Link href={`/service/details/${service.id}/${service.name}`} className='w-full px-4 py-2  hover:bg-blue-800 hover:text-white space-x-2'><FontAwesomeIcon icon={faPencilAlt} className='text-sm' /> <span>Detalle</span></Link>
                        <Link href={`/service/edit/${service.id}/${service.name}`} className='w-full px-4 py-2  hover:bg-blue-800 hover:text-white space-x-2'><FontAwesomeIcon icon={faListAlt} className='text-sm' /> <span>Editar</span></Link>
                        <a href='#' className='w-full px-4 py-2 hover:bg-red-500 hover:text-white space-x-2'><FontAwesomeIcon icon={faTrash} className='text-sm' /> <span>Eliminar</span></a>
                  </div>
                </div>
                
              ))
            ) : (
              <>
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
              </>
            )
          }
          <div className='flex justify-between w-full items-center'>
            <div className='text-sm'>
              <strong>Pagina:</strong> {currentPage}
            </div>
            <div className='flex justify-end space-x-3 mt-4'>
              <button className={` text-sx rounded-[15px] px-4 py-1 ${(currentPage === 1) ? 'bg-gray-300':'bg-blue-800 text-white'}`} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><FontAwesomeIcon icon={faChevronLeft} /> Anterior</button>
              <button className={`rounded-[15px] px-4 py-1 ${(indexOfLastService >= services.length) ? 'bg-gray-300 text-gray-700 ':'bg-blue-800 text-white'}`} onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastService >= services.length}>Siguiente <FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
          </div>
          
        </div>
        <div className='w-[55%]'>
          {/* calendario de los servicios */}
          <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          locales={allLocales} // o [esLocale] si solo importaste el español
          locale='es'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={tareas.map(tarea =>({
            ...tarea, 
            color: tarea.color || '#ff9300',
          }))}
         
        />
        </div>
        </div>
        
        {/* detalle de cada servicio */}
      </div>
    </div>
  );
};

export default Calendario;
