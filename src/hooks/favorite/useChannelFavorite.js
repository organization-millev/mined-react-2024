import React, {  useEffect,useState  } from 'react';
import { apiLiveFavorites } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useChannelFavorite = () => {
    const { warn,success } = useAlert()
    const [channelId,setChannelId] = useState('');
    const [trigger,setTrigger] = useState(false);
    
    const guardarChannelFavorite = (nuevoChannelId, nuevoTrigger) => {
        setChannelId(nuevoChannelId);
        setTrigger(nuevoTrigger);
    };
    
    const { data,error,cargando } = apiLiveFavorites(trigger,channelId);
    
    useEffect(() => {
        if (error) {
           warn('Ocurrio un error');
        }else if (data.channel_id){
            success('Se registró correctamente');
        }
    }, [data,error]);
    
    useEffect(() => {
        if(trigger){
          setTrigger(false)  ;
        }
    }, [trigger]);
    
    return {
        guardarChannelFavorite
    };
}

