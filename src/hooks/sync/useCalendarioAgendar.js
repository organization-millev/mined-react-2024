import React, { useEffect, useState } from 'react';
import { apiAsyncCalendarAdd } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useCalendarioAgendar = () => {
    
    const [calendarAdd, setCalendarAdd] = useState([]);
    const [trigger, setTrigger] = useState(false); 
    const [channelId, setChannelId] = useState(null); 
    const { data, error, cargando } = apiAsyncCalendarAdd(trigger , channelId );
  
  
    const GetCalendarioAgendar = (id) => {
          setChannelId(id);
          setTrigger(true);
    };   
    

    useEffect(() => {
      
         if (data && Array.isArray(data) && data.length > 0) {
              
            const extractedData = data.map(session => ({
              channel_id: session.channel_id,
            }));
            setCalendarAdd(extractedData);
            toast.success("¡Se agendó correctamente!");
            
        }  else if (error) {
          console.error('Error al obtener los datos');
        } 
      }, [data, error]);
  
  
    
    return { GetCalendarioAgendar,calendarAdd };
};