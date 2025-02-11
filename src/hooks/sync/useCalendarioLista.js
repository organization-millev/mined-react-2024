import React, { useEffect, useState } from 'react';
import { apiAsyncCalendarList } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useCalendarioLista = () => {
    
    const [files, setFiles] = useState([]);
    const [tag, setTag] = useState([]);
    const [days, setDays] = useState([]);
    const [calendarList, setCalendarList] = useState([]);
    const [trigger, setTrigger] = useState(false); 
    const [timeZone, setTimeZone] = useState('America/Lima'); 
    const { data, error, cargando } = apiAsyncCalendarList(trigger , timeZone );
  
    const GetCalendarioLista = () => {
        setTrigger(true);
    };   

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
           
            const extractedFiles = data.flatMap(channel => 
                channel.files.map(file => ({
                    id: file.file_int_id,
                    url: file.file_txt_url,
                    tag: file.file_txt_tag,
                    deviceType: file.file_txt_device_type,
                    redirectUrl: file.file_txt_redirect_url,
                    extension: file.file_txt_extension,
                    type: file.file_txt_type
                }))
                
            );
            
            const extractedTag = data.flatMap(channel => 
                channel.academy_tags
                    .filter(tag => tag.tag_txt_name === "color")
                    .map(tag => ({
                        name: tag.tag_txt_name,
                        color: tag.tag_txt_value
                    }))
            );
            
            
            const extractedDays = data.flatMap(channel => 
                channel.days.map(day => ({
                    weekday: day.weekday,
                    sessions: day.sessions.map(session => ({
                        id: session.sess_int_id,
                        name: session.session_description,
                        instructor: session.instructor_name,
                        photo: session.instructor_photo,
                        startTime: session.cal_time_start,
                        startDate: session.cal_date_start,
                        isLive: session.is_live,
                        description: session.session_description,
                        channelId: channel.chnl_int_id,
                        color: channel.academy_tags.find(tag => tag.tag_txt_name === "color")?.tag_txt_value || "" ,
                        courseId: channel.cour_int_id
                    }))
                }))
            );

            
            setTag(extractedTag);
            setFiles(extractedFiles);
            setDays(extractedDays);
            
            //
            //

        } else if (error) {
            console.error('Error al obtener los datos calendario lista');
        } 
    }, [data, error]);

    return { GetCalendarioLista, files, days,tag };
};
