import { useEffect, useState } from 'react';
import { apiLiveSessionArchive } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useLiveSessionArchive = (channelId) => {
    const { warn, success } = useAlert();
    const [archivos, setArchivo] = useState([]);
    //const [channelId, setChannelId] = useState(14);
    const [trigger, setTrigger] = useState(false);

    const { data, error, cargando } = apiLiveSessionArchive(trigger, channelId);

    const GetLiveSessionArchive = () => {
        setTrigger(true);
    };
    
    useEffect(()=>{
        if(trigger === true){
            setTrigger(false)
        }
    },[trigger])
    
    const formatDate = (dateString) => {
      try {
        if (typeof dateString !== 'string' || !dateString.includes('-')) {
          throw new Error('El formato de la fecha es inválido');
        }
    
        const [year, month, day] = dateString.split("-");
    
        if (!year || !month || !day || year.length !== 4 || month.length !== 2 || day.length !== 2) {
          throw new Error('El formato de la fecha es inválido');
        }
    
        return `${day}/${month}/${year.slice(-2)}`;
      } catch (error) {
        console.error('Error al formatear la fecha:', error.message);
        return null; 
      }
    };

    useEffect(() => {
        if (data) {
            if (Array.isArray(data) && data.length > 0) {
                const extractedData = data.map(session => ({
                    channelId: session.channel_id,
                    sessionId: session.session_id,
                    playlists: (session.playlists || []).map(playlist => ({
                        playlistId: playlist.playlist_id,
                        playlistName: playlist.playlist_name,
                        playlistDescription: playlist.playlist_description,
                        playlistSubtitle: playlist.playlist_subtitle,
                        /*videos: (playlist.videos || []).map(video => {
                            return {
                                videoId: video.video_id,
                                videoTitle: video.video_title,
                                videoUrl: video.video_url,
                                videoPortada: video.video_url_cover,
                                videoDescription: video.video_description,
                                videoCreatedDate: formatDate(video.video_recordated_date),
                                videoCreatedDateComplete: video.video_recordated_date,
                                tags: (video.tags || []).map(tag => ({
                                    tagId: tag.tag_id,
                                    tagName: tag.tag_name
                                }))
                            };
                        })*/
                        videos: (playlist.videos || [])
                            .map(video => ({
                                videoId: video.video_id,
                                videoTitle: video.video_title,
                                videoUrl: video.video_url,
                                videoPortada: video.video_url_cover,
                                videoDescription: video.video_description,
                                videoCreatedDate: formatDate(video.video_recordated_date),
                                videoCreatedDateComplete: video.video_recordated_date,
                                tags: (video.tags || []).map(tag => ({
                                    tagId: tag.tag_id,
                                    tagName: tag.tag_name
                                }))
                            }))
                            //.sort((a, b) => new Date(b.videoCreatedDateComplete) - new Date(a.videoCreatedDateComplete))
                    })),
                    channelPlaylists: (session.channel_playlists || []).map(playlist => ({
                        playlistId: playlist.playlist_id,
                        playlistName: playlist.playlist_name
                    })),
                    tags: session.tags || []
                }));

                setArchivo(extractedData);

                if (extractedData.length === 0) {
                    
                }
            } else {
                
            }
        } else if (error) {
            
        }
    }, [data, error]);
    
    
    const generateTagList = () => {
        const tagList = [];

        archivos.forEach(channel => {
            channel.playlists.forEach(playlist => {
                playlist.videos.forEach(video => {
                    video.tags.forEach(tag => {
                        // Añadir solo si no está duplicado
                        if (!tagList.find(t => t.valor === tag.tagId)) {
                            tagList.push({ nombre: tag.tagName, valor: tag.tagId });
                        }
                    });
                });
            });
        });

        return tagList;
    };


    return {
        GetLiveSessionArchive, archivos , setArchivo, generateTagList
    };
};