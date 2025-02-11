import React, { useEffect, useState } from 'react';
import { apiLiveCalendar } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useHorario = () => {
    
   const [horario, setHorario] = useState(null);
    const [idCurso, setIdCurso] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [timeZone, setTimeZone] = useState('America/Lima');
    const [startDate, setStartDate] = useState(20240722);
    const [endDate, setEndDate] = useState(20240728);
    const { data, error, cargando } = apiLiveCalendar(trigger , timeZone , idCurso);

    const GetHorario = (idCurso) => {
        setIdCurso(idCurso);
         setHorario(null);
        setTrigger(true);
    };
    
    useEffect(() => {
    if (data || error) { 
        if (error || (data && data.status === 'error') || (data && data[0]?.status === false)) {
            setHorario(null); 
        } else if (data && Array.isArray(data) && data.length > 0) {
            const mappedData = data.map(channel => ({
                chnlIntId: channel.chnl_int_id,
                chnlTxtEntityType: channel.chnl_txt_entity_type,
                instructorPhoto: getInstructorPhotoByChannelId(data, channel.chnl_int_id),
                instructorNombre: getInstructorNombreByChannelId(data, channel.chnl_int_id),
                days: channel.days.map(day => ({
                    weekday: day.weekday,
                    sessions: day.sessions.map(session => ({
                        sessIntId: session.sess_int_id,
                        instructorName: session.instructor_name,
                        instructorPhoto: session.instructor_photo,
                        sessionName: session.cal_txt_description,
                        sessionDescription: session.session_description,
                        sessionSubtitle: session.session_subtitle,
                        calDateStart: session.cal_date_start,
                        calTimeStart: session.cal_time_start,
                        calDateEnd: session.cal_date_end,
                        calTimeEnd: session.cal_time_end,
                        calIntDay: session.cal_int_day,
                        isLive: session.is_live,
                    }))
                })),
                files: channel.files.map(file => ({
                    fileIntId: file.file_int_id,
                    fileTxtUrl: file.file_txt_url,
                    fileTxtTag: file.file_txt_tag,
                    fileTxtDeviceType: file.file_txt_device_type,
                    fileTxtRedirectUrl: file.file_txt_redirect_url,
                    fileTxtExtension: file.file_txt_extension,
                    fileTxtType: file.file_txt_type
                }))
            }));
            setHorario(mappedData); // Establece el horario con los datos mapeados
        } else {
            setHorario(null); // Limpia el horario si no se encuentran datos válidos
        }
    }
}, [data, error]); 
    
    
    // Función para buscar la foto por ID de canal
    const getInstructorPhotoByChannelId = (channels, channelId) => {
      const channel = channels.find(ch => ch.chnl_int_id === channelId);
      
      if (!channel) return null;
    
      // Encontrar el primer día que tenga sesiones y tomar la primera sesión
      const firstDayWithSessions = channel.days.find(day => day.sessions.length > 0);
      
      return firstDayWithSessions ? firstDayWithSessions.sessions[0].instructor_photo : null;
    };
    
    const getInstructorNombreByChannelId = (channels, channelId) => {
      const channel = channels.find(ch => ch.chnl_int_id === channelId);
      
      if (!channel) return null;
    
      // Encontrar el primer día que tenga sesiones y tomar la primera sesión
      const firstDayWithSessions = channel.days.find(day => day.sessions.length > 0);
      
      return firstDayWithSessions ? firstDayWithSessions.sessions[0].instructor_name : null;
    };
    

    return { GetHorario, horario, cargando };
};