import React, {  useEffect, useState  } from 'react';
import { apiSyncDeleteMaterialEducator } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useDeleteMaterialEducator = () => {
    const { warn,success } = useAlert();
    const [fileIds,setFileIds] = useState('');
    const [channelId,setChannelId] = useState('');
    const [trigger,setTrigger] = useState(false);
    const [isDeleteSuccess,setIsDeleteSuccess] = useState(false);
    
    const eliminarArchivos = (nuevoChannelId, nuevoFileIds, nuevoTrigger) => {
        setIsDeleteSuccess(false);
        setChannelId(nuevoChannelId);
        setFileIds(nuevoFileIds);
        setTrigger(nuevoTrigger);
    };
    
    const { data,error,cargandoDelete } = apiSyncDeleteMaterialEducator(trigger,channelId, fileIds);
    
    useEffect(() => {
        if (error) {
           warn('Ocurrio un error al eliminiar el archivo');
           setTrigger(false);
           setIsDeleteSuccess(false);
        }else if (Array.isArray(data) && data.length > 0 && data[0]?.material_id && data[0]?.channel_id){
            success('Se eliminó correctamente');
            setTrigger(false);
            setIsDeleteSuccess(true);
        }
    }, [data,error]);
    
    return {
        eliminarArchivos, cargandoDelete, isDeleteSuccess
    };
}