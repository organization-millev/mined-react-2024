import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  skip_next  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/skip_next.svg" 
        alt="Icono Omitir Siguiente"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default skip_next ;


