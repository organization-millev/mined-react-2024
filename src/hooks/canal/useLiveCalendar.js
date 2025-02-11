import { useEffect, useState } from 'react';
import { apiLiveCalendar } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useLiveValoracion = () => {
    
    const { warn, success } = useAlert()
    const [timeZone, setTimeZone] = useState('');
    //const [startdate, setStartdate] = useState('');
    //const [endDate, setEndDate] = useState('');
    const [trigger, setTrigger] = useState(false);
    
    
    const registrarValoracion = (nuevoRating, nuevoComment,nuevoSessionId,nuevoTrigger) => {
        setTimeZone(nuevoRating);
        //setStartdate(nuevoComment);
        //setEndDate(nuevoSessionId);
        setTrigger(nuevoTrigger)
    };

    const { data, error } = apiLiveCalendar(trigger, timeZone);

    useEffect(() => {
        if (error) {
            warn('Ocurrió un error');
        } else if (data && data.message === "Rating and comment submitted successfully." && data.rating_id) {
            success('Se registró correctamente');
        }
    }, [data, error, warn, success]);

    return {
        registrarValoracion
    };
};