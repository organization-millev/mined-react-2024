import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CardVerMas = ({titleDescription, description}) => {
    
    const { t } = useTranslation();

    const [showFullContent, setShowFullContent] = useState(false);

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };
    
    return (
        <div className={`rounded-[20px] overflow-hidden dark:bg-color-dark2 shadow-custom-strong flex ${showFullContent ? 'h-auto' : 'min-h-[174px]'} transition-height duration-300 ease-in-out`}>
            <div className="p-[16px] lg:px-[59px] lg:py-[28px] md:flex md:flex-col md:justify-center">
                <p className="md:block font-bold text-[20px] mb-2 text-gris-azulado-profundo font-sans dark:text-blanco">{titleDescription}</p>
                <p className={`text-marron-oscuro dark:text-blanco text-small lg:text-medium font-sans ${showFullContent ? '' : 'line-clamp-6'}`} dangerouslySetInnerHTML={{ __html: description }}>
                    
                </p>
                <p className="text-gris-azulado-profundo text-small dark:text-blanco text-center mt-3 lg:text-medium font-sans font-bold cursor-pointer lg:hidden" onClick={toggleContent}>
                    <u>{showFullContent ? t('verMenos')  : t('verMas') }</u>
                </p>
            </div>
        </div>
    );
};

export default CardVerMas;