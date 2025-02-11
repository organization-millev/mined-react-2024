import React, { useEffect, useState } from 'react';
import { apiLiveQuestionsList } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useLiveQuestionsList = () => {
    const [liveList, setLiveList] = useState([]);
    const [trigger, setTrigger] = useState(0);
    const [channelId, setChannelId] = useState();
    //const [sessionId, setSessionId] = useState('12');
    const { data, error, cargando } = apiLiveQuestionsList(trigger, channelId);//, sessionId

    const GetLiveList = (id) => {
        setChannelId(id)
        setTrigger(true);
    };
    
    useEffect(()=>{
        if(trigger === true){
            setTrigger(false)
        }
    },[trigger])

    //

    useEffect(() => {
        if (data) {
            if (Array.isArray(data) && data.length > 0) {
                //

                const extractedComments = data.flatMap(session => 
                    session.comments.map(comment => ({
                        question_id: comment.question_id,
                        user_id: comment.question_user_id,
                        photo: comment.question_photo,
                        user_name: comment.question_user_name,
                        text: comment.question_text,
                        created_at: comment.question_created_at,
                        answers: (comment.answers || []).map(answer => ({
                            answer_id: answer.answer_id,
                            parent_id: answer.parent_id,
                            user_id: answer.answer_user_id,
                            photo: answer.answer_photo,
                            user_name: answer.answer_user_name,
                            text: answer.answer_text,
                            created_at: answer.answer_created_at
                        }))
                    }))
                );
                
                extractedComments.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))

                setLiveList(extractedComments);

                if (extractedComments.length === 0) {
                    
                }
            } else {
                
            }
        } else if (error) {
            console.error('Error fetching FAQs');
        }
    }, [data, error]);
    

    return { GetLiveList, liveList, setLiveList, cargando };
};