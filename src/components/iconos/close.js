import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const close  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/close.svg" 
        alt="Icono Cerrar"
        width="24"
        height="24"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default close ;