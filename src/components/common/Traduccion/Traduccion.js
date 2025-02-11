import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Traduccion = () => {
    const { t, i18n } = useTranslation(); // Usa i18n para cambiar el idioma
    const [idioma, setIdioma] = useState(() => localStorage.getItem('language') || 'es');
    const [espanolFont, setEspanolFont] = useState('font-normal');
    const [englishFont, setEnglishFont] = useState('font-normal');

    useEffect(() => {
        i18n.changeLanguage(idioma); // Cambia el idioma basado en el valor inicial
        handleFontChange(idioma); // Establece la fuente inicial
    }, [idioma, i18n]);

    const handleClick = (lang) => {
        setIdioma(lang);
        localStorage.setItem('language', lang); // Guarda el idioma seleccionado en localStorage
        i18n.changeLanguage(lang); // Cambia el idioma
        handleFontChange(lang); // Cambia el estilo de fuente
    };

    const handleFontChange = (lang) => {
        if (lang === 'es') {
            setEspanolFont('font-semibold');
            setEnglishFont('font-normal');
        } else {
            setEspanolFont('font-normal');
            setEnglishFont('font-semibold');
        }
    };

    return (
        <div className="mt-4 font-sans ">
            <a
                href="#"
                className={`text-sm text-gris-azulado-profundo dark:text-white font-sans mr-[5px] ${espanolFont}`}
                onClick={() => handleClick('es')}
            >
                {t('traduccionEspañol')}
            </a> 
            
            | 
            
            <a
                href="#"
                className={`text-sm text-gris-azulado-profundo dark:text-white font-sans ml-[5px] ${englishFont}`}
                onClick={() => handleClick('en')}
            >
                {t('traduccionIngles')}
            </a>
        </div>
    );
};

export default Traduccion;
