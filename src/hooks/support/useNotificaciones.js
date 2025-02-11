import React, { useEffect, useState } from 'react';
import { apiSupportNotifications } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useNotificaciones = () => {
    
    const [notificaciones, setNotificaciones] = useState([]);
    const [paginacion, setPaginacion] = useState([]);
    
    const [trigger, setTrigger] = useState(false);
    
    const [limit, setLimit] = useState(20);
    const [page_number, setPage_number] = useState(1);
    const { data, error } = apiSupportNotifications(trigger,limit,page_number);
     const [loading, setLoading] = useState(false); // Estado de carga
     
    const GetNotifications = () => {
        setTrigger(true);
    };
    
    //
    //

    
      useEffect(() => {
        if (trigger) {
            setLoading(true); 

            if (data) {
                if (Array.isArray(data) && data.length > 0) {
                    const extractedNotificacions = data[0].notifications.map(notificacion => ({
                        not_int_id: notificacion.not_int_id,
                        serv_int_id: notificacion.serv_int_id,
                        nch_int_id: notificacion.nch_int_id,
                        not_txt_image_url: notificacion.not_txt_image_url,
                        not_txt_type: notificacion.not_txt_type,
                        not_txt_desc:notificacion.not_txt_desc,
                        not_txt_title: notificacion.not_txt_title,
                        not_dt_registration: notificacion.not_dt_registration,
                        not_txt_all: notificacion.not_txt_all,
                        is_viewed: notificacion.is_viewed,
                    }));

                    const extractedPagination = {
                        total_rows: data[0].pagination[0].total_rows,
                        total_pages: data[0].pagination[0].total_pages,
                    };

                    setNotificaciones(extractedNotificacions);
                    setPaginacion(extractedPagination);
                } else {
                    
                }
            }

            if (error) {
                console.error('Error al cargar notificaciones');
            }

            setLoading(false); // Terminamos la carga
        }
    }, [data, error, trigger]);
    
    
    return { GetNotifications, notificaciones,paginacion,loading };
}
