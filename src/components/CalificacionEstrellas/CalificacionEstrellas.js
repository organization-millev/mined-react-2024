import React, { useState,useEffect } from 'react';
import Estrella from '../iconos/iconoEstrella.js'; 
import EstrellaFondo from '../iconos/iconoEstrellaFondo.js';
import EstrellaBlanca from '../iconos/estrella_blanca';
import EstrellaFondoBlanca from '../iconos/estrella_llena_blanca';


const CalificacionEstrellas = ({ onRatingChange , rating }) => {
    
    //const [rating, setRating] = useState(0);
    const [localRating, setLocalRating] = useState(rating);
    useEffect(() => {
        setLocalRating(rating); // Actualiza el estado local cuando el prop rating cambia
    }, [rating]);

    const handleClick = (value) => {
        const newRating = (value === 1 && localRating === 1) ? 0 : value;
        setLocalRating(newRating);
        onRatingChange(newRating);
    };

return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <React.Fragment key={value}>
            <input type="radio" id={`star${value}`} name="rating" value={value} className="hidden" />
            <label 
                htmlFor={`star${value}`} 
                className="text-gris-azulado-profundo-400 hover:text-yellow-400 cursor-pointer"
                onClick={() => handleClick(value)}
            >
                {value <= rating ? 
                <>
                <EstrellaFondo       className="dark:hidden !p-0 !w-[19px] !h-[19px]"/> 
                <EstrellaFondoBlanca className="!hidden dark:!block !p-0 !w-[19px] !h-[19px]"/> 
                    
                </>
                : 
                <>
                    <Estrella       className="dark:hidden !p-0 !w-[19px] !h-[19px]"/>
                    <EstrellaBlanca className="!hidden dark:!block !p-0 !w-[19px] !h-[19px]"/>
                </>
                    
                }
            </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CalificacionEstrellas;