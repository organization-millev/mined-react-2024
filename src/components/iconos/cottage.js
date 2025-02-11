import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const cottage  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/cottage.svg" 
        alt="Icono Casa"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default cottage ;