import React, { useEffect, useState } from 'react';
import { apiAsyncCalendarRemove } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useCalendarioEliminar = () => {
    
    const [calendarEliminar, setCalendarEliminar] = useState([]);
    const [trigger, setTrigger] = useState(false); 
    const [session_id, setSession_id] = useState(null); 
    const { data, error, cargando } = apiAsyncCalendarRemove(trigger, session_id);


    const GetCalendarioEliminar = (id) => {
        setSession_id(id);
        setTrigger(true);
    };
    
    useEffect(() => {
        if (data && Array.isArray(data) && data.length > 0) {
            const extractedData = data.map(session => ({
                session_id: session.session_id,
            }));
            
            setCalendarEliminar(extractedData);
            toast.success("Se eliminó ");
        } else if (error) {
            toast.error('Error al eliminar ');
        } 
        
    }, [data, error]);

    return { GetCalendarioEliminar, calendarEliminar };
};