import React, { useEffect, useState } from 'react';
import { apiLiveMaterials } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useCursoMaterials = () => {
    const [materiales, setMateriales] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [channelId, setChannelId] = useState(14);
    const { data, error, cargando } = apiLiveMaterials(trigger, channelId);

    const GetCursoMaterials = () => {
        setTrigger(true);
    };
    
    
    
    useEffect(() => {
        if (data) {
            if (Array.isArray(data) && data.length > 0) {
                // Mapea los datos obtenidos para estructurar correctamente los materiales
                const mappedMaterials = data.flatMap(channel => 
                    channel.channel_files.map(file => ({
                        material_id: file.material_id,
                        material_type: file.material_type,
                        material_title: file.material_title || 'Sin titulo ',
                        material_url: file.material_url,
                        language_code: file.language_code,
                        channel_id: channel.channel_id
                    }))
                );
                setMateriales(mappedMaterials);
            } else {
                
            }
        } else if (error) {
            console.error('Error al obtener materiales');
        }
    }, [data, error]);

    return { GetCursoMaterials, materiales, cargando };
};