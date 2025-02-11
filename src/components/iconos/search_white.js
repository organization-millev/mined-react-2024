import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  search_white  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/search_white.svg" 
        alt="Icono Lupa Blanco"
        width="24"
        height="24"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default search_white ;


