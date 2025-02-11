import React, { useEffect, useState } from 'react';
import { apiHelpReels } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useReels = () => {
    const [reels, setReels] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const { data, error, cargando } = apiHelpReels(trigger);

    const GetReels = () => {
        setTrigger(true);
    };

    useEffect(() => {
        if (data && Array.isArray(data) && data.length > 0) {
            // Accede a reels dentro de cada servicio
            const allReels = data.flatMap(service => service.reels || []);

            if (allReels.length > 0) {
                setReels(allReels.map(reel => ({
                    reel_id: reel.reel_id,
                    tituloReel: reel.title,
                    tiempo: reel.reel_time_duration,
                    url_ImagenFondo_Reel: reel.url,
                    videoReel:reel.url_media,
                })));
            } else {
                
            }
        } else if (error) {
            console.error('Error fetching reels');
        }
    }, [data, error]);

    return { GetReels, reels, cargando };
}