import React, { useEffect, useState } from 'react';
import { apiLiveMaterials } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useLiveMaterials = (channelId) => {
    const [liveMaterials, setLiveMaterials] = useState([]);  
    const [trigger, setTrigger] = useState(false);  
    const { data, error, cargando } = apiLiveMaterials(trigger, channelId);  
    
    // 

    const GetLiveMaterials = () => {
        setTrigger(true); 
    };
    
    useEffect(()=>{
        if(trigger === true){
            setTrigger(false)
        }
    },[trigger])

    useEffect(() => {
        
        //  

        if (data && Array.isArray(data) && data.length > 0) {
            const firstChannel = data[0];  

            if (Number(firstChannel.channel_id) === Number(channelId) && Array.isArray(firstChannel.channel_files)) {
                const filteredMaterials = firstChannel.channel_files.map(material => {
                    const materialExtension = material.material_url.split('.').pop();  

                    return {
                        material_title: material.mat_txt_name,
                        material_id: material.material_id,
                        material_type: materialExtension,
                        material_url: material.material_url,
                        //material_extension: materialExtension
                    };
                });

                setLiveMaterials(filteredMaterials);  
            } 
        } else if (error) {
            
        }
    }, [data, error, channelId]);  


    return { GetLiveMaterials, liveMaterials, cargando, error, setLiveMaterials };
};