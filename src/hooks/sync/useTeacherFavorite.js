import React, { useEffect, useState } from 'react';
import { apiAsyncTeacherFavorite } from '../../api/apiConfig';
import { toast } from 'react-toastify';
import { useAcademia } from '../../providers/AcademiaContext';

export const useTeacherFavorite = () => {
    const [teacherFavorite, setTeacherFavorite] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const { data, error, cargando } = apiAsyncTeacherFavorite(trigger);
    const { getNameByIds,academias  } = useAcademia();
    const [loading, setLoading] = useState(true);
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    const GetTeacherFavorite = () => {
        setTrigger(true);
    };

    useEffect(() => {
        if (data && academias.length > 0) {
            if (Array.isArray(data) && data.length > 0) {
               
                
            const extractedSessions = data.map(item => {
                const { programName, courseName } = getNameByIds(item.prg_int_id, item.cour_int_id, language_code) || {};

                return {
                    live_sess_int_id: item.live_sess_int_id,
                    courseId: item.cour_int_id,
                    programId: item.prg_int_id,
                    programName: programName,
                    courseName: courseName,
                    session_id: item.sessions[0]?.session_id,
                    channel_id: item.channel_id,
                    session_title: item.session_title,
                    session_description: item.session_description,
                    start_time: item.start_time,
                    //is_favorite: item.instructor_is_favorite,
                    is_favorite: item.instructor_is_favorite,
                    is_live: item.is_live,
                    expected_end_time: item.expected_end_time,
                    instructor_id: item.instructor_id,
                    instructor_name: item.instructor_name,
                    instructor_photo: item.instructor_photo,
                    //instructor_is_favorite: item.instructor_is_favorite,
                    files: item.files ? item.files.map(file => ({
                        file_device_type: file.device_type,
                        file_id: file.file_id,
                        file_url: file.file_url,
                        file_tag: file.file_tag
                    })) : []
                };
            });

            setTeacherFavorite(extractedSessions);
            } else {
                //
                setLoading(false);
            }
        } else if (error) {
            //
            setLoading(false);
        }
    }, [data, error,academias]);

    //
    return { GetTeacherFavorite, teacherFavorite, cargando };
}