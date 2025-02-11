import React, {  useEffect,useState  } from 'react';
import { apiAcademyCourseFavorite } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useCourseFavorite = () => {
    const { warn,success } = useAlert()
    const [courseId,setCourseId] = useState('');
    const [courseType,setCourseType] = useState('');
    const [trigger,setTrigger] = useState(false);
    
    const guardarCurso = (nuevoCourseId, nuevoCourseType, nuevoTrigger) => {
        setCourseId(nuevoCourseId);
        setCourseType(nuevoCourseType);
        setTrigger(nuevoTrigger);
    };
    
    const { data,error,cargando } = apiAcademyCourseFavorite(trigger,courseId, courseType);
    
    useEffect(() => {
        if (error) {
           warn('Ocurrio un error');
        }else if (data.course_favorite_id){
            success('Se registró correctamente');
        }
    }, [data,error]);
    
    return {
        guardarCurso
    };
}

