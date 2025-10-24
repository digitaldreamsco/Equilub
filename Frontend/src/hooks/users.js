import axios from "@/lib/axios";
import React, {useEffect, useState} from "react";
import { Toast } from "@/lib/sweetalert";
export const useUsers = () =>{
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getUser = async ({  ...props }) => {

        await 
        axios
            .get('/getUsers', props)
            .then(() => mutate())
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

// usuarios con roles
    const getUsersWithRoles = async ({ setData,  ...props }) => {
       
        await
        axios
            .get('/api/users-with-roles')
            .then( (response) => console.log(setData(response.data.data)) ) 
            .catch (error => {
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


    const getPermissionUser = async ({ setPermission, ...props }) => {

        await 
        axios
            .get(`/api/users/permission/${props.roles}`, props)
            .then((response) => {
                setPermission(response.data.data)
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

    const saveUserNew = async ({  ...props }) => {
        await csrf()

        axios
            .post('/saveUser', props)
            .then(() => mutate())
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

    const updateUser = async ({  ...props }) => {
        await csrf()

        axios
            .put('/updateUser', props)
            .then(() => mutate())
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

    // useEffect( () => {
    //     getUser()
    // },[])

    return {
        getUser,
        getUsersWithRoles,
        saveUserNew,
        getPermissionUser,
        updateUser
    }
}


