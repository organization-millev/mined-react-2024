import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  ios_share  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/ios_share.svg" 
        alt="Icono Compartir Ios"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default ios_share ;