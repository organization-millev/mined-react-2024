import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  icono_mas_blanco  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/icono_mas_blanco.svg" 
        alt="Icono Mas Blanco "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default icono_mas_blanco ;


