import React, { useState, useEffect, useRef } from 'react';
import './SelectLista.css'; // Importa los estilos personalizados
import FlechaAbajoSelect from '../../iconos/expand_more'; // Icono de flecha hacia abajo
import FlechaArribaSelect from '../../iconos/keyboard_arrow_up'; // Icono de flecha hacia arriba
import FlechaAbajoWhite from '../../iconos/expand_more_white.js';
import FlechaArribaWhite from '../../iconos/keyboard_arrow_up_white.js';

const SelectLista = ({ id, isOpen, onToggle, defaultValue = "-", opciones = [], onChange }) => {
    
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const selectRef = useRef(null); 
    //
    
    useEffect(() => {
        setSelectedOption(defaultValue);
    }, [defaultValue]);

    const selectOption = (optionValue) => {
        setSelectedOption(optionValue);
        onToggle(null); // Cerrar el dropdown al seleccionar una opción
        if (onChange) {
            onChange(optionValue);
        }
    };
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                onToggle(null); // Cerrar el dropdown si se hace clic fuera
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onToggle]);
    
    
    

    return (
        <div ref={selectRef} className={`rounded-[20px]  font-sans transition-all duration-100 ease-linear bg-blanco text-[#333] dark:text-blanco dark:bg-color-dark border-2 border-[#292735] dark:border-blanco md:min-w-[230px] lg:min-w-[230px] ${isOpen ? 'expanded' : 'h-[45px]'}`}>{/*overflow-hidden*/}
            {/* Header del dropdown */}
            <div className="dropdown-header font-sans text-base md:min-w-[230px] lg:min-w-[230px]" onClick={() => onToggle(id)}>
                {opciones.find(opcion => opcion.value === selectedOption)?.label || "Seleccione una opción"}

                {isOpen ? 
                    <>
                        <FlechaArribaSelect className="dark:!hidden"/> 
                        <FlechaArribaWhite  className="!hidden dark:!block"/> 
                    </>
                :
                    <>
                        <FlechaAbajoSelect className="dark:!hidden"/>
                        <FlechaAbajoWhite  className="!hidden dark:!block"/>
                    </>
                } 
            </div>

            {isOpen && (
           
                <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
                    <ul className="dropdown-list lg:min-w-[230px] font-sans">
                        {opciones.map((opcion, index) => (
                            <li key={index} onClick={() => selectOption(opcion.value)} className="dropdown-item hover:bg-plata-suave">
                                {opcion.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SelectLista;
