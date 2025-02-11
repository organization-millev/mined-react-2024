import React, { useEffect, useState } from 'react';
import { apiLiveStreaming } from '../../api/apiConfig';
import { toast } from 'react-toastify';
import { convertToUtf8 } from '../../utils/funciones';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../providers/AlertContext';
import { useTranslation } from 'react-i18next';


export const useLiveStreamming = () => {
    const { t } = useTranslation();
    const { warn, success } = useAlert();
    const navigate = useNavigate();
    const [liveStreamming, setLiveStreamming] = useState([]);
    const [trigger, setTrigger] = useState(false);
    //const [sessionId, SetSessionId] = useState('12');
    const [channelId, setChannelId] = useState();
    const { data, error, cargando } = apiLiveStreaming(trigger, channelId);//, sessionId
    //
    const GetLiveStreamming = (id) => {
        setChannelId(id);
        setTrigger(true);
    };
    
    useEffect(() => {
        if (error && error.response && error.response.data && Array.isArray(error.response.data.data)) {
            const errorEntry = error.response.data.data.find(item => item.error_code === "0002");
            if (errorEntry) {
                warn(t('mensajeError'));
                navigate('/home');
            }
        }
    }, [error, navigate, warn]);



    useEffect(() => {
        if (data) {
            if (Array.isArray(data) && data.length > 0) {
                
                const extractedData = data.map(session => ({
                    channel_id: session.channel_id,
                    session_id: session.session_id,
                    chat_url: session.chat_url,
                    chsp_txt_code: session.chsp_txt_code,
                    chsp_txt_custom_id: session.chsp_txt_custom_id,
                    chsp_txt_url: session.chsp_txt_url,
                    providers: session.providers.map(provider => ({
                        concat_key: provider.concat_key,
                        provider_id: provider.provider_id,
                        provider_name: convertToUtf8(provider.provider_name),
                        streaming_url: provider.streaming_url,
                        usr_int_id:provider.usr_int_id,
                    }))
                }));
                
                setLiveStreamming(extractedData);
            } else {
                
            }
        } else if (error) {
            console.error('Error fetching live streaming data');
        }
        
    }, [data, error]);

    return { GetLiveStreamming, liveStreamming, cargando };
};