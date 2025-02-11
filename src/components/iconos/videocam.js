import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  videocam  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/videocam.svg" 
        alt="Icono VideoCam Claro"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default videocam ;


