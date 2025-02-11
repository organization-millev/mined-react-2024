import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const credit_card_white  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/credit_card_white.svg" 
        alt="Icono Tarjeta Blanca"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default credit_card_white ;