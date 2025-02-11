import React, { useEffect, useState } from 'react';
import { apiBannerPromotional } from '../../api/apiConfig';
import { toast } from 'react-toastify';
import { obtenerInfoDispositivo } from '../../utils/funciones'; 

export const useBannerPromocional = () => {
    const tipoDispositivo = obtenerInfoDispositivo().tipoDispositivo;
    const [trigger, setTrigger] = useState(false);
    const { data, error, cargando } = apiBannerPromotional(trigger);
    const [bannerProm, setBannerProm] = useState(null);
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();

    // Función para obtener el banner promocional
    const GetBannerPromocional = () => {
        setTrigger(true);
    };

    // useEffect para manejar los datos una vez que se reciben de la API
    useEffect(() => {
        if (data && Array.isArray(data) && data.length > 0) {
            // Filtrar los datos en función del tipo de dispositivo
            const banner = data.find(item => item.file_txt_device_type === tipoDispositivo);

            if (banner) {
                setBannerProm(banner);
                //
            } else {
                
            }
        } else if (error) {
            
        }
    }, [data, error, tipoDispositivo]);

    return { GetBannerPromocional, bannerProm, cargando };
};
