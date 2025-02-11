import React, { useEffect, useState } from 'react';
import { apiAsyncRatings } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useRatingCourse = (courseId) => {
    const [valoracionList, setValoracionList] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [trigger, setTrigger] = useState(false);
    //const [courseId, setCourseId] = useState('4');
    const { data, error, cargando } = apiAsyncRatings(trigger, courseId);

    const GetRatingsList = () => {
        setTrigger(true);
        //
    };

    useEffect (() => {
        if (trigger === true){
            setTrigger(false);
        }
        //
    },[trigger]);

    useEffect(() => {
        if (data) {
            if (Array.isArray(data)) {
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
                        rating: review.rate_int_rating, // Puedes ajustar esto según tus necesidades
                    }))
                );

                setValoracionList(extractedData);
                setReviews(extractedReviews);
                setLoading(false); // Actualiza el estado de carga a falso

                if (data.length === 0) {
                    
                }
            } else {
                //
                setLoading(false); // Actualiza el estado de carga a falso incluso en caso de error
            }
        } else if (error) {
            //console.error('Error fetching ratings');
            setLoading(false); // Actualiza el estado de carga a falso en caso de error
        }
    }, [data, error]);

    return { GetRatingsList, valoracionList, reviews, loading, cargando, trigger,setTrigger };
};