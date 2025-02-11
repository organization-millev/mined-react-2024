import React, { useState, useEffect, useRef } from 'react';
import ValoracionDetalle from '../ValoracionDetalle/ValoracionDetalle.js';
import CourseRating from '../common/CourseRating/CourseRating.js';
import InputArea from '../common/InputArea/InputArea.js';
import CalificacionEstrellas from '../CalificacionEstrellas/CalificacionEstrellas.js';
import CustomSaberMas from '../common/CustomSaberMas/CustomSaberMas.js';
import CalificacionesRating from '../common/CalificacionesRating/CalificacionesRating.js';

import { useAlert } from '../../providers/AlertContext';
import { useSaveRatingCourse } from '../../hooks/async/useSaveRatingCourse';
import { useRatingCourse } from '../../hooks/async/useRatingCourse';

const ValoracionCurso = ({ courseId ,selectedIdModulo}) => {
    
    const { valoracionList, reviews,GetRatingsList, trigger, setTrigger } = useRatingCourse(courseId);
     useEffect(() => {
        if (courseId) {
            GetRatingsList();
        }
    }, [courseId]);
    const { warn, success } = useAlert();
    const { registrarValoracionCourse, isSuccess  } = useSaveRatingCourse();
    useEffect(() =>{
        if (isSuccess === true){
            GetRatingsList();
            //alert('12345');
            
        }
    },[isSuccess])
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [showForm, setShowForm] = useState(false);
    //const [lessonId, setLessonId] = useState('123');
   
    const [valoraciones, setValoraciones] = useState(valoracionList);
    const [comentarios, setComentarios] = useState(reviews);
    const [newRatingRegistered, setNewRatingRegistered] = useState(false)
   
      useEffect(() => {
            setValoraciones(valoracionList);
            setComentarios(reviews);
            setNewRatingRegistered(false);
        }, [valoracionList, reviews, newRatingRegistered]);
    
    
     const [courseRating, setCourseRating] = useState(0);
    const [ratingData, setRatingData] = useState([]);
    
     const [testimonios, setTestimonios] = useState([]);

     useEffect(() => {
        // Recalcular el rating general y el ratingData cada vez que cambian las valoraciones
        const newCourseRating = valoraciones.length > 0
            ? valoraciones.reduce((sum, item) => sum + item.average_rating, 0) / valoraciones.length
            : 0;

        const totalRatings = valoraciones.reduce((sum, item) => sum +
            (item.rating_5_count || 0) + 
            (item.rating_4_count || 0) + 
            (item.rating_3_count || 0) + 
            (item.rating_2_count || 0) + 
            (item.rating_1_count || 0), 0);

        const newRatingData = valoraciones.length > 0 ? [
            { stars: 5, percentage: Math.round(((valoraciones[0].rating_5_count || 0) / totalRatings) * 100) || 0 },
            { stars: 4, percentage: Math.round(((valoraciones[0].rating_4_count || 0) / totalRatings) * 100) || 0 },
            { stars: 3, percentage: Math.round(((valoraciones[0].rating_3_count || 0) / totalRatings) * 100) || 0 },
            { stars: 2, percentage: Math.round(((valoraciones[0].rating_2_count || 0) / totalRatings) * 100) || 0 },
            { stars: 1, percentage: Math.round(((valoraciones[0].rating_1_count || 0) / totalRatings) * 100) || 0 },
        ] : [];

        setCourseRating(newCourseRating);
        setRatingData(newRatingData);
    }, [valoraciones]);
    
    
    useEffect(() => {
        const updatedTestimonios = comentarios.map(review => ({
            imgUrl: review.user_avatar,
            calificacionEstrella: review.rating,
            comentario: review.comment,
        }));
        setTestimonios(updatedTestimonios);
    }, [comentarios]);
    
    
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    const handleCommentChange = (newComment) => {
        setComment(newComment);
    };
    
    const handleSubmitComentarios = () => {
        if (rating > 0 && comment.trim() !== '') {
            registrarValoracionCourse(rating, comment, selectedIdModulo, true);
            
            const newValoracion = {
                average_rating: rating,
                rating_5_count: rating === 5 ? 1 : 0,
                rating_4_count: rating === 4 ? 1 : 0,
                rating_3_count: rating === 3 ? 1 : 0,
                rating_2_count: rating === 2 ? 1 : 0,
                rating_1_count: rating === 1 ? 1 : 0,
            };

            setValoraciones(prevValoraciones => {
                if (prevValoraciones.length > 0) {
                    const updatedValoraciones = [...prevValoraciones];
                    
                    // Actualizar los contadores de estrellas en el objeto correspondiente
                    updatedValoraciones[0].rating_5_count += newValoracion.rating_5_count;
                    updatedValoraciones[0].rating_4_count += newValoracion.rating_4_count;
                    updatedValoraciones[0].rating_3_count += newValoracion.rating_3_count;
                    updatedValoraciones[0].rating_2_count += newValoracion.rating_2_count;
                    updatedValoraciones[0].rating_1_count += newValoracion.rating_1_count;

                    // Recalcular average_rating
                    const totalRatings = (updatedValoraciones[0].rating_5_count + updatedValoraciones[0].rating_4_count +
                        updatedValoraciones[0].rating_3_count + updatedValoraciones[0].rating_2_count + 
                        updatedValoraciones[0].rating_1_count);
                    updatedValoraciones[0].average_rating = (updatedValoraciones[0].average_rating * (totalRatings - 1) + rating) / totalRatings;
                    
                    return updatedValoraciones;
                } else {
                    return [...prevValoraciones, newValoracion];
                }
            });

            setComentarios([{ user_avatar: '' , rating, comment }, ...comentarios]);
            
            
            setRating(0);
            setComment('');
        } else {
            warn('Por favor, completa todos los campos antes de enviar tu valoración.');
        }
    };
    
    const handleShowForm = () => {
        setShowForm(true);
    };

    return (
        <>
            <div className="w-full font-sans  text-largeB lg:text-[24px] font-semibold text-gris-azulado-profundo dark:text-blanco mb-[18px] lg:mb-0  ">
                <p>Valoraciones del curso </p>
            </div>
            <div className="w-full grid grid-cols- md:grid-cols-2 mb-[30px]">
                <div className="col-span-1 md:col-span-1 gap-4 lg:gap-0 w-full flex flex-row md:flex-col">
                    
                        <CourseRating rating={courseRating} className="w-1/2 md:w-auto"/>
                    <div className="w-1/2 md:w-[70%]">
                        <CalificacionesRating ratingData={ratingData} />
                    </div>
                    
                    
                </div>
                
                <div className="col-span-1 md:col-span-1 md:flex flex-col space-y-4 hidden">
                    <div className="flex justify-end">
                        <CalificacionEstrellas onRatingChange={handleRatingChange} rating={rating}/>
                    </div>
                    
                    <InputArea placeholder="Déjanos tu opinión sobre el educador" value={comment} onChange={handleCommentChange} />
                    
                    <div className="flex justify-end">
            
                        <button onClick={handleSubmitComentarios} className="boton-primario dark:boton-secundario dark:!font-bold dark:text-sm " >Enviar </button>
                    </div>
                </div>
                
                
                {!showForm && (
                    <button className="md:hidden boton-primario text-xs font-semibold  !rounded-[40px] !py-[15px] mt-[32px] mb-[16px]" onClick={handleShowForm}>Dejar una valoración</button>
                )}
    
                {showForm && (
                    <div className="md:hidden flex flex-col gap-4 mt-[32px]">
                        <CalificacionEstrellas onRatingChange={handleRatingChange} rating={rating} />
                        <InputArea placeholder="Déjanos tu opinión sobre el educador" value={comment} onChange={handleCommentChange} />
                        <button className="boton-primario" onClick={handleSubmitComentarios}>
                            Enviar
                        </button>
                    </div>
                )}
       
            </div>

            {testimonios.length > 0 && <ValoracionDetalle testimonios={testimonios} />}
            
        </>
    );
};

export default ValoracionCurso;
