import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const bookMarkAmarillo  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/bookMarkAmarillo.svg" 
        alt="Icono de Guardado Amarillo"
        padding="0"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default bookMarkAmarillo ;