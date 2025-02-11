import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  videocam_off  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/videocam_off.svg" 
        alt="Icono VideoCam Apagado Claro"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default videocam_off ;


