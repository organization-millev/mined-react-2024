import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  translate  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/translate.svg" 
        alt="Icono Traductor   "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default translate ;


