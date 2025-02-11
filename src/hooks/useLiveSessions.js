import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { TAG } from '../utils/tag';
import { apiLiveStream } from '../api/apiConfig';
import { useAcademia } from '../providers/AcademiaContext';
import { convertToUtf8 } from '../utils/funciones';

export const useLiveSessions = () => {
    const { getNameByIds, academias  } = useAcademia();
    const [sessionList, setSessionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    
    const { data: dataLive ,error:errorLive,cargando:cargandoLive } = apiLiveStream(true);
    //

     useEffect(() => {
        if (dataLive && academias.length > 0) {
            if (Array.isArray(dataLive)) {
                const extractedSessions = dataLive
                    .filter(session => session.channel_id !== null)
                    .map(session => {
                        const { programName, courseName } = getNameByIds(session.prg_int_id, session.cour_int_id, language_code) || {};
                        const formattedCourseName = courseName ? courseName.replace(/_/g, ' ') : '';
                        //
                        const isFavorite = session.instructor_is_favorite === 1 || session.is_favorite === 1 ? 1 : 0;
                       // 
                        return {
                            live_sess_int_id: session.live_sess_int_id,
                            session_id: session.sessions[0]?.session_id,
                            channel_id: session.channel_id,
                            courseId: session.cour_int_id,
                            programId: session.prg_int_id,
                            programName: programName,
                            courseName: formattedCourseName,
                            session_title: session.session_title,
                            session_description: session.session_description,
                            start_time: session.start_time,
                            is_favorite: isFavorite,
                            is_live: session.is_live,
                            expected_end_time: session.expected_end_time,
                            instructor_id: session.instructor_id,
                            instructor_name: convertToUtf8(session.instructor_name),
                            instructor_photo: session.instructor_photo,
                            files: session.files?.map(file => ({
                                file_device_type:file.device_type,
                                file_id: file.file_id,
                                file_url: file.file_url,
                                file_tag: file.file_tag
                            })) || []
                        };
                    });
                
                // Ordenar por 'is_live' primero, y luego por 'expected_end_time' en orden descendente
                const sortedSessions = extractedSessions.sort((a, b) => {
                    // Primero, si uno de los dos está en vivo, darle prioridad
                    if (a.is_live && !b.is_live) return -1;  // a tiene prioridad
                    if (!a.is_live && b.is_live) return 1;   // b tiene prioridad
    
                    // Si ninguno está en vivo, ordenar por 'expected_end_time' (fechas más lejanas primero)
                    const aEndTime = new Date(a.expected_end_time);
                    const bEndTime = new Date(b.expected_end_time);
                    return bEndTime - aEndTime;  // Orden descendente
                });
                
                
                setSessionList(sortedSessions);
                
                setLoading(false);

                if (extractedSessions.length === 0) {
                    
                }
            } else {
                //
                setLoading(false);
            }
        } else if (errorLive) {
            
            setLoading(false);
        }
    }, [dataLive, errorLive,academias]);
    
    
    

    // Estado inicial vacío
    const [sessions, setSessions] = useState({
        live_sessions: []
    });


    // Estado para manejar la carga de datos
    const [cargando, setCargando] = useState(true);
    
    const [error, setError] = useState(null);

  
  
    
    
    // Datos de ejemplo para inicializar el hook
    const initialSessions = [
            {
              "live_sess_int_id": 101,
              "session_id": 202,
              "channel_id": 1,
              "session_title": "Utilizar divisas",
              "session_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
              "start_time": "2022-07-21T10:00:00",
              "is_live": true,
              "is_favorite": true,
              "expected_end_time": "2022-07-21T11:00:00",
              "instructor_details": {
                "instructor_id": 1,
                "instructor_name": "Andrea Retana"
              },
              "files": [
                {
                  "file_url": `${process.env.REACT_APP_URL_IMG}/miniaturaClase/fondoeducadorminedtv(2).png`,
                  "file_tag": "SincronicoSessionLive"
                }
              ]
            },
            {
              "live_sess_int_id": 102,
              "session_id": 203,
              "channel_id": 2,
              "session_title": "Economía moderna",
              "session_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
              "start_time": "2022-07-22T12:00:00",
              "is_live": false,
              "is_favorite": false,
              "expected_end_time": "2022-07-22T13:00:00",
              "instructor_details": {
                "instructor_id": 2,
                "instructor_name": "Iván Villegas"
              },
              "files": [
                {
                 "file_url": `${process.env.REACT_APP_URL_IMG}/miniaturaClase/fondoeducadorminedtv(3).png`,
                  "file_tag": "SincronicoSessionLive"
                }
              ]
            },
            {
              "live_sess_int_id": 103,
              "session_id": 204,
              "channel_id": 3,
              "session_title": "Introducción a la física cuántica",
              "session_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
              "start_time": "2022-07-23T15:00:00",
              "is_live": true,
              "is_favorite": false,
              "expected_end_time": "2022-07-23T16:00:00",
              "instructor_details": {
                "instructor_id": 3,
                "instructor_name": "Laura Campos"
              },
              "files": [
                {
                  "file_url": `${process.env.REACT_APP_URL_IMG}/miniaturaClase/fondoeducadorminedtv(4).png`,
                  "file_tag": "SincronicoSessionLive"
                }
              ]
            },
            {
              "live_sess_int_id": 104,
              "session_id": 205,
              "channel_id": 4,
              "session_title": "Conceptos básicos de programación",
              "session_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
              "start_time": "2022-07-24T09:00:00",
              "is_live": false,
              "is_favorite": false,
              "expected_end_time": "2022-07-24T10:30:00",
              "instructor_details": {
                "instructor_id": 4,
                "instructor_name": "Carlos Mejía"
              },
              "files": [
                {
                  "file_url": `${process.env.REACT_APP_URL_IMG}/miniaturaClase/fondoeducadorminedtv(4).png`,
                  "file_tag": "SincronicoSessionLive"
                }
              ]
            },
            {
              "live_sess_int_id": 105,
              "session_id": 206,
              "channel_id": 5,
              "session_title": "Nutrición para deportistas",
              "session_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
              "start_time": "2022-07-25T11:00:00",
              "is_live": true,
              "is_favorite": false,
              "expected_end_time": "2022-07-25T12:00:00",
              "instructor_details": {
                "instructor_id": 5,
                "instructor_name": "Sofía Guerrero"
              },
              "files": [
                {
                  "file_url": `${process.env.REACT_APP_URL_IMG}/miniaturaClase/fondoeducadorminedtv(4).png`,
                  "file_tag": "SincronicoSessionLive"
                }
              ]
            },
            {
              "live_sess_int_id": 106,
              "session_id": 207,
              "channel_id": 6,
              "session_title": "Matemáticas financieras avanzadas",
              "session_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
              "start_time": "2022-07-26T14:00:00",
              "is_live": false,
              "is_favorite": true,
              "expected_end_time": "2022-07-26T15:30:00",
              "instructor_details": {
                "instructor_id": 6,
                "instructor_name": "Julio Torres"
              },
              "files": [
                {
                  "file_url": `${process.env.REACT_APP_URL_IMG}/miniaturaClase/fondoeducadorminedtv(4).png`,
                  "file_tag": "SincronicoSessionLive"
                }
              ]
            },
            {
              "live_sess_int_id": 107,
              "session_id": 208,
              "channel_id": 7,
              "session_title": "Historia del arte",
              "session_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
              "start_time": "2022-07-27T16:00:00",
              "is_live": true,
              "is_favorite": true,
              "expected_end_time": "2022-07-27T17:00:00",
              "instructor_details": {
                "instructor_id": 7,
                "instructor_name": "Marta Díaz"
              },
              "files": [
                {
                  "file_url": `${process.env.REACT_APP_URL_IMG}/miniaturaClase/fondoeducadorminedtv(4).png`,
                  "file_tag": "SincronicoSessionLive"
                }
              ]
            },
            {
              "live_sess_int_id": 108,
              "session_id": 209,
              "channel_id": 8,
              "session_title": "Gestión empresarial",
              "session_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
              "start_time": "2022-07-28T18:00:00",
              "is_live": true,
              "is_favorite": true,
              "expected_end_time": "2022-07-28T19:00:00",
              "instructor_details": {
                "instructor_id": 8,
                "instructor_name": "Jorge Gómez"
              },
              "files": [
                {
                  "file_url": `${process.env.REACT_APP_URL_IMG}/miniaturaClase/fondoeducadorminedtv(4).png`,
                  "file_tag": "SincronicoSessionLive"
                }
              ]
            },
            {
              "live_sess_int_id": 109,
              "session_id": 210,
              "channel_id": 9,
              "session_title": "Avances en biotecnología",
              "session_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
              "start_time": "2022-07-29T19:00:00",
              "is_live": false,
              "is_favorite": true,
              "expected_end_time": "2022-07-29T20:00:00",
              "instructor_details": {
                "instructor_id": 9,
                "instructor_name": "Ana Ruiz"
              },
              "files": [
                {
                  "file_url": `${process.env.REACT_APP_URL_IMG}/miniaturaClase/fondoeducadorminedtv(4).png`,
                  "file_tag": "SincronicoSessionLive"
                }
              ]
            },
            {
              "live_sess_int_id": 110,
              "session_id": 211,
              "channel_id": 10,
              "session_title": "Técnicas de meditación",
              "session_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
              "start_time": "2022-07-30T20:00:00",
              "is_live": true,
              "expected_end_time": "2022-07-30T21:00:00",
              "is_favorite": true,
              "instructor_details": {
                "instructor_id": 10,
                "instructor_name": "Elena Sánchez"
              },
              "files": [
                {
                  "file_url": `${process.env.REACT_APP_URL_IMG}/miniaturaClase/fondoeducadorminedtv(4).png`,
                  "file_tag": "SincronicoSessionLive"
                }
              ]
            }
    ];

    // Efecto para cargar los datos al montar el componente
    useEffect(() => {
        setTimeout(() => {
            setSessions({ live_sessions: initialSessions });
            setCargando(false);
        }, 2000); // Simulando carga con delay como en tu ejemplo
    }, []);
    
    
    const getSessionDetails = (fileTag) => {
      //
      
      if (!sessions.live_sessions || !Array.isArray(sessions.live_sessions)){
        return []
      }
        return sessions.live_sessions.map(session => {
            const now = new Date();
            const endTime = new Date(session.expected_end_time);
            const msDiff = now - endTime;
            const minDiff = Math.floor(msDiff / (1000 * 60));
            const secDiff = Math.floor((msDiff / 1000) % 60);
    
            let timeSinceClose = "En vivo";
            
            //
            
            if (!session.is_live) {
                if (minDiff < 1) {
                    timeSinceClose = "Hace menos de un minuto";
                } else if (minDiff < 60) {
                    timeSinceClose = `Hace ${minDiff} minuto(s) y ${secDiff} segundo(s)`;
                } else if (minDiff < 1440) { // Menos de un día
                    const hoursDiff = Math.floor(minDiff / 60);
                    const minsLeft = minDiff % 60;
                    timeSinceClose = `Hace ${hoursDiff} hora(s) y ${minsLeft} minuto(s)`;
                } else {
                    const daysDiff = Math.floor(minDiff / 1440);
                    timeSinceClose = `Hace ${daysDiff} día(s)`;
                }
            }
            
            
            
            
    
            return {
                is_live: session.is_live,
                NombreCurso: session.session_title,
                descripcion: session.session_description || 'No disponible.', // Asumiendo que 'session_description' puede no estar presente.
                url_ImagenFondo: session.files.filter(file => file.file_tag === fileTag).map(file => file.file_url)[0],
                is_favorite: session.is_favorite, // Asumiendo que este campo se actualizará según la interacción del usuario.
                estadoClase: timeSinceClose,
                nombreEducador: session.instructor_details.instructor_name // Incluyendo el nombre del educador
            };
        });
    };
    
    
    const getSessionDetailsMin= (fileTag) => {
        return sessions.live_sessions.map(session => {
            return {
                nombre_curso: session.session_title,
                is_live: session.is_live,
                nombre_educador: session.instructor_details.instructor_name,
                imagen_canal:  session.files.filter(file => file.file_tag === fileTag).map(file => file.file_url)[0],
            };
        });
    };
    
    const getSessionDetailsBig = () => {
      return getSessionDetails(TAG.SincronicoSessionLive); };
    
    const getSessionDetailsMinLittle = () => {
      return getSessionDetailsMin(TAG.SincronicoSessionLive); //SincronicoSessionThumbnail
    };
    
    
    const getFilesCanal = (sessionList, channelId) => {
      //
      //
      
      const filteredSessions = sessionList.filter(session => session.channel_id == channelId);
      // Si existe al menos una sesión con el channel_id especificado, obtén los archivos de la primera
      if (filteredSessions.length > 0) {
          return filteredSessions[0].files;
      }
      return [];
    };
    
    const getImgStreamingEspera = (files) => {
        // Usamos find para buscar el archivo con el file_tag "img_streaming_espera"
        const imgStreamingEspera = files.find(file => file.file_tag === "img_streaming_espera");
    
        // Si se encuentra, devolvemos la URL del archivo
        if (imgStreamingEspera) {
            return imgStreamingEspera.file_url;
        }
    
        // Si no se encuentra, devolvemos null o un valor por defecto
        return [];
    };



    

    return { sessionList, getImgStreamingEspera ,sessions, cargando , getSessionDetailsBig  , getSessionDetailsMinLittle , getFilesCanal };
};
