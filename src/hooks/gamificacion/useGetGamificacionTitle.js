import React, {  useEffect,useState  } from 'react';
import { apiEstablecerTituloUsuario } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useGetGamificacionTitle = () => {
    const { warn,success } = useAlert();
    const [titleId,setTitleId] = useState('');
    const [trigger,setTrigger] = useState(false);
    
    useEffect(()=>{
        if(trigger){
            setTrigger(false);
        }
    },[trigger])
    
    const actualizarTitle = (nuevoTitle, nuevoTrigger) => {
        setTitleId(nuevoTitle);
        setTrigger(nuevoTrigger);
    };
    
    const { data,error,cargando } = apiEstablecerTituloUsuario(trigger,titleId);
    
    useEffect(() => {
        if (error) {
           warn('No se guardó el titulo seleccionado');
        }else if (data.contact_id){
            success('Se registró correctamente');
        }
    }, [data,error]);
    
    return {
        actualizarTitle
    };
}

