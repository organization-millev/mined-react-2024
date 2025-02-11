import React, { useEffect, useState } from 'react';
import { apiUserAchievementDetail } from '../../api/apiConfig';
import { toast } from 'react-toastify';
//import { obtenerInfoDispositivo } from '../../utils/funciones'; 



export const useAchievementsDetail = () => {
    
    const [achievementsDetail, setAchievementsDetail] = useState();
    const [unlockedOnly, setUnlockedOnly] = useState(false);
    const [groupId, setGroupId] = useState('none');
    const [trigger, setTrigger] = useState(true);
    const { data, error, cargando } = apiUserAchievementDetail(trigger, groupId, unlockedOnly);

    const GetAchievementDetail = () => {
        setTrigger(true);
    };

    
    //

    useEffect(() => {
        if (data) {
            if (Array.isArray(data) && data.length > 0) {
                // Procesa la data y la asigna al estado titulos
                const formattedTitulos = data.map(titulo => ({
                    //nombre: titulo[0],
                    //descripcion: titulo[1],
                    //estado: titulo[2],
                    //estadoSeleccionado: titulo[3],
                    //idTitulo: titulo[4]
                }));
                setAchievementsDetail(formattedTitulos);
            } else {
                
            }
        } else if (error) {
            //toast.warn('Error al obtener los títulos de gamificación');
            console.error('Error al obtener los títulos:', error);
        }
    }, [data, error]);
    
    

    return {  GetAchievementDetail, achievementsDetail, cargando  };
};
