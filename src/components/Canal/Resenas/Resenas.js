import React, { useState, useEffect, useRef, useCallback } from 'react';
import IconosCanal from '../../iconos/iconos_canal';
import CardComentario from '../CardComentario/CardComentario';
import CarouselComentario from '../CarouselComentario/CarouselComentario';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLiveValoracionList } from '../../../hooks/canal/useLiveValoracionList'; 
import { useTranslation } from 'react-i18next';
import FlechaIz from '../../iconos/arrow_circle_right.js';
import FlechaDer from '../../iconos/arrow_circle_left.js';
import FlechaIzDark from '../../iconos/circle_right_blanco.js';
import FlechaDerDark from '../../iconos/circle_left_blanco.js';

const Resenas = ({ obj, idCanal, instructorl, permisoInstructor }) => {
    
    const { GetValoracionList, reviews } = useLiveValoracionList(idCanal);
    const [breakpointLG, setBreakpointLG] = useState(false);
    const sliderRef = useRef(null); 
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(1); 

    useEffect(() => {
        if (idCanal) {
            GetValoracionList(true);
        }
    }, [idCanal]);

    useEffect(() => {
        const handleResize = () => {
            const isLarge = window.innerWidth >= 1024;
            setBreakpointLG(isLarge);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const { t } = useTranslation();
    
    const filteredReviews = permisoInstructor 
                                  ? reviews 
                                  : reviews.filter(review => review.rateEnable === "true");
    
    const updateSlidesToShow = useCallback(() => {
        const width = window.innerWidth;
        if (width >= 1440) {
            setSlidesToShow(4);
        } else if (width >= 900) {
            setSlidesToShow(3.2);
        } else if (width >= 768) {
            setSlidesToShow(2.7);
        } else if (width >= 425) {
            setSlidesToShow(1.7);
        } else if (width >= 375) {
            setSlidesToShow(1.4);
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

    
    const effectiveSlidesToShow = Math.min(slidesToShow, filteredReviews.length);

   
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: effectiveSlidesToShow, 
        slidesToScroll: 4, 
        autoplaySpeed: 3000, 
        nextArrow: false, 
        prevArrow: false, 
        afterChange: (current) => setCurrentSlide(current) 
    };

   
    const totalSlides = Math.max(0, filteredReviews.length - effectiveSlidesToShow);

    const handlePrevClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev(); 
        }
    };

    const handleNextClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext(); 
        }
    };

    if (filteredReviews.length === 0) {
        return null;
    }

    return (
        <>
            <div className="gap-4 mb-[1rem] w-full">
                <div>
                    <div className="flex md:flex-wrap w-full">
                        <div className="hidden lg:block w-full">
                            <div className="flex w-full md:mb-6">
                                <div className="lg:w-1/2">
                                    <p className="text-[24px] text-gris-azulado-profundo dark:text-blanco font-semibold">
                                        {t('reseñasUsuarios')}
                                    </p>
                                </div>
                                <div className="space-x-2 flex justify-end lg:w-1/2">
                                    {/* Flecha izquierda */}
                                    <button
                                        onClick={handlePrevClick}
                                        disabled={currentSlide === 0} 
                                        className={currentSlide === 0 ? 'opacity-60' : ''}
                                    >
                                        <FlechaDer className="!p-1 block dark:hidden" />
                                        <FlechaDerDark className="hidden dark:block" />
                                    </button>

                                    {/* Flecha derecha */}
                                    <button
                                        onClick={handleNextClick}
                                        disabled={currentSlide >= totalSlides} 
                                        className={currentSlide >= totalSlides ? 'opacity-60' : ''}
                                    >
                                        <FlechaIz className="!p-1 block dark:hidden" />
                                        <FlechaIzDark className="hidden dark:block" />
                                    </button>
                                </div>
                            </div>

                            {/* 4. Attach the ref to the Slider component */}
                            <Slider {...settings} ref={sliderRef}>
                                {filteredReviews.map((review, ind) => (
                                    <CardComentario
                                        key={`cardComentario-${ind}`}
                                        obj={review}
                                        permisoInstructor={permisoInstructor}
                                    />
                                ))}
                            </Slider>
                        </div>
                    </div>

                    <div className="lg:hidden">
                        <CarouselComentario comentarios={filteredReviews} showArrows={true} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Resenas;
