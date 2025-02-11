import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  download_dark  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/download_dark.svg" 
        alt="Icono Descargar dark"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default download_dark ;