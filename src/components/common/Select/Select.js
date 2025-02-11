import React, { useState } from 'react';
import './Select.css';
import FlechaAbajoSelect from '../../iconos/expand_more'; // Asegúrate de que este componente existe y se usa correctamente
import FlechaAbajoSelectDarK from '../../iconos/expand_more_blanco.js';

const Select = ({children,className,onChange,selectedvalue,...props}) => {
    

    const selectClassName = "dark:border-blanco dark:bg-color-dark dark:text-blanco block appearance-none w-full bg-white border  border-azul-oscuro-grisáceo hover:border-zinc-500 px-4 py-2 pr-8 rounded-[40px] shadow leading-tight focus:outline-none focus:shadow-outline focus:ring-0 outline-none";
    const containerClassName = "relative w-[100]";
    const iconContainerClassName = "pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-zinc";

    return (
        
        
        <div className={containerClassName}>
            <select className={selectClassName + " " + className} onChange={onChange} {...props} value={selectedvalue}>
                {children}
            </select>
            
            <div className={iconContainerClassName}>
                <FlechaAbajoSelect className="block dark:hidden" /> {/* Asumiendo que este es el ícono de la flecha hacia abajo */}
                <FlechaAbajoSelectDarK padding="8px"  className="hidden dark:block" />
            </div>
        </div>
    );
};

export default Select;
