import React, {  useEffect, useState  } from 'react';
import { apiSyncDisableVideo } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useDisableVideo = () => {
    const { warn,success } = useAlert();
    const [videoId, setVideoId] = useState('');
    const [trigger,setTrigger] = useState(false);
    const [isDisableVideoSuccess,setIsDisableVideoSuccess] = useState(false);
    
    const deshabilitarVideo = (nuevoQuestionId) => {
        setIsDisableVideoSuccess(false);
        setVideoId(nuevoQuestionId);
        setTrigger(true);
    };
    
    const { data,error,cargando:cargandoDisableVideo } = apiSyncDisableVideo(trigger, videoId);
    
    useEffect(() => {
        if (error) {
           warn('Ocurrio un error al deshabilitar el video');
           setTrigger(false);
           setIsDisableVideoSuccess(false);
        }else if (Array.isArray(data) && data.length > 0 && data[0]?.video_id){
            success('Se deshabilitó correctamente el video');
            setTrigger(false);
            setIsDisableVideoSuccess(true);
        }
    }, [data,error]);
    
    return {
        deshabilitarVideo, cargandoDisableVideo, isDisableVideoSuccess
    };
}