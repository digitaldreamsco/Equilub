import axios from "@/lib/axios";
import React, {useEffect, useState} from "react";
import { Toast } from '@/lib/sweetalert'

export const useClient = () =>{
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getClient = async ({setClient,  ...props}) => {
         // envior solicitud al servidor
         await
         axios
         .get('/api/clients/dropdown')
         .then((response) => { 
            setClient(response.data.data)

         })
         .catch(error => {
             // Verificar si error.response está definido
             
             // Si error.response está definido, manejar los errores
             if (error.response) {
                if(error.response.status === 200) Toast.fire({
                    icon: 'error',
                    title: error.response,
                  })
                 
             } else {
                if(error.response.status === 200) Toast.fire({
                    icon: 'error',
                    title: 'Uppss.. hubo un error al guardar'+error,
                  })
             }
         })
      }

      const getMachineId = async ({setMaquinas,  ...props}) => {
        // envior solicitud al servidor
        await
        axios
        .get(`/api/machines/details/${props.id}`)
        .then((response) => { 
           setMaquinas(response.data.data)

        })
        .catch(error => {
            // Verificar si error.response está definido
            
            // Si error.response está definido, manejar los errores
            if (error.response) {
               if(error.response.status === 200) Toast.fire({
                   icon: 'error',
                   title: error.response,
                 })
                
            } else {
               if(error.response.status === 200) Toast.fire({
                   icon: 'error',
                   title: 'Uppss.. hubo un error al guardar'+error,
                 })
            }
        })
     }

    const saveNewClient = async ({ setClient, ...props }) => {
        await csrf()
        
        await
        axios
            .post('/api/clients/save', props)
            .then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Se Guardo Correctamente',
                  })
            })
            .catch(error => {
             // Si error.response está definido, manejar los errores
             if (error.response) {
                if(error.response.status === 200) Toast.fire({
                    icon: 'error',
                    title: error.response,
                  })
                 
             } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Uppss.. hubo un error al guardar'+error,
                  })
             }
            })
    }

    const saveUpdateMachine = async ({  setTmpMaquinas, ...props }) => {
        await csrf()

        
        await
        axios
            .put(`/api/machines/${props.id}`, props)
            .then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Se Guardo Correctamente',
                  })
            })
            .catch(error => {
                
             // Si error.response está definido, manejar los errores
             if (error.response) {
                if(error.response.status === 200) Toast.fire({
                    icon: 'error',
                    title: error.response,
                  })
                 
             } else {
                if(error.response.status === 200) Toast.fire({
                    icon: 'error',
                    title: 'Uppss.. hubo un error al guardar'+error,
                  })
             }
            })
    }


    // useEffect( () => {
    //     const error = ([])
    //     getUser(setErrors)
    // },[])

    return {
        getClient,
        getMachineId,
        saveNewClient,
        saveUpdateMachine,
    }
}


