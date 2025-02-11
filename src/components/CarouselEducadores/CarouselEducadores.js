import React, { useRef, useState, useEffect } from 'react';
import "./CarouselEducadores.css"; // Importa tu archivo CSS aquí
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardsEducadores from '../CardsEducadores/CardsEducadores';
import FlechaIz from '../iconos/arrow_circle_right.js';
import FlechaDer from '../iconos/arrow_circle_left.js';
import FlechaIzDark from '../iconos/circle_right_blanco.js';
import FlechaDerDark from '../iconos/circle_left_blanco.js';

import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../providers/NavigationContext';
import { useLiveSessions } from '../../hooks/useLiveSessions';

const CarouselEducadores = ({titulo,showBackground=true,teacherFavorite}) => {
    
    
    const sliderRef = useRef();
    const [slidesToShow, setSlidesToShow] = useState();
    const [currentSlide, setCurrentSlide] = useState(0);
    const { sessionList,sessions, cargando , getSessionDetailsBig} = useLiveSessions();
    const navigate = useNavigate();
    const { goToAcademyCursoCanal } = useNavigation(); 
    const [hoveredCardIndex, setHoveredCardIndex] = useState(0); 
    const [startIndex, setStartIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    
    

    
    const updateSlidesToShow = () => {
        const width = window.innerWidth;
        if (width >= 1920) {
            setSlidesToShow(4.5);
            setItemsPerPage(5);
        } else if (width >= 1440) {
            setSlidesToShow(5);
            setItemsPerPage(5);
        } else if (width >= 1280) {
            setSlidesToShow(1); 
             setItemsPerPage(4)
        } else if (width >= 1024) {
            setSlidesToShow(3.5);
            setItemsPerPage(4)
        } else if (width >= 768) {
            setSlidesToShow(2);
            setItemsPerPage(sessionList.length)
        } else if (width >= 425) {
            setSlidesToShow(2);
            setItemsPerPage(sessionList.length)
        } else if (width >= 375) {
            setSlidesToShow(1);
            setSlidesToShow(1);
        } else {
           setSlidesToShow(1);
            setSlidesToShow(1);
           
        }
    };

    useEffect(() => {
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, [sessionList]);

    const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToShow,
            nextArrow: false,
            prevArrow: false,
            afterChange: (current) => {
            setCurrentSlide(current);
            
            },
        };
    
    const next = () => handleNext();
    const previous = () => handlePrevious();
    
    const handleNext = () => {
       
      if (startIndex + itemsPerPage < educadoresList.length) {
        setStartIndex(startIndex + itemsPerPage);
      }
    };
    
    const handlePrevious = () => {
      if (startIndex - itemsPerPage >= 0) {
        setStartIndex(startIndex - itemsPerPage);
      }
    };
    
    /*const orderedSessionList = Array.isArray(sessionList) ? 
      [
        ...sessionList.filter(session => session.is_live).sort((a, b) => a.expected_end_time - b.expected_end_time),
        ...sessionList.filter(session => !session.is_live).sort((a, b) => {
          const durationA = new Date(a.expected_end_time) - new Date(a.expected_end_time);
          const durationB = new Date(b.expected_end_time) - new Date(b.expected_end_time);
          return durationA - durationB;
        })
      ] 
    : [];*/
      
    const orderedSessionList = Array.isArray(sessionList) ? 
      [
        ...sessionList.filter(session => session.is_live)
          .sort((a, b) => new Date(b.expected_end_time) - new Date(a.expected_end_time)),
        ...sessionList.filter(session => !session.is_live)
          .sort((a, b) => new Date(b.expected_end_time) - new Date(a.expected_end_time))
      ] 
    : [];
    
    /*const orderedTeacherFavorite = Array.isArray(teacherFavorite) ?
      [
        ...teacherFavorite.filter(session => session.is_live).sort((a, b) => a.expected_end_time - b.expected_end_time),
        ...teacherFavorite.filter(session => !session.is_live).sort((a, b) => {
          const durationA = new Date(a.expected_end_time) - new Date(a.expected_end_time);
          const durationB = new Date(b.expected_end_time) - new Date(b.expected_end_time);
          return durationA - durationB;
        })
      ]
      : [];*/
      
    const orderedTeacherFavorite = Array.isArray(teacherFavorite) ?
      [
        ...teacherFavorite.filter(session => session.is_live)
          .sort((a, b) => new Date(b.expected_end_time) - new Date(a.expected_end_time)),
        ...teacherFavorite.filter(session => !session.is_live)
          .sort((a, b) => new Date(b.expected_end_time) - new Date(a.expected_end_time))
      ]
    : [];
    
    const educadoresList = orderedTeacherFavorite.length > 0 ? orderedTeacherFavorite : orderedSessionList;
    

    const handleNavigate = (nameProgram , nameCurso, nombreCanal,idCanal,sessionId) => {
        const canalName = nombreCanal ? convertSpacesToUnderscores(nombreCanal) : "Sin Educador";
        goToAcademyCursoCanal(nameProgram, nameCurso, canalName, {  sessionId , idCanal });
    };
    
    const convertSpacesToUnderscores = (name) => {
      return name.split(' ').join('_');
    };
    
    
    if (educadoresList.length === 0) {
        return null;
    }
    
    return (
       <div>
           <div className={`carousel-educadores pl-[5%] lg:px-[10%] py-3 md:py-7 md:mb-9 bg-blanco dark:bg-transparent${showBackground ? 'bg-plata-suave  dark:bg-color-dark2' : ''}`}>
                <div className="flex flex-col gap-[20px] overflow-hidden  lg:px-0 lg:max-w-[1152px]  justify-center mx-auto">
                    <div className="w-full lg:flex lg:flex-row items-center">
                        <div className="lg:w-1/2">
                            <p className="font-sans text-xl lg:text-[32px] font-semibold dark:text-blanco">{titulo}</p>
                        </div>
                        <div className="hidden lg:space-x-2 lg:w-1/2 lg:flex lg:justify-end">
                            <button onClick={handlePrevious} className="py-2 bg-transparent" disabled={startIndex === 0} style={{ opacity: startIndex === 0 ? 0.5 : 1 }}>
                                <FlechaDer className="!p-1 block dark:hidden" />
                                <FlechaDerDark className="hidden dark:block" />
                            </button>
                            
                            <button
                                onClick={handleNext}
                                className="py-2 bg-transparent"
                                disabled={startIndex + itemsPerPage >= educadoresList.length} style={{ opacity: startIndex + itemsPerPage >= educadoresList.length ? 0.5 : 1 }}
                            >
                                <FlechaIz className="!p-1 block dark:hidden" />
                                <FlechaIzDark className="hidden dark:block" />
                            </button>
                        </div>
                    </div>
                 
                 <div className="hidden lg:block">
                     <div  className="flex flex-row ">
                        {educadoresList.slice(startIndex, startIndex + itemsPerPage).map((educador, index) => {
                            return (
                              <div key={educador.channel_id} className="cursor-pointer" 
                                    onClick={() => handleNavigate(educador.programName, educador.courseName,educador.instructor_name, educador.channel_id, educador.session_id)}>
                                <CardsEducadores
                                  {...educador}
                                  isHovered={index === hoveredCardIndex}
                                  onHover={() => setHoveredCardIndex(index)}
                                />
                              </div>
                            );
                        })}
                          
                    </div>
                 </div>
                    
                    
  
                    <div></div>
                    
                    <Slider ref={sliderRef} {...settings} className="lg:!hidden">
                           {educadoresList.slice(startIndex, startIndex + itemsPerPage).map((educador, index) => {
                            return (
                              <div key={educador.channel_id} className="cursor-pointer" 
                                    onClick={() => handleNavigate(educador.programName, educador.courseName,educador.instructor_name, educador.channel_id, educador.session_id)}>
                                <CardsEducadores
                                  {...educador}
                                  isHovered={index === hoveredCardIndex}
                                  onHover={() => setHoveredCardIndex(index)}
                                />
                                
                              </div>
                              
                            );
                        })}
                        
                    </Slider>
                </div>
             </div>
       </div>
    );
};

export default CarouselEducadores;
