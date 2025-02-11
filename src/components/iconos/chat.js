import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const chat  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/chat.svg" 
        alt="Icono Chat "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default chat ;