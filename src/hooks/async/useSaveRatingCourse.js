import { useEffect, useState } from 'react';
import { apiAsyncSaveRatingCourse } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useSaveRatingCourse = () => {
    const { warn, success } = useAlert();
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [lessonId, setLessonId] = useState('');
    const [trigger, setTrigger] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    

    
    const registrarValoracionCourse = (nuevoRating, nuevoComment,nuevoSessionId,nuevoTrigger) => {
        setRating(nuevoRating);
        setComment(nuevoComment);
        setLessonId(nuevoSessionId);
        //setTrigger(prev => !prev); // Cambiar el estado para disparar el efecto
        setTrigger(nuevoTrigger)
    };

    const { data, error } = apiAsyncSaveRatingCourse(trigger, rating,comment,lessonId);

    useEffect(() => {
        if (error) {
            warn('Ocurrió un error. Por favor, inténtalo nuevamente.');
            setIsSuccess(false);
        } else if (data && Array.isArray(data) && data.length > 0) {
            const response = data[0];
            if (response.status) {
                success('Se registró correctamente');
                setIsSuccess(true);
            } else {
                warn('No se pudo registrar la valoración. Por favor, inténtalo nuevamente.');
                setIsSuccess(false);
            }
        }
    }, [data, error, warn, success]);

    return {
        registrarValoracionCourse, isSuccess  
    };
};