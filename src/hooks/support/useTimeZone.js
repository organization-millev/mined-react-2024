import React, { useEffect, useState } from 'react';
import { apiSupportTimeZone } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useTimeZone = () => {
    
    const [timeZone, setTimeZone]= useState([]);
    const [trigger, setTrigger] = useState(false);
    const { data, error } = apiSupportTimeZone(trigger);
     
     
    const GetTimeZone = () => {
        setTrigger(true);
    };


      useEffect(() => {
        if (data) {
            if (Array.isArray(data) && data.length > 0) {
                const extractedTimeZones = data
                    .filter(timezone => timezone.timz_sts_status == 1) 
                    .map(timezone => ({
                        serv_int_id: timezone.serv_int_id,
                        timz_int_id: timezone.timz_int_id,
                        timz_sts_status: timezone.timz_sts_status,
                        timz_txt_city: timezone.timz_txt_city,
                        timz_txt_country_name: timezone.timz_txt_country_name,
                        timz_txt_flag_url: timezone.timz_txt_flag_url,
                        timz_txt_gmt_offset: timezone.timz_txt_gmt_offset,
                        timz_txt_group: timezone.timz_txt_group,
                        timz_txt_human_name: timezone.timz_txt_human_name,
                        timz_txt_name: timezone.timz_txt_name,
                    }));
                
                
      
                
                setTimeZone(extractedTimeZones);
                
            } else {
                
            }
        }

        if (error) {
            console.error('Error al cargar timezone');
        }
    }, [data, error, trigger]);
    
    
    
    return { GetTimeZone ,timeZone};
}
