import { useEffect, useState } from 'react';
import { apiLiveQuestions } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useSubmitAnswer = () => {
    const { warn, success } = useAlert();
    const [text, setText] = useState('');
    const [questionId, setQuestionId] = useState('');
    const [parentId, setParentId] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [isSuccessAnswer, setIsSuccessAnswer] = useState(false);
    const [trigger, setTrigger] = useState(false);

    const registrarRespuesta = (nuevoText, nuevoQuestionId, nuevoParentId, nuevoSessionId) => {
        setText(nuevoText);
        setQuestionId(nuevoQuestionId);
        setParentId(nuevoParentId);
        setSessionId(nuevoSessionId);
        setIsSuccessAnswer(false);
        setTrigger(true);
    };

    const { data, error } = apiLiveQuestions(trigger, text, questionId, parentId, sessionId);

    useEffect(() => {
        if (error) {
            warn('Ocurrió un error');
            setTrigger(false);
            setIsSuccessAnswer(false);
        } else if (Array.isArray(data) && data.length > 0 && data[0].answer_id) {
            success('Se registró correctamente la respuesta');
            setTrigger(false);
            setIsSuccessAnswer(true);
        }
    }, [data, error, warn, success]);

    return {
        registrarRespuesta, isSuccessAnswer
    };
};