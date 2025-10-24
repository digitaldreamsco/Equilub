import axios from "@/lib/axios";
import React, {useEffect, useState} from "react";
import { Toast } from '@/lib/sweetalert'

export const useTypeOfIdentity = () =>{
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getAllTypeOfIdentity = async ({setTypeOfIdentity,  ...props}) => {
         // envior solicitud al servidor
         await
         axios
         .get('/api/typeOfIdentity/')
         .then((response) => { 
            setTypeOfIdentity(response.data.data)

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

      const getActiveTypeOfIdentity = async ({setTypeOfIdentitys,  ...props}) => {
        // envior solicitud al servidor
        await
        axios
        .get('/api/typeOfIdentity/all/active')
        .then((response) => { 
            setTypeOfIdentitys(response.data.data)

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
               Toast.fire({
                   icon: 'error',
                   title: 'Uppss.. hubo un error al guardar'+error,
                 })
            }
        })
     }

    const saveNewClient = async ({  setTmpMaquinas, ...props }) => {
        await csrf()

        
        await
        axios
            .post('/api/machines', props)
            .then((response) => {
                setTmpMaquinas(response.data.data)
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
        getAllTypeOfIdentity,
        getActiveTypeOfIdentity,
        saveNewClient,
        saveUpdateMachine,
    }
}


