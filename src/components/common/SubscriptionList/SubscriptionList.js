import React, { useState,useEffect,useRef } from 'react';
import SubscriptionItem from './SubscriptionItem'; // Adjust the import path as necessary
import CloseIcon from '../../iconos/close';
import CloseWhite from '../../iconos/closeWhite';

import ExpandirMas from '../../iconos/expand_more.js';
import ExpandirMasDark from '../../iconos/expand_more_blanco.js';



import { useUser } from '../../../providers/UserContext';
import { useTranslation } from 'react-i18next';

const SubscriptionList = ({codigo,nombreUser,etiqueta}) => {
    
    const { t } = useTranslation();
    const { getActivePackages } = useUser();
    const [activePackages, setActivePackages] = useState([]);
    
    useEffect(() => {
        // Invoca la función para obtener los paquetes activos
        const packages = getActivePackages();
        setActivePackages(packages);
    }, [getActivePackages]);
    
   
    
    
    const [isOpen, setIsOpen] = useState(false);
    const togglePaquete = () => {
        setIsOpen(!isOpen);
    };
    
    const dropdownRef = useRef(null);
     
    const closeDropdown = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const getDaysUntilExpiration = (expirationDate) => {
        // Convertir la fecha de vencimiento a un objeto Date
        const expiration = new Date(expirationDate);
        // Obtener la fecha actual
        const today = new Date();
        
        // Calcular la diferencia en milisegundos
        const diffInMilliseconds = expiration - today;
        
        // Convertir milisegundos a días
        const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
        
        return diffInDays;
    };
    const capitalizeFirstLetter = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    
      const toCapitalize = (str) => {
        return str
          .toLowerCase() 
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '); 
    };
    

    return (
        
        <div className=" relative bg-white dark:bg-color-dark w-full py-[10px] rounded-[10px] max-w-[475px]">
            
            <div className="w-full mb-2 hidden lg:block ">
                 <span className="badge-primario dark:badge-secundario-dark self-center font-semibold dark:text-color-dark  justify-center lg:self-start">  {toCapitalize(etiqueta || t('estudiante') )}</span>
            </div>    
               
            
            <p className="font-sans text-3xl font-semibold hidden lg:block text-[#4A4A4A] dark:text-blanco">{capitalizeFirstLetter(nombreUser)}</p>
            
            <p className="font-sans text-xs	mt-1 dark:text-blanco">{t('codigo')} {codigo}</p>
            <p className="font-sans text-xs	mt-2 mb-2 dark:text-blanco">{t('paquetesActivos')}</p>

            {/* <div className="flex flex-row-reverse px-[21px]">
               
            </div>*/}
            <div className="flex flex-col gap-[16px] w-auto border-white  py-[8px] lg:hidden">
                {activePackages.map((sub, index) => (
                    <SubscriptionItem key={index} title={sub.permission_name} daysRemaining={getDaysUntilExpiration(sub.expiration_date)} />
                ))}
            </div>
            
            {activePackages?.length > 0 && ( 
                <div className="hidden lg:block relative w-auto h-auto" ref={dropdownRef}>
                    <div className="flex max-w-[400px]  gap-[5px] max-h-[25px]">
                        {activePackages.map((item, index) => (
                            <button key={index} className="bg-gris-azulado-profundo dark:bg-blanco rounded-[20px] font-normal font-sans text-xs text-blanco dark:text-gris-azulado-profundo h-[auto] py-[2px] px-[7px] w-auto mr-1">
                                {item.permission_name}
                            </button>
                        ))} 
                        <ExpandirMas padding="0"     className="block dark:hidden" onClick={togglePaquete}/>
                        <ExpandirMasDark padding="0" className="hidden dark:block" onClick={togglePaquete}/>
                        
                    </div>
                
                
                    {isOpen && (
                        <div className="absolute flex flex-col bg-white w-1/2 p-5 pt-[35px] z-50 rounded-[20px] max-w-[400px] w-full top-[-7px] dark:bg-color-dark2 shadow-custom-strong">
                            <div className="flex  justify-end absolute left-[22.4em] top-[1em]">
                                <CloseIcon  onClick={togglePaquete} className="w-[20px] h-[20px] dark:hidden" />
                                <CloseWhite onClick={togglePaquete} className="!w-[16px] !h-[16px] hidden dark:block"/>
                                
                            </div>
        
                            {activePackages.map((sub, index) => (
                                <SubscriptionItem key={index} title={sub.permission_name} daysRemaining={getDaysUntilExpiration(sub.expiration_date)} />
                            ))}
                        </div>
                    )}
                    
                </div>
            )}
            
            
            
        </div>
    );
};

export default SubscriptionList;
