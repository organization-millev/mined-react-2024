import { useEffect, useState } from 'react';
import { apiLiveQuestions } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useLiveQuestions = () => {
    const { warn, success } = useAlert();
    const [text, setText] = useState('');
    const [questionId, setQuestionId] = useState('');
    const [parentId, setParentId] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [isSuccessQuestion, setIsSuccessQuestion] = useState(false);
    const [trigger, setTrigger] = useState(false);

    const registrarPregunta = (nuevoText, nuevoQuestionId, nuevoParentId, nuevoSessionId) => {
        setText(nuevoText);
        setQuestionId(nuevoQuestionId);
        setParentId(nuevoParentId);
        setSessionId(nuevoSessionId);
        setIsSuccessQuestion(false);
        setTrigger(true);
    };

    const { data, error } = apiLiveQuestions(trigger, text, questionId, parentId, sessionId);

    useEffect(() => {
        if (error) {
            warn('Ocurrió un error');
            setTrigger(false);
            setIsSuccessQuestion(false);
        } else if (Array.isArray(data) && data.length > 0 && data[0].question_id) {
            success('Se registró correctamente pregunta');
            setTrigger(false);
            setIsSuccessQuestion(true);
        }
    }, [data, error, warn, success]);

    return {
        registrarPregunta, isSuccessQuestion
    };
};