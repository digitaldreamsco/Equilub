import axios from "@/lib/axios";
import React, {useEffect, useState} from "react";

export const useProperty = () =>{
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getUser = async ({ setErrors, ...props }) => {

        setErrors([])

        await 
        axios
            .get('/getUsers', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const getPermissionUser = async ({ setErrors, ...props }) => {

        setErrors([])

        await 
        axios
            .get('/getUsers', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const saveNewProperty = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/saveProperty', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const updateUser = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .put('/updateUser', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    // useEffect( () => {
    //     const error = ([])
    //     getUser(setErrors)
    // },[])

    return {
        getUser,
        saveNewProperty,
        updateUser
    }
}


