import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  fast_forward  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/fast_forward.svg" 
        alt="Icono Adelantar"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default fast_forward ;