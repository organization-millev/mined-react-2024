import React, {  useEffect,useState  } from 'react';
import { apiEnrollment } from '../api/apiConfig';
import { useAlert } from '../providers/AlertContext';

export const useEnrollment = () => {
    const { warn,success } = useAlert();
    const [cursoId,setCursoId] = useState('');
    const [academyType,setAcademyType] = useState('');
    const [academyId,setAcademyId] = useState('');
    const [trigger,setTrigger] = useState(false);
    
    const enviarRollment = (nuevoCursoId, nuevoAcademyType, nuevoAcademyId, nuevoTrigger) => {
        setCursoId(nuevoCursoId);
        setAcademyType(nuevoAcademyType);
        setAcademyId(nuevoAcademyId);
        setTrigger(nuevoTrigger);
    };
    
    const { data,error,cargando } = apiEnrollment(trigger,cursoId,academyType,academyId);
    
    useEffect(() => {
        if (error) {
           //warn('Ocurrio un error');
           
        }else if (data.course_id){
            success('Se registró correctamente');
        }
    }, [data,error]);
    
    return {
        enviarRollment
    };
}

