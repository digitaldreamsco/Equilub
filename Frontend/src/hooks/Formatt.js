import axios from "@/lib/axios"
import { useState } from "react"
import { Toast } from "@/lib/sweetalert"
export const useFormatt = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const formmatDate = async ({setDataFormatt, ...props}) =>{
    
    await
    axios
    .get('/api/getFormatt')
    .then((response) => {
      setDataFormatt(response.data.data)
    })
    .catch((error)=>{
      if (error.response) {
        if(response.status === 200) Toast.fire({
            icon: 'error',
            title: error.response,
          })
         
     } else {
        if(response.status === 200) Toast.fire({
            icon: 'error',
            title: 'Uppss.. hubo un error al guardar',
          })
     }
    })

  }



  const getSecciones = async (...props) => {

    try {
      const response = await axios.get('/api/getSecciones', props)
      return response.data // Devuelve los datos obtenidos
    } catch (error) {
      if (error.response) {
        if(response.status === 200) Toast.fire({
            icon: 'error',
            title: error.response,
          })
         
     } else {
        if(response.status === 200) Toast.fire({
            icon: 'error',
            title: 'Uppss.. hubo un error al guardar',
          })
     }
    }
  }

  const saveNewSeccion = async ({ ...props}) => {
            // obteniendo el token de laravel 
         await csrf()
         // variable de datos o respuesta
        //  setData(null)
         // variable de mensaje de satisfacción
        //  setModalMsj(false)
         axios
             .post('/api/formatoestudio', props)
             .then((response) => {
                 // pasando respueta a la variable global de la función
                Toast.fire({
                  icon: 'success',
                  title: 'Se ha Guardado correctamente...'
                })
             })
             .catch(error => {
                 
                 // Si error.response está definido, manejar los errores
             if (error.response) {
              if(response.status === 200) Toast.fire({
                  icon: 'error',
                  title: error.response,
                })
               
           } else {
              if(response.status === 200) Toast.fire({
                  icon: 'error',
                  title: 'Uppss.. hubo un error al guardar',
                })
           }
             })
  }

  const updateSeccion = async (props) => {
    await csrf()
    axios
    .put('/api/updateSeccion', props)
    .then((response) => {
      Toast.fire({
        icon: 'success',
        title: 'Se ha Guardado correctamente...'
      })
    })
      // Aquí puedes agregar lógica para mutar o actualizar el estado si es necesario
    .catch (error =>{
      if (error.response) {
        if(response.status === 200) Toast.fire({
            icon: 'error',
            title: error.response,
          })
         
     } else {
        if(response.status === 200) Toast.fire({
            icon: 'error',
            title: 'Uppss.. hubo un error al guardar',
          })
     }
    })
  }

  return {
    formmatDate,
    getSecciones,
    saveNewSeccion,
    updateSeccion,
  }
}

export default useFormatt