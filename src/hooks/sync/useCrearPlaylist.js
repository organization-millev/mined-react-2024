import React, {  useEffect,useState  } from 'react';
import { apiSyncUpsertPlaylist } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useCrearPlaylist = () => {
    const { warn,success } = useAlert();
    const [playlistId,setPlaylistId] = useState('');
    const [namePlayList,setNamePlayList] = useState('');
    const [videoId,setVideoId] = useState('');
    const [channelId,setChannelId] = useState('');
    const [trigger,setTrigger] = useState(false);
    const [isCrearPlayList,setIsCrearPlayList] = useState(false);
    
    const crearPlaylist = ( nuevoChannelId, nuevoVideoId, nuevoPlaylistId, nuevoNamePlayList) => {
        setIsCrearPlayList(false);
        setNamePlayList(nuevoNamePlayList)
        setChannelId(nuevoChannelId)
        setPlaylistId(nuevoPlaylistId);
        setVideoId(nuevoVideoId);
        setTrigger(true);
    };
    
    
    const { data,error,cargando } = apiSyncUpsertPlaylist(trigger,channelId, videoId, playlistId, namePlayList);
    useEffect(() => {
        if (error) {
           warn('Ocurrio un error');
           setTrigger(false);
           setIsCrearPlayList(false)
        }else if (Array.isArray(data) && data.length > 0 && data[0].video_id){
            success('Se registró correctamente');
            setTrigger(false); 
            setIsCrearPlayList(true)
        }
    }, [data,error]);
    
    return {
        crearPlaylist, cargando,isCrearPlayList
    };
}