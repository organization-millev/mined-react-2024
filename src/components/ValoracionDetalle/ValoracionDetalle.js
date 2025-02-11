import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Estrella from '../iconos/iconoEstrella.js'; 
import EstrellaFondo from '../iconos/iconoEstrellaFondo.js';
import EstrellaDark from '../iconos/estrella_blanca.js'; 
import EstrellaFondoDark from '../iconos/estrella_llena_blanca.js'; 
import FlechaDerDark from '../iconos/chevron_right_dark.js'; 
import FlechaIzDark from '../iconos/chevron_left_dark.js'; 
import Iconos from '../iconos/iconos';
import { useTranslation } from 'react-i18next';

const ValoracionDetalle = ({ testimonios }) => {
    
    const { t } = useTranslation();
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        afterChange: (index) => setShowingCard(index),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    
    const [breakpointLG, setBreakpointLG] = useState(false);
    const [showingCard, setShowingCard] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const isLargeScreen = window.innerWidth >= 1024; 
            setBreakpointLG(isLargeScreen);
            
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    const handleClick = (event) => {
        const direction = event.currentTarget.getAttribute("accion");
        if (direction === "prev") {
            sliderRef.current.slickPrev();
        } else {
            sliderRef.current.slickNext();
        }
    };
    
    
      
    

    return (
        <div className="w-full">
            <div className="flex lg:hidden mb-[20px]">
                <p className="font-sans text-largeB text-gris-carbón font-semibold dark:text-blanco ">{t('reseñas')} </p>
                <div className="flex ms-auto self-center w-[100px] justify-around">
                    <button 
                        className="rounded-full bg-gris-favorito dark:bg-[#383840] px-[0.1rem] py-[0.1rem]" 
                        disabled={showingCard === 0} 
                        onClick={handleClick} 
                        accion="prev"
                    >
                        <Iconos icono="chevron_izq" className="w-[28px] h-[28px] !p-0 dark:hidden"/>
                        <FlechaIzDark className="w-[28px] h-[28px] !p-2 !hidden dark:!block"/>
                    </button>
                    
                    <button 
                        className="rounded-full bg-gris-favorito dark:bg-[#383840] px-[0.1rem] py-[0.1rem]" 
                        disabled={(testimonios.length - settings.slidesToShow === showingCard) || (testimonios.length - 1 === showingCard && !breakpointLG)} 
                        onClick={handleClick} 
                        accion="next"
                    >
                        <Iconos icono="chevron_der" className="w-[28px] h-[28px] !p-0 dark:hidden"/>
                        <FlechaDerDark className="w-[28px] h-[28px] !p-2 !hidden dark:!block"/>
                    </button>
                </div>
            </div>
            
            <div className="hidden lg:block">
                <p className="font-sans text-2xl font-semibold dark:text-blanco md:mb-[30px]">Reseñas de nuestros usuarios</p>
            </div>
            
            
            <Slider ref={sliderRef} {...settings}>
                {testimonios.map((testimonio, index) => (
                
                    <div key={index} className="bg-white dark:bg-color-dark rounded-lg">
                        <div className="flex space-x-4 min-h-[158px] max-h-[160px]">
                            <img
                                src={testimonio.imgUrl}
                                alt="Profile"
                                className="w-[40px] h-[40px] rounded-full object-cover"
                            />
                            <div>
                                <div className="flex items-center lg:gap-[5px]">
                                    {[...Array(5)].map((_, i) => (
                                        <React.Fragment key={i}>
                                            {i < parseInt(testimonio.calificacionEstrella) ? (
                                                <>
                                                    <EstrellaFondo className="dark:hidden w-[15px] h-[15px] !p-0" />
                                                    <EstrellaFondoDark className="dark:!block !hidden" />
                                                </>
                                            ) : (
                                                <>
                                                    <Estrella className="dark:hidden w-[15px] h-[15px] !p-0" />
                                                    <EstrellaDark className="dark:!block !hidden" />
                                                </>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <p className="mt-4 text-gris-azulado-profundo-600 font-sans text-[12px] dark:text-blanco">
                                    {testimonio.comentario}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ValoracionDetalle;
