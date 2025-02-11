import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  download_done  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/download_done.svg" 
        alt="Icono Descargar Terminada"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default download_done ;