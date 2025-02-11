import React, { useState,useEffect } from 'react';
import BookMark from '../../iconos/bookmark.js';
import BookMarkDark from '../../iconos/bookmark_dark.js';

import BookMarkAmarillo from '../../iconos/bookMarkAmarillo.js';

import BookmarkLoader from '../../iconos/bookmarkLoader.js';


import { useNavigate } from 'react-router-dom';
import { useAcademia } from '../../../providers/AcademiaContext';
import { useCourseFavorite } from '../../../hooks/favorite/useCourseFavorite';
import { useNavigation } from '../../../providers/NavigationContext';


const CardCursos = (props) => {
   
    const { imageSrc, titulo, modulo, clases, duracion, moduloCompleto, clasesCompletas, duracionCompletas, tagCurso,favorite_is_enabled, isAsynchronous, 
            isSynchronous, course_id , program_id } = props;
    
    //
    //
    const {  goToAcademyCurso } = useNavigation();
    
    const { guardarCurso } = useCourseFavorite();
    const [isBookmarked, setIsBookmarked] = useState(favorite_is_enabled);
    const navigate = useNavigate();
    useEffect(() => {
        setIsBookmarked(favorite_is_enabled);
    }, [favorite_is_enabled]);
    const handleSubmit = () => {
        //alert(formValues.tipoConsulta)
        guardarCurso(course_id,2,true);
    };
    
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    //RUTAS
    const { getNameByIds ,getIdsByName,getTeachersByCourseId } = useAcademia();
    const idProgram = getIdsByName(program_id, null ,language_code);
    const ids = getNameByIds(idProgram.programId, course_id , language_code);
    
    const teachers = getTeachersByCourseId(idProgram.programId,course_id);
    const fondo = teachers.length > 0 ? teachers[0].color : '';
    
    const handleClick = () => {
        //navigate(`/academy/${ids.programName}/curso/${ids.courseName}`);
        goToAcademyCurso(ids.programName,ids.courseName);
    };
    
    const [isLoadingBookmark, setIsLoadingBookmark] = useState(false);

    
    const toggleBookmark = () => {
        setIsLoadingBookmark(true);
        handleSubmit();
        setTimeout(() => {
            setIsBookmarked(prevState => !prevState);
            setIsLoadingBookmark(false);
        }, 1500);
    };
    
    return (
        <div onClick={handleClick} className="group rounded-[20px] bg-white dark:bg-color-dark overflow-hidden shadow-custom-strong flex h-[100px] md:h-[auto] md:w-auto md:block cursor-pointer">
            <div className="relative w-[60%] md:w-full">
                <img className="h-[100px] object-cover w-full md:h-[199px]" src={imageSrc} alt="curso" />
                {tagCurso && (
                    <span className="hidden md:block inline-block font-sans rounded-[20px] px-3 py-1 text-xs font-semibold text-blanco absolute top-0 right-0 mt-2 mr-2" style={{ background: fondo || null }}>{tagCurso}</span>
                )}
                <div className="hidden md:block dark:bg-color-dark absolute bottom-2 right-2 bg-white w-[30px] h-[30px] rounded-full flex items-center justify-center hidden md:flex cursor-pointer z-90"
                    onClick={(e) => { e.stopPropagation(); toggleBookmark();}}>
                    
                    
                    
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
            
            <div className="px-2 py-2 w-full flex flex-col justify-center">
                
               <div className="md:hidden  flex flex-row items-center justify-end px-2">
                    <div onClick={(e) => { e.stopPropagation(); toggleBookmark();}}
                         className=" w-[24px] h-[24px] flex-items-center justify-center">
                         
                        {isBookmarked ? (
                            <BookMarkAmarillo className="w-[17px] h-[17px] m-[4px] transition-opacity duration-300 ease-in-out opacity-100" />
                        ) : (
                            <>
                                <BookMark className="dark:hidden w-[24px] h-[24px] transition-opacity duration-300 ease-in-out opacity-100" />
                                <BookMarkDark className="dark:!block !hidden w-[18px] h-[18px] transition-opacity duration-300 ease-in-out opacity-100" />
                            </>
                        )}
                    </div>
                </div>  
                
                
               <div className="relative md:static md:bottom-0" style={{ bottom: "10px"}}>
 
                    <p className="font-bold text-sm md:text-xl md:px-[10px] text-gris-azulado-profundo font-sans dark:text-blanco mb-[10px] md:mb-0">{titulo}</p>
                    {(moduloCompleto || clasesCompletas || duracionCompletas) && (
                        <div className="font-sans text-small lg:text-[13px] 2xl:text-medium font-medium text-gris-oscuro items-center gap-3 hidden md:flex divide-x divide-gris-oscuro md:px-[10px]">
                            {moduloCompleto && <p className="pr-2 2xl:pr-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white dark:text-gris-medio">{moduloCompleto}</p>}
                            {clasesCompletas && <p className="px-2 2xl:px-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white dark:text-gris-medio">{clasesCompletas}</p>}
                            {duracionCompletas && <p className="px-2 2xl:px-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white dark:text-gris-medio">{duracionCompletas}</p>}
                        </div>
                    )}
                    <div className="font-sans text-xs font-medium text-gris-oscuro flex items-center gap-3 md:hidden">
                        <p>{modulo}</p>
                        <p>{clases}</p>
                        <p>{duracion}</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default CardCursos;