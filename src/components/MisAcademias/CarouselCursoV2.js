import React, { useRef, useState, useEffect } from 'react';
import CardCursoV2 from './CardCursoV2';
import FlechaIz from '../iconos/arrow_circle_right';
import FlechaDer from '../iconos/arrow_circle_left';
import CardCurso from '../CardCurso/CardCurso';

import FlechaIzDark from '../iconos/circle_right_blanco.js';
import FlechaDerDark from '../iconos/circle_left_blanco.js';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAcademia } from '../../providers/AcademiaContext';



const CarouselCursoV2 = ({ tituloCarouselCurso,courses,tag,programId }) => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);
    const [slidesToScroll, setSlidesToScroll] = useState(); 
    const { getCourseDetails } = useAcademia();
    const [coursesData, setCoursesData] = useState([]);
    
    const updateSlidesToShow = () => {
        const width = window.innerWidth;
        //alert(window.innerWidth);
        if (width >= 1440) {
            setSlidesToShow(2.9);
            setSlidesToScroll(3);
        } else if (width >= 1040) {
            setSlidesToShow(2);
            setSlidesToScroll(2);
        } else if (width >= 1024) {
            setSlidesToShow(2);
            setSlidesToScroll(2);
        } else if (width >= 900) {
            setSlidesToShow(1.8);
        } else if (width >= 800) {
            setSlidesToShow(1.6);
        } else if (width >= 768) {
            setSlidesToShow(2.5);
            setSlidesToScroll(2);
        } else if (width >= 425) {
            setSlidesToShow(1.4);
        } else if (width >= 375) {
            setSlidesToShow(1);
        } else if (width >= 360) {
            setSlidesToShow(1);
            setSlidesToScroll(1);
        } else if (width >= 320) {
            setSlidesToShow(1);
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
    
    useEffect(() => {
        const loadCoursesData = async () => {
            const loadedData = courses.map(course => {
                const courseDetails = getCourseDetails(programId,course.cour_int_id); 
                return {
                    ...course,
                    ...courseDetails,
                };
            });
            setCoursesData(loadedData);
            //
        };

        loadCoursesData();
    }, [courses]);

    const nextSlide = () => {
    if (currentIndex < courses.length - slidesToShow) {
            setCurrentIndex(prevIndex => Math.min(prevIndex + slidesToScroll, courses.length - slidesToShow));
        }
    };
    
    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => Math.max(prevIndex - slidesToScroll, 0));
        }
    };

    
    const isPrevDisabled = currentIndex === 0;
    //const isNextDisabled = currentIndex >= courses.length - slidesToShow;
    const isNextDisabled = !courses || courses.length === 0 || currentIndex >= courses.length - slidesToShow;


    return (
        <div className="">
            <div className="w-full flex flex-row justify-between items-center">
                <div className="text-xl font-bold">
                    <p className="font-sans text-2xl font-semibold mt-2 mb-5 dark:text-blanco">{tituloCarouselCurso}</p>
                </div>
                <div className="space-x-2 flex">
                    <button onClick={prevSlide} className={`py-2 bg-transparent ${isPrevDisabled ? 'opacity-50' : ''}`} disabled={isPrevDisabled}>
                        <FlechaDer className="!p-[5px] block dark:hidden"/>
                        <FlechaDerDark className="hidden dark:block"  />
                    </button>
                    <button onClick={nextSlide} className={`py-2 bg-transparent ${isNextDisabled ? 'opacity-50' : ''}`} disabled={isNextDisabled}>
                        <FlechaIz className="!p-[5px] block dark:hidden" />
                        <FlechaIzDark className=" hidden dark:block"  />
                    </button>
                </div>
            </div>
            <div className="overflow-hidden relative overflow-hidden" ref={carouselRef}> 
                <div className="flex transition-transform duration-700  !min-h-[300px] pl-2" style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}>
                    {coursesData.map((course, index) => (
                        <div key={index} className="mr-4 " >
                            <CardCursoV2 {...course} tag={tag} programId={programId} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarouselCursoV2;


/*style={{ minWidth: `calc(100% / ${slidesToShow})` }}*/

/*style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}*/