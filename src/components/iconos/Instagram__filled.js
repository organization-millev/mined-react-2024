import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  Instagram__filled  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/Instagram__filled.svg" 
        alt="Icono Instagram Negrito"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default Instagram__filled ;