import React, { useState } from 'react';
import Upload from '../iconos/upload.js'
import { useTranslation } from 'react-i18next';

const FotoPerfil = () => {
  
  const { t } = useTranslation();

  return (
    <div className=" max-w-[432px] max-h-[183px] flex flex-col items-center justify-center p-4 border-2 border-dashed border-zinc-300 rounded-3xl mt-3 mb-5 bg-gris-fondo-claro">
      <Upload className="w-16 h-16"/>
      <span className="mb-2 text-base text-gris-azulado-profundo font-sans">{t('subeTuImagen')} </span>
      <button className="text-xs bg-gris-azulado-profundo hover:opacity-40 text-white font-bold py-3 px-4 rounded-full font-sans">
       {t('subirArchivos')}
      </button>
    </div>
  );
};

export default FotoPerfil;