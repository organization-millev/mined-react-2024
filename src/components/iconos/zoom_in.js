import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  zoom_in  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/zoom_in.svg" 
        alt="Icono Acercar Zoom  "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default zoom_in ;


