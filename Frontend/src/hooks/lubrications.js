
import axios from "@/lib/axios";
import React, {useEffect, useState} from "react";
import { Toast } from "@/lib/sweetalert";
export const useLubrications = () =>{
    const csrf = () => axios.get('/sanctum/csrf-cookie')
    const getLubricationsId = async ({setLubrication,  ...props}) => {
        
        // envior solicitud al servidor
       await axios
        .get(`/api/operate/study/${props.id}`)
        .then((response) => { 
            setLubrication(response.data.data)
        })
        .catch(error => {
            // Si error.response está definido, manejar los errores
            if (error.response) {
               if(error.status === 500) Toast.fire({
                   icon: 'error',
                   title: error.response,
                 })
                
            } else {
               Toast.fire({
                   icon: 'error',
                   title: 'Uppss.. hubo un error, Error'+ error,
                 })
            } 
        })
     }

    const getServicesAllCalendar = async ({setTareas, setSevices,  ...props}) => {
        
         // envior solicitud al servidor
         axios
         .get('/api/services')
         .then((response) => { 
           setSevices(response.data.data)
        // Recorrer response.data.data con map
        const tareas = response.data.data.map(item => {
            return {
                title: item.name, // Asegúrate de que 'titulo' sea una propiedad válida
                start: item.date, // Asegúrate de que 'startStr' sea una propiedad válida
                end: item.date, // Asegúrate de que 'endStr' sea una propiedad válida
                extendedProps: {
                    trabajador: item.trabajador || 'Sin trabajador asignado'// Asegúrate de que 'trabajador' sea una propiedad válida
                },
                color: (new Date(item.date) < new Date() && item.state === 2) ? '#FF3131' : (new Date(item.date) < new Date() && item.state === 1) ? '#FF3131':(new Date(item.date) < new Date() && item.state === 3) ? '#aeaeae':null,
            }
        })
        setTareas(tareas)
         })
         .catch(error => {
             // Si error.response está definido, manejar los errores
             if (error) {
                if(error.status === 500) Toast.fire({
                    icon: 'error',
                    title: error.message,
                  })
                 
             } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Uppss.. hubo un error, Error'+ error.message,
                  })
             } 
         })
      }

      const getSearchServices = async ({setTareas, setSevices,  ...props}) => {
        
        // envior solicitud al servidor
        axios
        .get(`/api/services/search?search=${props.query}`)
        .then((response) => { 
          setSevices(response.data.data)
       // Recorrer response.data.data con map
       const tareas = response.data.data.map(item => {
           return {
               title: item.name, // Asegúrate de que 'titulo' sea una propiedad válida
               start: item.date, // Asegúrate de que 'startStr' sea una propiedad válida
               end: item.date, // Asegúrate de que 'endStr' sea una propiedad válida
               extendedProps: {
                   trabajador: item.user.name || 'Sin trabajador asignado'// Asegúrate de que 'trabajador' sea una propiedad válida
               },
               color: (new Date(item.date) < new Date() && item.state === 2) ? '#FF3131':(new Date(item.date) < new Date() && item.state === 1) ? '#FF3131':(new Date(item.date) < new Date() && item.state === 3) ? '#aeaeae':null,
           }
       })
       setTareas(tareas)
        })
        .catch(error => {
            // Si error.response está definido, manejar los errores
            if (error) {
               if(error.status === 500) Toast.fire({
                   icon: 'error',
                   title: error.message,
                 })
                
            } else {
               Toast.fire({
                   icon: 'error',
                   title: 'Uppss.. hubo un error, Error'+ error.message,
                 })
            } 
        })
     }
    const saveNewServices = async ({  ...props }) => {
        await csrf()
        axios
            .post('/api/service', props)
            .then((response) => {
                
                if(response.status === 201 || response.status === 200 ) Toast.fire({
                    icon: 'success',
                    title: 'Se ha Guardado correctamente...',
                  })
                 
            })
            .catch(error => {
                // Si error.response está definido, manejar los errores
             if (error) {
                if(error.status === 500) Toast.fire({
                    icon: 'error',
                    title: error.message,
                  })
                 
             } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Uppss.. hubo un error, Error'+ error.message,
                  })
             }
            })
    }

    const updateUser = async ({ ...props }) => {
        await csrf()

        axios
            .put(`/api/services/${props.id}`, props)
            .then((response) => {
                if(response.status === 200) Toast.fire({
                    icon: 'success',
                    title: 'Se ha Guardado correctamente...',
                  })
            })
            .catch(error => {
              

                // Si error.response está definido, manejar los errores
             if (error) {
                if(error.status === 500){Toast.fire({
                    icon: 'error',
                    title: error.message,
                  })
                }else{
                    console.log(error)
                    Toast.fire({
                        icon: 'error',
                        title: 'Uppss.. hubo un error. Error: '+error.message,
                      })
                }
                 
             } else {
                 Toast.fire({
                    icon: 'error',
                    title: 'Uppss.. hubo un error. Error: '+error.message,
                  })
             }
            })
    }

    const getServicesForUser = async ({setServicios, ...props}) => {
        try {
            await axios
          .get(`/api/service/${props.id}/listView`)
          .then((response) =>{
            const data = response.data.data
            console.log('probando:'+response.data)
            setServicios({
              actuales: data.services_act || [],
              proximos: data.services_next || [],
            });
           
          }) // Ajusta el endpoint según tu API
          
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Uppss.. hubo un error. Error: '+error.message,
              })
        }
      };

    // useEffect( () => {
    //     const error = ([])
    //     getUser(setErrors)
    // },[])

    return {
        getSearchServices,
        getServicesAllCalendar,
        saveNewServices,
        getLubricationsId,
        updateUser,
        getServicesForUser
    }
}


