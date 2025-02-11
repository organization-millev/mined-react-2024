import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  videocam_fill  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/videocam_fill.svg" 
        alt="Icono VideoCam Negrito"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default videocam_fill ;


