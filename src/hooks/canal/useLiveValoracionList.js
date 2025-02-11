import React, { useEffect, useState } from 'react';
import { apiLiveRatings } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useLiveValoracionList = (channelId) => {
    const [valoracionList, setValoracionList] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [trigger, setTrigger] = useState(false);
    //const [channelId, setChannelId] = useState('14');
    const { data, error, cargando } = apiLiveRatings(trigger, channelId);

    const GetValoracionList = () => {
        setTrigger(true);
    };
    
    useEffect(() => {
        if(setTrigger){
            setTrigger(false)
        }
    },[setTrigger])
    
    const getInitials = (name) => {
        if (!name) return "";
        name = name.trim().replace(/\.+$/, '');
    
        const nameArray = name.split(' ').filter(Boolean);
        if (nameArray.length >= 2) {
            const firstName = nameArray[0];
            const firstLastName = nameArray[2] || nameArray[1];
            const initials = (firstName[0] || "") + (firstLastName[0] || "");
            return initials.toUpperCase();
        }
        return nameArray[0] ? nameArray[0][0].toUpperCase() : '';
    };

    useEffect(() => {
        if (data && Array.isArray(data)  && data.length > 0 ) {
            
           
                const extractedData = data.map(course => ({
                    course_id: course.course_id,
                    average_rating: course.average_rating,
                    total_reviews: course.total_reviews,
                    rating_5_count: course.rating_5_count,
                    rating_4_count: course.rating_4_count,
                    rating_3_count: course.rating_3_count,
                    rating_2_count: course.rating_2_count,
                    rating_1_count: course.rating_1_count
                }));

                const extractedReviews = data.flatMap(course => 
                    course.reviews.map(review => ({
                        rate_int_id: review.rate_int_id,
                        comment: review.rate_comment,
                        user_avatar: review.user_avatar,
                        rating: review.rate_dec_rating, // Puedes ajustar esto según tus necesidades
                        rateEnable:review.rate_txt_enable,
                        user_name:getInitials(review.user_name),
                    }))
                ).reverse();

                setValoracionList(extractedData);
                setReviews(extractedReviews);
                setLoading(false); // Actualiza el estado de carga a falso

                if (data.length === 0) {
                    
                }
          
        } else if (error) {
            
          
            setValoracionList([]);
            setReviews([]) 
            
            //toast.warn("errror",'Error fetching ratings');
            setLoading(false); // Actualiza el estado de carga a falso en caso de error
        }
    }, [data, error]);

    return { GetValoracionList, valoracionList, reviews, loading, cargando };
};