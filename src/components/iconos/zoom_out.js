import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  zoom_out  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/zoom_out.svg" 
        alt="Icono Dsiminuir Zoom"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default zoom_out ;


