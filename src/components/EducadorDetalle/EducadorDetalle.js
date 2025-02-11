import React from 'react';
import LinkedIn from '../iconos/LinkedIn'; // Asegúrate de que este componente existe y se usa correctamente
import Youtube__filled from '../iconos/Youtube__filled'; // Asegúrate de que este componente existe y se usa correctamente
import Favorito from '../iconos/favorite.js'; // Asegúrate de que este componente existe y se usa correctamente
import FavoritoMarcado from '../iconos/favorite_fill.js'; // Asegúrate de que este componente existe y se usa correctamente
import { useTranslation } from 'react-i18next';


import FlechaPrev from '../iconos/chevron_left.js'; 
import FlechaNext from '../iconos/chevron_right.js';
import CustomFavoriteButton from '../common/CustomFavoriteButton/CustomFavoriteButton';


const EducadorDetalle = ({ imagenUrl = 'https://placehold.co/200x200' , nombreEducador = 'Alexandra Laguna', descripcionEducador = 'Si quieres ser un trader exitoso, debes seguir 3 pilares: Tener un sistema de análisis, trabajar en la psicología del inversor y tener una buena gestión de riesgo.' }) => {
   const { t } = useTranslation();

   const contenedor_principal_educador_detalle = 'max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden flex items-center max-h-[280px]';
   const seccion_imagen_educador_detalle = 'w-1/3 bg-blue-400 p-8';
   const seccion_texto_detalle_educador = 'w-2/3 p-6';
   const textZinc500 = 'text-zinc-500';
   const flexClass = 'flex';
   const buttonClasses = 'bg-gris-claro  w-[32px] h-[32px] bg-opacity-20  p-1 rounded-full';

   
 
  return (

       <div className={contenedor_principal_educador_detalle}>
            <div className={seccion_imagen_educador_detalle}>
                <img src={imagenUrl} alt="perfil educador"  />
            </div>
            <div className={seccion_texto_detalle_educador}>
                <div className={`${flexClass} ${textZinc500} justify-end  `}>
                    <div className="bg-gris-claro rounded-[50%] w-[38px] h-[38px] flex justify-center items-center">
                        <CustomFavoriteButton emptyIcon={Favorito} filledIcon={FavoritoMarcado}/>
                    </div>
                </div>
                
                <div>
                    <div className={`${flexClass} justify-start`}>
                        <div className="text-sm text-zinc-600">{t('educador')}</div>
                    </div>
                    <h2 className="text-2xl font-bold mt-1">{nombreEducador}</h2>
                    <p className="text-zinc-700 mt-2">
                        {descripcionEducador}
                    </p>
                </div> 
                
                <div className={`${flexClass} ${textZinc500} justify-end gap-5`}>
                    <button className={buttonClasses}>
                      <FlechaPrev className="!p-0"/>
                    </button>
                    <button  className={buttonClasses}>
                      <FlechaNext className="!p-0"/>
                    </button>
                </div>
                
            </div>
        </div>


  );
};

export default EducadorDetalle;