import React, {  useEffect,useState  } from 'react';
import { apiSyncRatingEducator } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useRatingEducator = () => {
    const { warn,success } = useAlert();
    const [rateId,setRateId] = useState('');
    const [trigger,setTrigger] = useState(false);
    
    const visualizarResenas = (nuevoRateId) => {
        setRateId(nuevoRateId);
        setTrigger(true);
    };
    
    const { data,error,cargando } = apiSyncRatingEducator(trigger,rateId);
    
    useEffect(() => {
        if (error) {
           warn('Ocurrio un error');
        }else if (data.contact_id){
            success('Se registró correctamente');
        }
    }, [data,error]);
    
     useEffect(() => {
        if (trigger === true) {
           setTrigger(false)
        }
    }, [trigger]);
    
    
    return {
        visualizarResenas
    };
}

