import React from 'react';
import StarFill from '../../iconos/estrella_star_fill';
import StarFillBlanca from '../../iconos/estrella_llena_blanca';

const CalificacionesRating = ({ ratingData }) => {
    
    return (
        <div className="w-full lg:mt-[10px]">
            {ratingData.map((item, index) => (
                <div key={index} className="flex items-center h-[18px] md:h-[25px]  ">
                    <span className="text-xs font-sans font-semibold text-color-dark w-4 dark:text-blanco">{item.stars}</span>
                    <StarFill className="dark:hidden w-[13px] h-[13px] !p-0 md:p-[8px]"/>
                    <StarFillBlanca className="!hidden dark:!block w-[13px] h-[13px] !p-0 md:p-[8px]"/>

                    <div className="flex items-center w-full mx-2">
                        <div className="bg-gray-300 dark:bg-color-dark2 w-full h-[4px] rounded-lg">
                            <div
                                className="bg-color-dark dark:bg-blanco h-[4px] rounded-lg"
                                style={{ width: `${item.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                    <span className="hidden md:block text-xs font-sans font-semibold text-color-dark dark:text-blanco ">{item.percentage}%</span>
                </div>
            ))}
        </div>
    );
};

export default CalificacionesRating;