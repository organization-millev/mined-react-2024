import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  LinkedIn  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/LinkedIn.svg" 
        alt="Icono LinkedIn Claro "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default LinkedIn ;