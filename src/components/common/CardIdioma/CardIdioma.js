import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


const CardIdioma = ({ codigos }) => {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('languageModules')?.toUpperCase() || 'ES');
    const [language, setLanguage] = useState(localStorage.getItem('language')?.toUpperCase() || 'ES');
    

    const idiomasMap = {
        'ES': t('traduccionEspañol'),
        'EN': t('traduccionIngles'),
        'PT': 'Portugués'
    };

    const obtenerIdiomas = (codigos) => {
        return codigos
            .map(codigo => {
                const languageName = idiomasMap[codigo.language_code];
                return {
                    language_code: codigo.language_code,
                    language_name: languageName
                };
            })
            .filter(language => language.language_name); // Filtra si el nombre de idioma es undefined o null
    };
    
    
    
    const SeleccionarLanguage = (language_code) => {
        
        // Si el idioma no es ES, EN o PT, se establece a ES por defecto
        if (language_code !== 'ES' && language_code !== 'EN' && language_code !== 'PT') {
            language_code = 'ES';
        }
    
        /*if (language_code === 'ES' || language_code === 'EN') {
            setLanguage(language_code.toLowerCase()); localStorage.setItem('language', language_code.toLowerCase());
            i18n.changeLanguage(language_code.toLowerCase()); 
        }*/
        setSelectedLanguage(language_code); // Actualiza el estado
        localStorage.setItem('languageModules', language_code.toLowerCase()); // Guarda en localStorage
        window.location.reload();
    };
    
    const idiomas = obtenerIdiomas(codigos);

    return (
        <div key={codigos} className="w-full">
            <div className="rounded-[20px] shadow-custom-strong dark:bg-color-dark2 h-[60px] flex justify-around items-center">
                {idiomas.map((language, index) => (
                    <div key={index} className="flex-1 flex justify-center relative">
                        <p 
                            className={`text-medium lg:text-large font-sans cursor-pointer ${selectedLanguage === language.language_code ? 'dark:text-blanco font-bold underline' : 'dark:text-blanco font-medium'}`}
                            onClick={() => SeleccionarLanguage(language.language_code)} // Cambiado a función anónima
                        >
                            {language.language_name}
                        </p>
                        {index < idiomas.length - 1 && (
                            <span className="absolute right-0 h-full border-r border-gris-divisor"></span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardIdioma;
