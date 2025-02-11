import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const icono_modo_claro  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/icono_modo_claro.svg" 
        alt="Icono Modo Claro Sol"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default icono_modo_claro ;