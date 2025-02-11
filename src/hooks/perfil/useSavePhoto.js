import React, {  useEffect,useState  } from 'react';
import { apiSavePhoto } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useSavePhoto = () => {
    const { warn,success } = useAlert();
    const [image,setImage] = useState('');
    const [trigger,setTrigger] = useState(false);
    
    const actualizarFoto = (nuevaImage, nuevoTrigger) => {
        setTrigger(nuevoTrigger);
        setImage(nuevaImage)
    };
    
    const { data,error,cargando:cargandoFotoPerfil } = apiSavePhoto(trigger,image);
    
    useEffect(() => {
        if (error) {
           warn('No se guardó la imagen');
        }else if (data.contact_id){ //Array.isArray(data) && data.length > 0 && data[0].image_link
            success('Se registró correctamente');
        }
    }, [data,error]);
    
    return {
        actualizarFoto,cargandoFotoPerfil
    };
}

