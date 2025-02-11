import React, { useEffect, useState } from 'react';
import { apiObtenerAvatares } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useGamificacionAvatar = () => {
    const [avatar, setAvatar] = useState([]); 
    const [trigger, setTrigger] = useState(false);
    const { data, error, cargando } = apiObtenerAvatares(trigger);

    const GetObtenerAvatar = () => {
        setTrigger(true);
    };

    useEffect(() => {
        //
        if (data) {
            if (Array.isArray(data) && data.length > 0) {
                const formattedAvatars = data.map(avatar => ({
                    nombre: avatar[0],
                    descripcion: avatar[1],
                    iconoUrl: avatar[2],
                    estado: avatar[3],
                    estadoSeleccionado: avatar[4],
                    idAvatar: avatar[5],
                }));
                setAvatar(formattedAvatars);
            } else {
                
            }
        } else if (error) {
            //toast.warn('Error al obtener los avatares de gamificación');
            console.error('Error al obtener los avatares:', error);
        }
    }, [data, error]);

    useEffect(() => {
        
    }, [avatar]);  

    return { GetObtenerAvatar, avatar, cargando };
};