import React from 'react';
import "./CourseRating.css"; // Importa tu archivo CSS aquí
import StarFill from '../../iconos/estrella_star_fill';
import StarFillBlanca from '../../iconos/estrella_llena_blanca';
import StarBlanca from '../../iconos/estrella_blanca';


import Star from '../../iconos/estrella_star';

const CourseRating = ({title, rating }) => {
    const totalStars = 5;
    const fullStars = Math.round(rating);
    const emptyStars = totalStars - fullStars;

    return (
        <div className="w-auto">
            <div className="flex lg:items-center flex-col justify-start lg:flex-row !gap-[10px] md:gap-0">
                <div className="font-sans text-2extra lg:text-[40px] lg:leading-[64px] font-semibold text-gris-azulado-profundo dark:text-blanco ">{rating.toFixed(1)}</div>
                <div className="flex lg:ml-2 estrellas-raiting gap-[8px] sm:gap-[2px]  md:gap-0">
                    {Array(fullStars).fill(0).map((_, i) => (
                        <>
                            <StarFill key={i} className="dark:hidden !w-[28px] !h-[28px]    md:w-9 md:h-9 !p-[4px] fill-current text-gris-azulado-profundo" padding={2}/>
                            <StarFillBlanca key={i} className="hidden dark:!block  !w-[28px] !h-[28px] !p-[4px]  md:w-9 md:h-9  fill-current text-gris-azulado-profundo" padding={2}/>
                        </>
                    ))}
                    {Array(emptyStars).fill(0).map((_, i) => (
                        <>
                            <Star key={`empty-${i}`} className="dark:hidden !w-[28px] !h-[28px]  md:w-9  md:h-9 !p-[4px] fill-current text-gris-azulado-profundo" padding={2}/>
                            <StarBlanca key={`empty-${i}`} className="hidden dark:!block !w-[28px] !h-[28px] !p-[4px] md:w-9  md:h-9 !p-0 fill-current text-gris-azulado-profundo" padding={2}/>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseRating;
