import React, {  useEffect,useState  } from 'react';
import { apiSyncEditVideoEducator } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useEditVideoEducator = (onSuccess) => {
    const { warn,success } = useAlert();
    const [videoDescription,setVideoDescription] = useState('');
    const [videoTitle,setVideoTitle] = useState('');
    const [playlistId,setPlaylistId] = useState('');
    const [tagId,setTagId] = useState('');
    const [imageBase64,setImageBase64] = useState('');
    const [videoId,setVideoId] = useState('');
    const [recordedDate,setRecordedDate] = useState('');
    const [trigger,setTrigger] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);
    
    const editarVideo = ( nuevoVideoId, nuevoImageBase64, nuevoTagId, nuevoPlaylistId, nuevoVideoTitle, nuevoVideoDescription, nuevoRecordedDate,) => {
        setIsSuccess(false);
        setVideoDescription(nuevoVideoDescription);
        setVideoTitle(nuevoVideoTitle);
        setPlaylistId(nuevoPlaylistId);
        setTagId(nuevoTagId);
        setImageBase64(nuevoImageBase64);
        setVideoId(nuevoVideoId);
        setRecordedDate(nuevoRecordedDate)
        setTrigger(true);
    };
    
    
    const { data,error,cargando } = apiSyncEditVideoEducator(trigger,imageBase64, tagId, playlistId, videoTitle, videoDescription , videoId, recordedDate);
                                                            //image_base64,tag_id, playlist_id,video_title, video_description,video_id
    useEffect(() => {
        if (error) {
           warn('Ocurrio un error al editar el video');
           setTrigger(false);
           setIsSuccess(false)
        }else if (Array.isArray(data) && data.length > 0 && data[0].video_id){
            success('Se registró correctamente');
            setTrigger(false); 
            setIsSuccess(true)
            if (onSuccess) {
                onSuccess();
            }
        }
    }, [data,error]);
    
    return {
        editarVideo, cargando,isSuccess
    };
}