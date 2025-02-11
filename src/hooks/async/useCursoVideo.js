import React, { useEffect, useState } from 'react';
import { apiAsyncCoursesContent } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useCursoVideo = () => {
    const [videos, setVideos] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [lessonId, setLessonId] = useState(null);
    const { data, error, cargando } = apiAsyncCoursesContent(trigger, lessonId);

    const GetCursoVideo = (newLessonId) => {
        setLessonId(newLessonId);
        setTrigger(true);
    };

    useEffect(() => {
        if (data) {
            if (Array.isArray(data) && data.length > 0) {
                setVideos(data);
            } else {
                
            }
        } else if (error) {
            console.error('Error fetching tools');
        }
    }, [data, error]);

    return { GetCursoVideo, videos, cargando };
};