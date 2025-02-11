import React from 'react';
import { useTranslation } from 'react-i18next';


const defaultClassName = `
        font-sans
        font-semibold
        text-[24px]
        lg:text-[40px]
        text-gris-azulado-profundo
        leading-[48px]
        bg-transparent
        dark:!text-blanco
    `;

const WelcomeMessage = ({firstname, className = defaultClassName}) => {
    
    const { t } = useTranslation();
    const capitalizeFirstLetter = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    
    
    return (
        <div className="flex flex-col gap-[40px] px-[5%] lg:px-[10%] 2xl:px-0 2xl:max-w-[1152px] justify-center mx-auto lg:my-[40px] ">
            <p className={className}>
               {t('saludoBienvenida')} {capitalizeFirstLetter(firstname)},
               
            </p>
        </div>
    );
};

export default WelcomeMessage;