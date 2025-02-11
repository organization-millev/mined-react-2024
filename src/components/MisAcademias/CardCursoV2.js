// CardCurso.js
import React, { useState,useEffect } from 'react';
//import Guardar from '../iconos/bookmark.js'; 
//import Guardado from '../iconos/bookmark__fill.js'; 
import CustomFavoriteButton from '../common/CustomFavoriteButton/CustomFavoriteButton';
import BookMark from '../iconos/bookmark.js';
import BookMarkAmarillo from '../iconos/bookMarkAmarillo.js';
import { useCourseFavorite } from '../../hooks/favorite/useCourseFavorite';
import { useAcademia } from '../../providers/AcademiaContext';
import BookMarkDark from '../iconos/bookmark_dark.js';
import BookmarkLoader from '../iconos/bookmarkLoader.js';
import { useNavigation } from '../../providers/NavigationContext';
import './MisAcademias.css'

const CardCursoV2 = ({ cour_int_id, course_name , curso_foto_miniatura, count_modules , count_lessons,sum_hours,is_favorite,tag,programId}) => {
    
    const CONTENT_CONTAINER_CLASS = "px-4 py-4 h-[92px]";
    const TITLE_CLASS = "dark:text-blanco font-bold text-base lg:text-xl text-gris-azulado-profundo line-clamp-1";
    const DESCRIPTION_CLASS = "text-zinc-700 text-sm";
        
    const { goToAcademyCursoClase , goToAcademyCurso } = useNavigation();

    const { formatForURL,getTeachersByCourseId } = useAcademia();
    
    useEffect(() => {
        
    }, []);
    
    
    const teachers = getTeachersByCourseId(programId,cour_int_id);
    
    
    const fondo = teachers.length > 0 ? teachers[0].color : '';
    
    const { guardarCurso } = useCourseFavorite();
    const [isBookmarked, setIsBookmarked] = useState(is_favorite);
    const handleSubmit = () => {
            //alert(formValues.tipoConsulta)
            guardarCurso(cour_int_id,2,true);
        };
    const toggleBookmark = () => {
            setIsBookmarked(prevState => !prevState);
            handleSubmit();
        };
        
        
    const [isLoadingBookmark, setIsLoadingBookmark] = useState(false);
    
    const toggleBookmarkCurso = (event) => {
        setIsLoadingBookmark(true); // Mostrar el cargando
        event.stopPropagation();  // Detiene la propagación del evento al contenedor padre
        handleSubmit();
        setTimeout(() => {
            setIsBookmarked(prevState => !prevState);// Cambiar el estado de bookmark
            setIsLoadingBookmark(false); // Ocultar el cargando después de 1 segundo
        }, 1500); // 1000 milisegundos = 1 segundo
    };    
    
    
    const handleClick = () => {
        const formattedTag = formatForURL(tag);
        const formattedTitle = formatForURL(course_name);

        window.scrollTo({ top: 0, behavior: 'smooth' });
        goToAcademyCurso(formattedTag, formattedTitle);
    };
    
    const formatDuration = (duration) => {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        
        let formattedDuration = '';
        
        if (hours > 0) {
            formattedDuration += `${hours} ${hours > 1 ? 'horas' : 'hora'} `;
        }
        
        if (minutes > 0) {
            formattedDuration += `${minutes} ${minutes > 1 ? 'min' : 'min'}`;
        }
        
        return formattedDuration.trim();
    };
    
    
        
    return (
        
        <div onClick={handleClick} >
            
            <div className="card-cursov2-estilo cursor-pointer max-w-sm rounded overflow-hidden dark:bg-color-dark bg-blanco w-[250px] lg:w-[260px] lg:!h-auto xl:w-[350px] !h-[234px] shadow-custom-strong rounded-[20px]  md:flex md:flex-col hover:text-gris-azulado-profundo group">
                <div className="relative w-full">
                    <img className="w-full h-[142px] lg:h-[199px]" src={curso_foto_miniatura} alt="Course image" />
                   
                    <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-blanco absolute top-0 right-0 mt-2 mr-2" style={{ background: fondo || null }}>{tag}</span>
                    
                    
                    <div className="flex items-center justify-center dark:bg-color-dark bg-blanco w-[30px] h-[30px] rounded-full p-[3px] absolute top-[75%] right-0 mr-2" 
                         onClick={(event) => toggleBookmarkCurso(event)} >
                        
                        
                        {isLoadingBookmark ? (
                            <BookmarkLoader className="m-[4px] transition-opacity duration-300 ease-in-out opacity-100" />
                        ) : isBookmarked ? (
                            <BookMarkAmarillo className="w-[17px] h-[17px] m-[4px] transition-opacity duration-300 ease-in-out opacity-100" />
                        ) : (
                            <>
                                <BookMark className="dark:hidden w-[24px] h-[24px] transition-opacity duration-300 ease-in-out opacity-100" />
                                <BookMarkDark className="dark:!block !hidden w-[18px] h-[18px] transition-opacity duration-300 ease-in-out opacity-100" />
                            </>
                        )}
                    </div>
                </div>
            
                <div className={CONTENT_CONTAINER_CLASS}>
                    <div className={TITLE_CLASS}>{course_name}</div>
                    
                       
                        <div className="font-sans text-small 2xl:text-[13px] font-medium text-gris-oscuro items-center gap-3 divide-x divide-gris-oscuro md:pr-[10px] hidden 2xl:flex">
                            <p className="2xl:pr-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white">Módulos {count_modules}</p>
                            <p className="px-2 2xl:px-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white">Sesiones {count_lessons}</p>
                            <p className="px-2 2xl:px-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white">{formatDuration(sum_hours)}</p>
                        </div>
                        
                        <div className="font-sans text-small font-medium text-gris-oscuro items-center gap-2 divide-x divide-gris-oscuro flex 2xl:hidden">
                            <p className="2xl:pr-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white">Módulos {count_modules}</p>
                            <p className="px-2 2xl:px-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white">Sesiones {count_lessons}</p>
                            <p className="px-2 2xl:px-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white">{formatDuration(sum_hours)} </p>
                        </div>
                        
                    
                </div>
            
            </div>

        </div>

    );
};

export default CardCursoV2;
