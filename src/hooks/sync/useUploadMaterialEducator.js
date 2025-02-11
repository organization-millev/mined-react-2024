import React, {  useEffect,useState  } from 'react';
import { apiSyncUploadMaterialEducator } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useUploadMaterialEducator = () => {
    const { warn,success } = useAlert();
    const [materialName,setMaterialName] = useState('');
    const [fileExtension,setFileExtension] = useState('');
    const [fileBase64,setFileBase64] = useState('');
    const [channelId,setChannelId] = useState('');
    const [sessionId,setSessionId] = useState('');
    const [trigger,setTrigger] = useState(false);
    const [isUpdateSuccess,setIsUpdateSuccess] = useState(false);
    const [cargandoUpload, setCargandoUpload] = useState(false);
    useEffect(()=>{
        if(trigger){
            setTrigger(false)
        }
    },[trigger])
    
    const subirArchivos = (nuevoChannelId, nuevoFileBase64, nuevoFileExtension, nuevoMaterialName,nuevoSessionId) => {
        // setIsUpdateSuccess('');
        setChannelId(nuevoChannelId);
        setFileBase64(nuevoFileBase64);
        setFileExtension(nuevoFileExtension);
        setMaterialName(nuevoMaterialName);
        setSessionId(nuevoSessionId)
        setTrigger(true);
        setCargandoUpload(true);
    };
    
    const { data:dataUpload,error:errorUpload,message:messageUpload } = apiSyncUploadMaterialEducator(trigger,channelId, fileBase64, fileExtension, materialName,sessionId);
    
    useEffect(() => {
        if (errorUpload) {
           warn('Ocurrio un error al subir el archivo');
           setTrigger(false);
           setIsUpdateSuccess(false)
        }else if (Array.isArray(dataUpload) && dataUpload.length > 0 && dataUpload[0]?.material_id ){
            success('Se registró correctamente');
            setTrigger(false);
            //setIsUpdateSuccess(true)
            setTimeout(() => {
                setCargandoUpload(false);
                setIsUpdateSuccess(true);
            }, 500);
            //
        }
    }, [dataUpload,errorUpload]);
    
    
    //useEffect(()=>{
    
    return {
        subirArchivos, cargandoUpload, isUpdateSuccess,setIsUpdateSuccess
    };
}