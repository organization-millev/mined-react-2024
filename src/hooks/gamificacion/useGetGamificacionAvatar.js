import React, {  useEffect,useState  } from 'react';
import { apiEstablecerAvatarUsuario } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useGetGamificacionAvatar = () => {
    const { warn,success } = useAlert();
    const [avatarId,setAvatarId] = useState('');
    const [trigger,setTrigger] = useState(false);
    
    const actualizarAvatar = (nuevoAvatar, nuevoTrigger) => {
        setAvatarId(nuevoAvatar);
        setTrigger(nuevoTrigger);
    };
    
    const { data,error,cargando:cargandoAvatar } = apiEstablecerAvatarUsuario(trigger,avatarId);
    
    useEffect(() => {
        if (error) {
           console.log('Ocurrio un error');
        }else if (data.contact_id){
            success('Se registró correctamente');
        }
    }, [data,error]);
    
    return {
        actualizarAvatar, cargandoAvatar
    };
}