import { useEffect, useState } from 'react';
import { apiLiveRatingsSave } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useLiveValoracion = () => {
    const { warn, success } = useAlert();
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [trigger, setTrigger] = useState(false);
    const [isRatingSuccess, setIsRatingSuccess] = useState(false);

    const registrarValoracion = (nuevoRating, nuevoComment,nuevoSessionId,nuevoTrigger) => {
        setRating(nuevoRating);
        setComment(nuevoComment);
        setSessionId(nuevoSessionId);
        //setTrigger(prev => !prev); // Cambiar el estado para disparar el efecto
        setTrigger(nuevoTrigger)
    };

    const { data, error } = apiLiveRatingsSave(trigger, rating,comment,sessionId);

    useEffect(() => {
        if (error) {
            warn('Ocurrió un error');
            setIsRatingSuccess(false);
        } else if (data && data[0]?.session_id) {
            success('Se registró correctamente');
            setIsRatingSuccess(true);
        }
    }, [data, error, warn, success]);

    return {
        registrarValoracion,isRatingSuccess
    };
};