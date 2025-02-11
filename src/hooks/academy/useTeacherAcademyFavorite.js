import React, {  useEffect,useState  } from 'react';
import { apiTeacherAcademyFavorite } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useTeacherAcademyFavorite = () => {
    const { warn,success } = useAlert();
    const [teacherId,setTeacherId] = useState('');
    const [trigger,setTrigger] = useState(false);
    
    const marcarFavorito = (nuevoTermino, nuevoTrigger) => {
        setTrigger(nuevoTrigger);
        setTeacherId(nuevoTermino)
    };
    
    const { data,error,cargando } = apiTeacherAcademyFavorite(trigger,teacherId );
    
    useEffect(() => {
        if (error) {
           
        }else if (data.teacher_id){
            success('Se registró correctamente');
        }
    }, [data,error]);
    
    return {
        marcarFavorito
    };
}

