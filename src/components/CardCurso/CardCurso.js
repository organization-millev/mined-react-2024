// CardCurso.js
import React, { useState,useEffect } from 'react';
import Guardar from '../iconos/bookmark.js'; 
import Guardado from '../iconos/bookMarkAmarillo.js'; 
import BookMark from '../iconos/bookmark.js';
import BookMarkDark from '../iconos/bookmark_dark.js';

import BookMarkAmarillo from '../iconos/bookMarkAmarillo.js';
import BookmarkLoader from '../iconos/bookmarkLoader.js';

import { useCourseFavorite } from '../../hooks/favorite/useCourseFavorite';
import { useNavigate } from 'react-router-dom';
import './CardCurso.css'
import CustomFavoriteButton from '../common/CustomFavoriteButton/CustomFavoriteButton';
import { useAcademia } from '../../providers/AcademiaContext';
import { useNavigation } from '../../providers/NavigationContext';


const CONTENT_CONTAINER_CLASS = "px-4 py-4 min-h-[92px]";
const TITLE_CLASS = "dark:text-blanco font-bold text-base lg:text-xl text-gris-azulado-profundo line-clamp-1";
const DESCRIPTION_CLASS = "text-zinc-700 text-sm";



const CardCurso = ({ title,titleCurso , tag , imageUrl, modulo,clases,duracion,programId,idCurso,isFavorite,idClass,isDetail = true,lessionNombre }) => {
    
    const { formatForURL,getTeachersByCourseId } = useAcademia();
    
    const { goToAcademyCursoClase , goToAcademyCurso } = useNavigation();
    
    const { guardarCurso } = useCourseFavorite();
    
    const [isBookmarked, setIsBookmarked] = useState(isFavorite);
    
    const navigate = useNavigate();
 
    useEffect(() => {
        setIsBookmarked(isFavorite);
    }, [isFavorite]);
    
    const handleSubmit = () => {
        guardarCurso(idCurso,2,true);
    };
    
    const [isLoadingBookmark, setIsLoadingBookmark] = useState(false);
    const toggleBookmark = (event) => {
        setIsLoadingBookmark(true); // Mostrar el cargando
        event.stopPropagation();  // Detiene la propagación del evento al contenedor padre
        handleSubmit();
        setTimeout(() => {
            setIsBookmarked(prevState => !prevState);// Cambiar el estado de bookmark
            setIsLoadingBookmark(false); // Ocultar el cargando después de 1 segundo
        }, 1500); // 1000 milisegundos = 1 segundo
    };

    const teachers = getTeachersByCourseId(programId,idCurso);
    const fondo = teachers.length > 0 ? teachers[0].color : '';
    
    
    const handleClick = () => {
        const formattedTag = formatForURL(tag);
        const formattedTitle = formatForURL(titleCurso);
        
     

        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        //puse esto porque en wath curso recomendado la variable de titulo e sigual al nombre del curspo perodeberedirigir a la lession
        if(title==titleCurso){
            if (isDetail) {
                goToAcademyCursoClase(formattedTag,formattedTitle,encodeURIComponent(formatForURL(lessionNombre)) , { idClass })
            } else {
                goToAcademyCurso(formattedTag,formattedTitle);
            }
        }else{
            if (isDetail) {
                goToAcademyCursoClase(formattedTag,formattedTitle,encodeURIComponent(formatForURL(title)) , { idClass })
            } else {
                goToAcademyCurso(formattedTag,formattedTitle);
            }
        }
            
    };
    
    return (
    
    
    
    <div  onClick={handleClick} >
        <div className="card-curso-estilo cursor-pointer max-w-sm rounded overflow-hidden dark:bg-color-dark bg-blanco w-full  !h-auto xl:w-[365px] !h-[213px] shadow-custom-strong rounded-[20px] hidden md:flex md:flex-col hover:text-gris-azulado-profundo group">
            <div className="relative w-full">
                <img className="w-full h-[142px] lg:h-[199px]" src={imageUrl} alt="Course image" />
                <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-blanco absolute top-0 right-0 mt-2 mr-2" style={{ background: fondo || null }}>{tag}</span>
                <div className="flex items-center justify-center dark:bg-color-dark bg-blanco w-[30px] h-[30px] rounded-full p-[3px] absolute top-[75%] right-0 mr-2" 
                     onClick={(event) => toggleBookmark(event)} >
                    
                    
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
                <div className={TITLE_CLASS}>{title}</div>
                {(modulo || clases || duracion) && (
                    <>
                    <div className="font-sans text-small 2xl:text-[13px] font-medium text-gris-oscuro items-center  divide-x divide-gris-oscuro md:pr-[10px] hidden 2xl:flex">
                        <p className="2xl:pr-3 my-2 px-[16px] group-hover:text-gris-azulado-profundo dark:group-hover:text-white">{`Módulo ${modulo}`}</p>
                        <p className="px-[16px] 2xl:px-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white">{`Sesiones ${clases}`}</p>
                        <p className="px-[16px] 2xl:px-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white">{duracion}</p>
                    </div>
                    
                    <div className="font-sans text-small font-medium text-gris-oscuro items-center gap-2 divide-x divide-gris-oscuro flex 2xl:hidden">
                        <p className="2xl:pr-3 my-2 px-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white">{`Mód ${modulo}`}</p>
                        <p className="px-2 2xl:px-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white">{`Sesiones ${clases}`}</p>
                        <p className="px-2 2xl:px-3 my-2 group-hover:text-gris-azulado-profundo dark:group-hover:text-white">{duracion}</p>
                    </div>
                    </>
                )}
            </div>
            
        </div>


        {/*----------*/}
        
        <div className = "flex flex-row w-full max-h-[100px]  rounded-[20px] bg-blanco	overflow-hidden  dark:bg-color-dark md:hidden shadow-custom-strong">
            <div className="w-2/5 ">
                <img src={imageUrl} className="h-full rounded-l-lg w-full" />
            </div>

            <div className="w-3/5  h-[100px] font-sans	py-[7px] flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between px-2">
                    <button className="p-1 rounded-full text-xs text-blanco font-semibold dark:text-blanco" style={{ background: fondo || null }}>{tag}</button>
                    <div onClick={(event) => toggleBookmark(event)}
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
                
                <p className="text-[13px] ml-2 font-semibol dark:text-blanco line-clamp-1">{title}</p>
                
                {(modulo || clases || duracion) && (
                    <div className="font-sans text-[10px] font-medium text-gris-oscuro items-center gap-3 flex ml-2">
                        <p className="group-hover:text-gris-azulado-profundo">{`Mód ${modulo}`}</p>
                        <p className="group-hover:text-gris-azulado-profundo">{`Clases ${clases}`}</p>
                        <p className="group-hover:text-gris-azulado-profundo">{duracion}</p>
                    </div>
                )}
            </div>
        </div> 
        
    </div>
    
    );
};

export default CardCurso;
