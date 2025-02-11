import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardCurso from '../CardCurso/CardCurso';
import FlechaIz from '../iconos/arrow_circle_right.js';
import FlechaDer from '../iconos/arrow_circle_left.js';

import FlechaIzDark from '../iconos/circle_right_blanco.js';
import FlechaDerDark from '../iconos/circle_left_blanco.js';


const CarouselCurso = ({tituloCarouselCurso, subtitulo, icono, showArrows="true", cursos,isDetail}) => {

    const sliderRef = useRef();
    
    const [slidesToShow, setSlidesToShow] = useState(3);
    
    const [isFirstSlide, setIsFirstSlide] = useState(false);
    const [isLastSlide, setIsLastSlide] = useState(false);
    
  
    const updateSlidesToShow = () => {
        const width = window.innerWidth;
        if (width >= 2133) {
            setSlidesToShow(3);
        } else if (width >= 1920) {
            setSlidesToShow(3);
        } else if (width >= 1600) {
            setSlidesToShow(3);
        } else if (width >= 1440) {
            setSlidesToShow(3);
        } else if (width >= 1280) {
            setSlidesToShow(3);
        }else if (width >= 1040) {
            setSlidesToShow(3);
        } else if (width >= 1024) {
            setSlidesToShow(3);
        } else if (width >= 900) {
            setSlidesToShow(3.2);
        } else if (width >= 800) {
            setSlidesToShow(2.8);
        } else if (width >= 768) {
            setSlidesToShow(2.7);
        } else {
            setSlidesToShow(1.5);
        }
    };

    useEffect(() => {
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 900,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
        nextArrow: <FlechaDer />,
        prevArrow: <FlechaIz />,
        beforeChange: (current, next) => handleBeforeChange(current, next),
        afterChange: (current) => handleAfterChange(current),
    };
    
    
    
        useEffect(() => {
        // Verificar la cantidad de cursos y deshabilitar ambos botones si hay menos de 3
        if (cursos.length < 3) {
            setIsFirstSlide(true);
            setIsLastSlide(true);
        } else {
            // Resetear los valores cuando hay 3 o más cursos
            setIsFirstSlide(false);
            setIsLastSlide(false);
        }
    }, [cursos.length]);
    
    
    const handleBeforeChange = (currentSlide, nextSlide) => {
        if (currentSlide === 0 && nextSlide === cursos.length - 1) {
            setIsFirstSlide(true);
            setIsLastSlide(false);
        } else if (currentSlide === cursos.length - 1 && nextSlide === 0) {
            setIsFirstSlide(false);
            setIsLastSlide(true);
        } else {
            setIsFirstSlide(false);
            setIsLastSlide(false);
        }
    };

    const handleAfterChange = (currentSlide) => {
    if (cursos.length < 3) {
        // Si hay menos de 3 cursos, no hay suficiente para desplazarse, deshabilitar ambos botones
        setIsFirstSlide(true);
        setIsLastSlide(true);
    } else {
        if (currentSlide === 0) {
            // Estamos en la primera diapositiva
            setIsFirstSlide(true);
            setIsLastSlide(false);
        } else if (currentSlide + slidesToShow >= cursos.length) {
            // Estamos en la última diapositiva
            setIsFirstSlide(false);
            setIsLastSlide(true);
        } else {
            // Estamos en una diapositiva intermedia
            setIsFirstSlide(false);
            setIsLastSlide(false);
        }
    }
}; 
    
    const next = () => {
        sliderRef.current.slickNext();
    };
    const previous = () => {
        sliderRef.current.slickPrev();
    };
    
      
    // No renderizar nada si no hay cursos
    if (!cursos || cursos.length === 0) {
        return null;
    }
    
    
    return (
        <div>
            <div className=" lg:bg-plata-suave dark:bg-color-dark2 hidden md:flex md:flex-col font-sans">
                <div className="flex flex-col lg:gap-[20px] pl-[5%] lg:px-[10%] 2xl:px-0 2xl:max-w-[1152px] w-full py-7 justify-center mx-auto">
                    
                    <div className="w-full flex flex-row">
                        <div className="self-end text-xl font-bold w-1/2 flex flex-col md:flex-row gap-[10px]">
                            <p className="font-sans text-[24px] lg:text-2extra font-semibold  mb-5 dark:text-blanco">{tituloCarouselCurso}</p>
                            <div className="font-sans flex flex-row font-bold gap-[8px]">
                                {subtitulo && <p className="text-small">{subtitulo}</p>}
                                {icono && <span>{icono}</span>}
                            </div>
                        </div>
                        {showArrows &&(
                        <div className="  w-1/2 flex justify-end w-1/2">
                            <div className="space-x-2  hidden lg:block ">
                                <button onClick={() => sliderRef.current.slickPrev()} 
                                    className={`py-2 bg-transparent ${isFirstSlide ? 'opacity-50' : ''}`}
                                    disabled={isFirstSlide}>
                                    <FlechaDer className="!p-1 block dark:hidden" />
                                    <FlechaDerDark className="hidden dark:block"  />
                                </button>
                                <button onClick={() => sliderRef.current.slickNext()}
                                    className={`py-2 bg-transparent ${isLastSlide ? 'opacity-50' : ''}`}
                                    disabled={isLastSlide}>
                                    <FlechaIz className="!p-1 block dark:hidden" />
                                    <FlechaIzDark className="hidden dark:block"  />
                                </button>
                            </div>
                        </div>
                        )}
                    </div>
    
                    <Slider ref={sliderRef} {...settings}>
                        {cursos.map((course, index) => (
                            <div key={index} className="">
                                <CardCurso title={course.nameCurso} 
                                           titleCurso={course.nameCurso}
                                           tag={course.academyName} 
                                           imageUrl= {course.curso_foto_miniatura || process.env.REACT_APP_DEFAULT_NO_IMAGE_URL }
                                           modulo={course.count_modules} 
                                           clases={course.count_classes} 
                                           duracion={course.total_duration} 
                                           idCurso={course.courseId}
                                           isFavorite={course.is_favorite}
                                           idClass={course.lessonId}
                                           isDetail={isDetail}
                                           programId={course.programId}
                                           lessionNombre={course.lessonName}
                                           idioma={course.idiomaModulo}
                                />
                            </div>
                        ))}
                    </Slider>
                    
                </div>
            </div>

            {/*--------------------*/}

            <div className="px-[5%] bg-plata-suave py-4 dark:bg-color-dark2 lg:mb-9 md:hidden">
                <div className="w-full flex flex-row">
                    <div className="self-end text-xl font-bold w-full">
                        <p className="font-sans text-xl font-semibold mb-4 dark:text-blanco">{tituloCarouselCurso}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {cursos.map((course, index) => (
                        <div key={index} className="">
                            <CardCurso title={course.nameCurso} 
                                       titleCurso={course.name}
                                       tag={course.academyName} 
                                       imageUrl= {course.curso_foto_miniatura || process.env.REACT_APP_DEFAULT_NO_IMAGE_URL }
                                       modulo={course.count_modules} 
                                       clases={course.count_classes} 
                                       duracion={course.total_duration} 
                                       idCurso={course.courseId}
                                       isFavorite={course.is_favorite}
                                       idClass={course.lessonId}
                                       isDetail={isDetail}
                                       programId={course.programId}
                                       lessionNombre={course.lessonName}
                            />
                        </div>
                    ))}
                </div>  
            </div>
        </div>
    );
};

export default CarouselCurso;