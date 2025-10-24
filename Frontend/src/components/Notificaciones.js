import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Notificacion = ({ avatar, contenido, tiempo, icono, leida, onMarcarLeida }) => (
  <div className={`flex items-center p-2 hover:bg-gray-100 ${leida ? 'opacity-50' : ''}`}>
    <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
    <div className="flex-grow">
      <p className="text-sm">{contenido}</p>
      <p className="text-xs text-gray-500">{tiempo}</p>
    </div>
    {icono && <span className="text-blue-500 ml-2">{icono}</span>}
    {!leida && (
      <button 
        onClick={onMarcarLeida} 
        className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded"
      >
        Marcar como leída
      </button>
    )}
  </div>
);

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const notificacionesRef = useRef(null);

  // useEffect(() => {
  //   cargarNotificaciones();
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  const handleClickOutside = (event) => {
    if (notificacionesRef.current && !notificacionesRef.current.contains(event.target)) {
      setMostrarNotificaciones(false);
    }
  };

  const cargarNotificaciones = async () => {
    try {
      // Reemplaza esta URL con tu endpoint real
      const response = await axios.get('https://api.ejemplo.com/notificaciones');
      setNotificaciones(response.data);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  };

  const marcarComoLeida = async (id) => {
    try {
      // Reemplaza esta URL con tu endpoint real
      await axios.post(`https://api.ejemplo.com/notificaciones/${id}/leer`);
      setNotificaciones(notificaciones.map(notif => 
        notif.id === id ? {...notif, leida: true} : notif
      ));
    } catch (error) {
      console.error('Error al marcar como leída:', error);
    }
  };

  const notificacionesFiltradas = notificaciones.filter(notif => 
    filtro === 'todas' || (filtro === 'no_leidas' && !notif.leida)
  );

  const toggleNotificaciones = () => {
    setMostrarNotificaciones(!mostrarNotificaciones);
  };

  return (
    <div className="relative" ref={notificacionesRef}>
      <svg onClick={toggleNotificaciones} xmlns="http://www.w3.org/2000/svg" height={'19'} width={'20'} className='mr-3 cursor-pointer fill-blue-900' viewBox="0 0 448 512">
                        <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/>
    </svg>
      {mostrarNotificaciones && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold">Notificaciones</h2>
            <button className="text-gray-500">...</button>
          </div>
          <div className="flex space-x-2 p-2 border-b">
            <button 
              onClick={() => setFiltro('todas')}
              className={`px-3 py-1 rounded-full text-sm ${filtro === 'todas' ? 'bg-yellow-500 text-white' : 'text-gray-700'}`}
            >
              Todas
            </button>
            <button 
              onClick={() => setFiltro('no_leidas')}
              className={`px-3 py-1 rounded-full text-sm ${filtro === 'no_leidas' ? 'bg-yellow-500 text-white' : 'text-gray-700'}`}
            >
              No leídas
            </button>
          </div>
          <div className="p-2 border-b">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Anteriores</span>
              <a href="#" className="text-yellow-500 text-sm">Ver todo</a>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notificacionesFiltradas.map((notif) => (
              <Notificacion 
                key={notif.id} 
                {...notif} 
                onMarcarLeida={() => marcarComoLeida(notif.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notificaciones;
