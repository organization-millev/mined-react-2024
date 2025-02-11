import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const cancel  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/cancel.svg" 
        alt="Icono Cancelar Circulo"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default cancel ;