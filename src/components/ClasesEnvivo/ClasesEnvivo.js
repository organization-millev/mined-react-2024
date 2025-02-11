import React, { useState } from 'react';
import Favorito from '../iconos/favorite.js'; 

import { useTranslation } from 'react-i18next';



const ClasesEnvivo = () => {
  const centeringClasses = "mx-auto";
  const textSmallZinc = "text-xs dark:text-blanco text-zinc-500";
  const textSmallBold = "text-xs dark:text-blanco text-center font-semibold";
  const textSmallDarkZinc = "text-xs dark:text-blanco text-zinc-700";
  const { t } = useTranslation();

  const perfiles = [
    { id: 1, name: 'Andres Retana', role: 'Drop\nShipping', imgSrc: '../assets/images/fondoeducadorminedtv(2).png' },
    { id: 2, name: 'Andres Retana', role: 'Drop\nShipping ', imgSrc: '../assets/images/fondoeducadorminedtv(2).png' },
    { id: 3, name: 'Andres Retana', role: 'Drop\nShipping', imgSrc: '../assets/images/fondoeducadorminedtv(2).png' },
    { id: 4, name: 'Andres Retana', role: 'Drop\nShipping', imgSrc: '../assets/images/fondoeducadorminedtv(2).png' },
    { id: 5, name: 'Andres Retana', role: 'Drop\nShipping', imgSrc: '../assets/images/fondoeducadorminedtv(2).png' },
    { id: 6, name: 'Andres Retana', role: 'Drop\nShipping', imgSrc: '../assets/images/fondoeducadorminedtv(2).png' },
    { id: 7, name: 'Andres Retana', role: 'Drop\nShipping', imgSrc: '../assets/images/fondoeducadorminedtv(2).png' }
  ];


  return (
      
    <>
      
     <div className={`${centeringClasses} py-4 bg-zinc-100 dark:bg-color-dark2 font-sans`}>
      <div className={`max-w-screen-xl ${centeringClasses} px-4`}>
        <div className="flex items-center gap-[10%]">
          <div className="flex  flex-col items-center space-x-2">
            <h1 className="text-3xl font-semibol font-semibold dark:text-blanco	"> {t('ahora')}</h1>
            
            <div className="flex flex-row gap-2 w-[30%] !ml-0 mr-2">
              <Favorito className=""/>
              <span className="text-base text-gris-oscuro font-semibold	dark:text-blanco">{t('enVivo')}</span>
            </div>
            
          </div>
          <div className="w-[70%] flex flex-row gap-6">
            {perfiles.map((perfil) => (
              <div key={perfil.id} role="list" className="shrink-0">
                <img src={perfil.imgSrc} alt={perfil.name} className="w-[90px] h-[90px] rounded-full object-cover mb-2" />
                <div>
                  <p className={textSmallBold} style={{ whiteSpace: 'pre-wrap' }}>{perfil.role}</p>
                  <p className={textSmallDarkZinc}>{perfil.name}</p>
                </div>
              </div>
            ))}
           
             
          </div>
        </div>
      </div>
    </div>

    
    
    </>
  );
};

export default ClasesEnvivo;

