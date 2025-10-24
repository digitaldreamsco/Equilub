import axios from "@/lib/axios";
import React, {useEffect, useState} from "react";
import { Toast } from '@/lib/sweetalert'

export const useMachine = () =>{
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    // Obtener lista de equipos (con filtros opcionales)
    const getMachine = async ({setMaquinas, equipment_type = null, parent_id = null, show_all = false, ...props}) => {
        try {
            let url = '/api/machines';
            const params = new URLSearchParams();
            
            if (equipment_type) params.append('equipment_type', equipment_type);
            if (parent_id !== null) params.append('parent_id', parent_id);
            if (show_all) params.append('show_all', 'true');
            
            if (params.toString()) {
                url += '?' + params.toString();
            }
            
            const response = await axios.get(url);
            setMaquinas(response.data.data);
        } catch (error) {
            handleError(error, 'Error al obtener equipos');
        }
    }

    // Obtener jerarquía completa de equipos
    const getMachineHierarchy = async ({setMaquinas, ...props}) => {
        try {
            const response = await axios.get('/api/machines/hierarchy');
            setMaquinas(response.data.data);
        } catch (error) {
            handleError(error, 'Error al obtener jerarquía de equipos');
        }
    }

    // Obtener detalles de un equipo específico
    const getMachineId = async ({setMaquinas, ...props}) => {
        try {
            const response = await axios.get(`/api/machines/details/${props.id}`);
            setMaquinas(response.data.data);
        } catch (error) {
            handleError(error, 'Error al obtener detalles del equipo');
        }
    }

    // Obtener descendientes de un equipo
    const getMachineDescendants = async ({setMaquinas, ...props}) => {
        try {
            const response = await axios.get(`/api/machines/${props.id}/descendants`);
            setMaquinas(response.data.data);
        } catch (error) {
            handleError(error, 'Error al obtener descendientes del equipo');
        }
    }

    // Obtener tipos de equipos disponibles
    const getEquipmentTypes = async ({setTypes, ...props}) => {
        try {
            const response = await axios.get('/api/machines/types');
            setTypes(response.data.data);
        } catch (error) {
            handleError(error, 'Error al obtener tipos de equipos');
        }
    }

    // Buscar equipos
    const searchMachines = async ({setMaquinas, query, equipment_type = null, ...props}) => {
        try {
            let url = `/api/machines/search?query=${encodeURIComponent(query)}`;
            if (equipment_type) {
                url += `&equipment_type=${equipment_type}`;
            }
            
            const response = await axios.get(url);
            setMaquinas(response.data.data);
        } catch (error) {
            handleError(error, 'Error al buscar equipos');
        }
    }

    // Crear nuevo equipo
    const saveNewMachine = async ({setTmpMaquinas, setMaquinas, hierarchy_data, ...props}) => {
        await csrf();

        try {
            // Si no hay hierarchy_data.components, crear equipo simple
            if (!hierarchy_data?.components || hierarchy_data.components.length === 0) {
                const response = await axios.post('/api/machines', props);
                if (setTmpMaquinas) setTmpMaquinas(response.data.data);
                
                Toast.fire({
                    icon: 'success',
                    title: 'Equipo creado correctamente',
                });
                
                return response.data.data;
            }

            // Si hay componentes, crear equipo principal primero
            const mainEquipmentData = {
                ...props,
                hierarchy_data: {
                    created_at: new Date().toISOString(),
                    total_components: hierarchy_data.components.length
                }
            };

            const mainResponse = await axios.post('/api/machines', mainEquipmentData);
            const mainEquipment = mainResponse.data.data;

            // Función recursiva para crear componentes con parent_id
            const createComponentsRecursively = async (components, parentId) => {
                for (const component of components) {
                    const componentData = {
                        name: component.name,
                        type: component.type,
                        description: component.description,
                        state: component.state,
                        observation: component.observation,
                        parent_id: parentId,
                        equipment_type: 'component',
                        hierarchy_data: {
                            level: 'component',
                            created_at: new Date().toISOString()
                        }
                    };

                    const componentResponse = await axios.post('/api/machines', componentData);
                    const createdComponent = componentResponse.data.data;

                    // Si el componente tiene sub-componentes, crearlos recursivamente
                    if (component.children && component.children.length > 0) {
                        await createComponentsRecursively(component.children, createdComponent.id);
                    }
                }
            };

            // Crear todos los componentes
            await createComponentsRecursively(hierarchy_data.components, mainEquipment.id);

            if (setTmpMaquinas) setTmpMaquinas(mainEquipment);
            
            Toast.fire({
                icon: 'success',
                title: 'Equipo y componentes creados correctamente',
            });
            
            return mainEquipment;
        } catch (error) {
            handleError(error, 'Error al crear equipo');
            throw error;
        }
    }

    // Actualizar equipo existente
    const saveUpdateMachine = async ({setTmpMaquinas, ...props}) => {
        await csrf();

        try {
            const response = await axios.put(`/api/machines/${props.id}`, props);
            if (setTmpMaquinas) setTmpMaquinas(response.data.data);
            
            Toast.fire({
                icon: 'success',
                title: 'Equipo actualizado correctamente',
            });
            
            return response.data.data;
        } catch (error) {
            handleError(error, 'Error al actualizar equipo');
            throw error;
        }
    }

    // Mover equipo a otro padre
    const moveMachine = async ({id, new_parent_id, setTmpMaquinas, ...props}) => {
        await csrf();

        try {
            const response = await axios.patch(`/api/machines/${id}/move`, {
                new_parent_id: new_parent_id
            });
            
            if (setTmpMaquinas) setTmpMaquinas(response.data.data);
            
            Toast.fire({
                icon: 'success',
                title: 'Equipo movido correctamente',
            });
            
            return response.data.data;
        } catch (error) {
            handleError(error, 'Error al mover equipo');
            throw error;
        }
    }

    // Eliminar equipo
    const deleteMachine = async ({id, forceDelete = false, ...props}) => {
        await csrf();

        console.log('🗑️ Intentando eliminar máquina con ID:', id, 'Force:', forceDelete);

        try {
            const url = forceDelete ? `/api/machines/${id}?force=true` : `/api/machines/${id}`;
            console.log('📡 Enviando DELETE request a:', url);
            const response = await axios.delete(url);
            console.log('✅ Respuesta exitosa:', response.data);
            
            Toast.fire({
                icon: 'success',
                title: 'Equipo eliminado correctamente',
            });
            
            return true;
        } catch (error) {
            console.error('❌ Error al eliminar:', error);
            console.error('❌ Response data:', error.response?.data);
            console.error('❌ Status:', error.response?.status);
            
            // Si el status es 422, significa que requiere confirmación
            if (error.response?.status === 422 && error.response?.data?.requires_confirmation) {
                console.warn('⚠️ Eliminación requiere confirmación');
                return {
                    requiresConfirmation: true,
                    message: error.response.data.message,
                    error: error.response.data.error,
                    childrenCount: error.response.data.children_count,
                    studiesCount: error.response.data.studies_count
                };
            } else if (error.response?.data?.error === 'EQUIPMENT_HAS_CHILDREN') {
                console.warn('⚠️ Equipo tiene hijos');
                Toast.fire({
                    icon: 'error',
                    title: 'No se puede eliminar un equipo que tiene sub-equipos o componentes',
                });
            } else if (error.response?.data?.error === 'EQUIPMENT_HAS_STUDIES') {
                console.warn('⚠️ Equipo tiene estudios de lubricación');
                Toast.fire({
                    icon: 'error',
                    title: 'No se puede eliminar un equipo con estudios de lubricación asociados',
                });
            } else {
                console.error('❌ Error genérico:', error);
                handleError(error, 'Error al eliminar equipo');
            }
            throw error;
        }
    }

    // Función auxiliar para manejo de errores
    const handleError = (error, defaultMessage = 'Error desconocido') => {
        console.error('Error en useMachine:', error);
        
        if (error.response) {
            const message = error.response.data?.message || defaultMessage;
            Toast.fire({
                icon: 'error',
                title: message,
            });
        } else {
            Toast.fire({
                icon: 'error',
                title: defaultMessage + ': ' + error.message,
            });
        }
    }

    return {
        // Métodos existentes
        getMachine,
        getMachineId,
        saveNewMachine,
        saveUpdateMachine,
        
        // Nuevos métodos para jerarquía
        getMachineHierarchy,
        getMachineDescendants,
        getEquipmentTypes,
        searchMachines,
        moveMachine,
        deleteMachine,
    }
}


