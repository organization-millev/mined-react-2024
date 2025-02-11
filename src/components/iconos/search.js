import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  search  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/search.svg" 
        alt="Icono Lupa"
        width="24"
        height="24"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default search ;


