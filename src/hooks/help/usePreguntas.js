import React, { useEffect, useState } from 'react';
import { apiHelpFaq } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const usePreguntas = () => {
    const [faqs, setFaqs] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const { data, error, cargando } = apiHelpFaq(trigger);

    const GetPreguntas = () => {
        setTrigger(true);
    };

    useEffect(() => {
        if (data) {
            if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].faqs)) {
                setFaqs(data[0].faqs.map(faq => ({
                    faq_id: faq.faq_int_id,
                    question: faq.question,
                    answer: faq.answer
                })));
            } else {
                
            }
        } else if (error) {
            console.error('Error fetching FAQs');
        }
    }, [data, error]);
    
    return { GetPreguntas, faqs, cargando };
}
