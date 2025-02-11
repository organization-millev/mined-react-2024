import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  download  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/download.svg" 
        alt="Icono Descargar"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default download ;