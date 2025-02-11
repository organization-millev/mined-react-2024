import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardAcademia from '../CardAcademia/CardAcademia';
import FlechaIz from '../iconos/arrow_circle_right.js';
import FlechaDer from '../iconos/arrow_circle_left.js';

import FlechaIzDark from '../iconos/circle_right_blanco.js';
import FlechaDerDark from '../iconos/circle_left_blanco.js';



import { useAcademias } from '../../hooks/useAcademias';
import { useAcademia } from '../../providers/AcademiaContext';

import { obtenerInfoDispositivo } from '../../utils/funciones';

const CarouselAcademia = ({tituloCarouselAcademia}) => {
    const sliderRef = useRef();
    const [slidesToShow, setSlidesToShow] = useState();
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const updateSlidesToShow = () => {
        const width = window.innerWidth;
        if (width >= 1600) {
            setSlidesToShow(5);
        } else if (width >= 1440) {
            setSlidesToShow(5); 
        } else if (width >= 1280) {
            setSlidesToShow(5); 
        } else if (width >= 1024) {
            setSlidesToShow(5);
        } else if (width >= 768) {
            setSlidesToShow(2.4);
        } else if (width >= 425) {
            setSlidesToShow(1.3);
        } else if (width >= 375) {
            setSlidesToShow(1.2);
        } else if (width >= 320) {
            setSlidesToShow(1);
        } else {
            setSlidesToShow(1);
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
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        nextArrow: null,
        prevArrow: null,
        afterChange: (current) => setCurrentSlide(current),
    };
    
    const { academies ,GetAcademias,getCarouselListaAcademias,formatForURL } = useAcademia();
    
    
     
    const tipoDispositivo = obtenerInfoDispositivo().tipoDispositivo;
    
    const [academias, setAcademias] = useState([]);
    
    
    
    useEffect(() => {
        setAcademias(getCarouselListaAcademias(tipoDispositivo));
        ////desktop
        //
    }, [tipoDispositivo]);
    
    
    // 
    
    const next = () => {
        sliderRef.current.slickNext();
    };
    const previous = () => {
        sliderRef.current.slickPrev();
    };
    
    const totalSlides = getCarouselListaAcademias().length - slidesToShow;

    return (
       <div className="flex justify-center my-[16px] lg:my-[20px]">
           <div className="flex flex-col gap-[20px]   2xl:max-w-[1152px] pl-[5%] lg:px-[10%] 2xl:px-0 w-full justify-center mx-auto">
                <div className="w-full flex flex-row">
                    <div className="self-end font-bold w-full lg:w-1/2">
                        <p className="font-sans text-extra text-center lg:text-left lg:text-2extra font-semibold mb-3 dark:text-blanco">{tituloCarouselAcademia}</p>
                    </div>
                    <div className="hidden lg:block w-1/2 ">
                        <div className="space-x-2 flex justify-end ">
                            <button onClick={previous} className="py-2 bg-transparent" disabled={currentSlide === 0}
                                style={{ opacity: currentSlide === 0 ? 0.5 : 1 }}>
                                <FlechaDer className="!p-1  block dark:hidden" />
                                <FlechaDerDark className="hidden dark:block"  />
                                
                            </button>
                            <button onClick={next} className="py-2 bg-transparent" disabled={currentSlide >= totalSlides}
                                style={{ opacity: currentSlide >= totalSlides ? 0.5 : 1 }}>
                                <FlechaIz className="!p-1  block dark:hidden" />
                                <FlechaIzDark className="hidden dark:block"  />
                            </button>
                        </div>
                    </div>
                </div>
                
                <Slider ref={sliderRef} {...settings}>
                    {getCarouselListaAcademias(tipoDispositivo).map((academia, index) => (
                        <div key={index} className="">
                            <CardAcademia key={academia.program_id} id={academia.name} subtitle={academia.subtitle} academiaLogo={academia.nuestras_academias_logo_url} logo={academia.logo_url}
                            fondoComprado={academia.img_academia_comprada} fondoNoComprado={academia.img_academia_noComprada} isEnabled={academia.is_enabled} formatForURL={formatForURL}/>
                        </div>
                    ))}
                </Slider>
            </div> 
           
          
       </div>
    );
};

export default CarouselAcademia;
