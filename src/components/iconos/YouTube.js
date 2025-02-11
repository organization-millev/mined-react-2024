import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  YouTube  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/YouTube.svg" 
        alt="Icono YouTube"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default YouTube ;


