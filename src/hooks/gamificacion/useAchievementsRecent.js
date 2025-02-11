import React, { useEffect, useState } from 'react';
import { apiUserAchievementRecent } from '../../api/apiConfig';
import { toast } from 'react-toastify';
//import { obtenerInfoDispositivo } from '../../utils/funciones'; 



export const useAchievementsRecent = () => {
    
    const [achievementsRecent, setAchievementsRecent] = useState();
    const [limit, setLimit] = useState(10);
    const [trigger, setTrigger] = useState(true);
    const { data, error, cargando } = apiUserAchievementRecent(trigger, limit);

    const GetAchievementsRecent = () => {
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
                setAchievementsRecent(formattedTitulos);
            } else {
                
            }
        } else if (error) {
            //toast.warn('Error al obtener los títulos de gamificación');
            console.error('Error al obtener los títulos:', error);
        }
    }, [data, error]);
    
    

    return {  GetAchievementsRecent, achievementsRecent, cargando  };
};
