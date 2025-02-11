import React, { useEffect, useState } from 'react';
import { apiObtenerTitulos } from '../../api/apiConfig';
import { toast } from 'react-toastify';
import { obtenerInfoDispositivo } from '../../utils/funciones'; 



export const useGamificacionTitle = () => {
    
    const [titulos, setTitulos] = useState();
    const [trigger, setTrigger] = useState(false);
    const { data, error, cargando:cargandoTitulo } = apiObtenerTitulos(trigger);

    const GetObtenerTituloGamificacion = () => {
        setTrigger(true);
    };

    useEffect(()=>{
        if(trigger){
            setTrigger(false);
        }
    },[trigger])

    useEffect(() => {
        if (data) {
            if (Array.isArray(data) && data.length > 0) {
                // Procesa la data y la asigna al estado titulos
                const formattedTitulos = data.map(titulo => ({
                    nombre: titulo[0],
                    descripcion: titulo[1],
                    estado: titulo[2],
                    estadoSeleccionado: titulo[3],
                    idTitulo: titulo[4]
                }));
                setTitulos(formattedTitulos);
            } else {
                
            }
        } else if (error) {
            //toast.warn('Error al obtener los títulos de gamificación');
            console.error('Error al obtener los títulos:', error);
        }
    }, [data, error]);
    
    

    return {  GetObtenerTituloGamificacion , titulos , cargandoTitulo  };
};
