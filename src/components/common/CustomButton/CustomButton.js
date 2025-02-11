import React from 'react';
import { useTranslation } from 'react-i18next';


const CustomButton = ({ mobileFullWidth , onClick  }) => {
    
    const { t } = useTranslation();
    const baseClasses  = `bg-azul-oscuro-grisáceo rounded-2xl px-6 py-2 text-blanco font-sans`;
    const mobileClasses = mobileFullWidth ? 'w-full sm:w-auto' : '';
    const buttonClassName = `${baseClasses} ${mobileClasses}`;
  
  return (
    <button className={buttonClassName}  onClick={onClick} >{t('btnInciarSesion')} </button>
    
  );
};

export default CustomButton;
