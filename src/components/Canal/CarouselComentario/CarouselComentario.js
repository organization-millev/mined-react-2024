import React, { useRef, useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardComentario from '../CardComentario/CardComentario';
import IconosCanal from '../../iconos/chevron_right';


import { useTranslation } from 'react-i18next';

const CarouselComentario = ({ showArrows = true, comentarios,permisoInstructor }) => {

    const { t } = useTranslation();

    const sliderRef = useRef();
    const [slidesToShow, setSlidesToShow] = useState(3);
    const [isFirstSlide, setIsFirstSlide] = useState(true);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const updateSlidesToShow = useCallback(() => {
        const width = window.innerWidth;
        if (width >= 1440) {
            setSlidesToShow(3);
        } else if (width >= 900) {
            setSlidesToShow(3.2);
        } else if (width >= 768) {
            setSlidesToShow(2.7);
        } else if (width >= 425) {
            setSlidesToShow(1.7);
        } else if (width >= 375) {
            setSlidesToShow(1);
        } else if (width >= 320) {
            setSlidesToShow(1);
        } else {
            setSlidesToShow(1.5);
        }
    }, []);

    useEffect(() => {
        updateSlidesToShow();
        const handleResize = () => {
            updateSlidesToShow();
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [updateSlidesToShow]);

    const handleBeforeChange = useCallback((current, next) => {
        setIsFirstSlide(next === 0);
        setIsLastSlide(next >= comentarios.length);
    }, [comentarios.length, slidesToShow]);

    const handleAfterChange = useCallback((current) => {
        setIsFirstSlide(current === 0);
        setIsLastSlide(current >= comentarios.length);
    }, [comentarios.length, slidesToShow]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 900,
        slidesToShow: slidesToShow,
        slidesToScroll: Math.floor(slidesToShow),
        beforeChange: handleBeforeChange,
        afterChange: handleAfterChange,
    };

    return (
        <div className="lg:bg-plata-suave md:flex-col font-sans">
            <div className="flex flex-col lg:gap-[20px] lg:px-[10%] 2xl:px-0 2xl:max-w-[1152px] w-full py-7 justify-center mx-auto">
                <div className="w-full flex flex-row justify-between">
                    <div className="self-end text-xl font-bold w-1/2 flex flex-col md:flex-row gap-[10px]">
                        <p className="font-sans text-[24px] lg:text-2extra font-semibold mb-5 text-[#403E4B] dark:text-blanco">{t('reseñas')} </p>
                    </div>
                    
                    {showArrows && !showAll &&(
                        <div className="flex flex-row gap-[20px]">
                            <button
                                className="rounded-full bg-gris-claro flex justify-center items-center px-[0.1rem] py-[0.1rem] w-[32px] h-[32px]"
                                onClick={() => sliderRef.current.slickPrev()}
                                disabled={isFirstSlide}
                            >
                                <IconosCanal icono="chevron_izq" className="w-[28px] h-[28px] !p-0 rotate-180" />
                            </button>
                            <button
                                className="rounded-full bg-gris-claro flex justify-center items-center px-[0.1rem] py-[0.1rem] w-[32px] h-[32px]"
                                onClick={() => sliderRef.current.slickNext()}
                                disabled={isLastSlide}
                            >
                                <IconosCanal icono="chevron_der" className="w-[28px] h-[28px] !p-0" />
                            </button>
                        </div>
                    )}
                </div>
                
                {!showAll ? (
                    <Slider ref={sliderRef} {...settings}>
                        {comentarios.map((comentario, index) => (
                            <div key={index}>
                                <CardComentario obj={comentario} visible={true} permisoInstructor={permisoInstructor}/>
                            </div>
                        ))}
                        <div>
                            <div className="flex flex-col justify-center items-center min-h-[150px] ">
                                <p className="text-xs font-normal font-sans mb-1 dark:text-blanco ">{t('miraTodasReseñas')}</p>
                                <button className="boton-primario text-xs font-semibold !py-[10px]" onClick={() => setShowAll(true)}>{t('verTodas')}</button>
                            </div>
                        </div>
                    </Slider>
                ) : (
                    <div className="">
                        {comentarios.map((comentario, index) => (
                            <div key={index}>
                                <CardComentario obj={comentario} visible={true} permisoInstructor={permisoInstructor}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarouselComentario;