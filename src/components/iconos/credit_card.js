import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const credit_card  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/credit_card.svg" 
        alt="Icono Tarjeta Credito"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default credit_card ;