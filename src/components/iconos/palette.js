import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  palette  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/palette.svg" 
        alt="Icono Paleta "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default palette ;


