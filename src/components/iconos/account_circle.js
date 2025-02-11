import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const account_circle  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/account_circle.svg" 
        alt="Icono Cuenta"
        width="40"
        height="40"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default account_circle ;