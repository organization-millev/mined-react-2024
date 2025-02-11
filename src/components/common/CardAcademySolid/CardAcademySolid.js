import React from 'react';
import { useTranslation } from 'react-i18next';

const CardAcademySolid = (props) => {
    
    const { t } = useTranslation();

    const filteredFile = props.files ? props.files.find(file => file.tag === 'educador_foto_descripcion') : null;
    const imageUrl = filteredFile ? filteredFile.url :  process.env.REACT_APP_DEFAULT_NO_IMAGE_URL;  // Usar imagen por defecto si no se encuentra


    return (
        <div className="rounded-[20px] overflow-hidden shadow-custom-strong md:flex lg:h-[280px]">
            <img className="w-full object-cover object-top h-[151px] md:w-[300px] md:h-auto" src={imageUrl} alt={props.cargo} />
            <div className="px-6 py-4 md:flex md:flex-col md:justify-center md:px-[5%]">
                {/*<p className="hidden md:block font-bold text-xs mb-2 text-gris-azulado-profundo font-sans">{props.cargo}</p>*/}
                <p className="hidden md:block font-bold text-xs mb-2 text-gris-azulado-profundo font-sans">{t('directorAcademia')} </p>
                <div className="font-bold text-xl mb-2 text-gris-azulado-profundo font-sans lg:text-3xl">
                    <p>{props.name}</p>
                </div>
                <p className="text-marron-oscuro text-xs font-sans lg:text-sm">
                    {props.description}
                </p>
            </div>
        </div>
    );
};

export default CardAcademySolid;