import React, {  useEffect, useState  } from 'react';
import { apiSyncQuestionRemove } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useDeleteQuestion = () => {
    const { warn,success } = useAlert();
    const [questionId,setQuestionId] = useState('');
    const [trigger,setTrigger] = useState(false);
    const [isDeleteQuestionSuccess,setIsDeleteQuestionSuccess] = useState(false);
    
    const eliminarPregunta = (nuevoQuestionId, nuevoTrigger) => {
        setIsDeleteQuestionSuccess(false);
        setQuestionId(nuevoQuestionId);
        setTrigger(nuevoTrigger);
    };
    
    const { data,error,cargando:cargandoDeleteQuestion } = apiSyncQuestionRemove(trigger, questionId);
    
    useEffect(() => {
        if (error) {
           warn('Ocurrio un error al eliminar');
           setTrigger(false);
           setIsDeleteQuestionSuccess(false);
        }else if (Array.isArray(data) && data.length > 0 && data[0]?.question_id){
            success('Se eliminó correctamente');
            setTrigger(false);
            setIsDeleteQuestionSuccess(true);
        }
    }, [data,error]);
    
    return {
        eliminarPregunta, cargandoDeleteQuestion, isDeleteQuestionSuccess
    };
}