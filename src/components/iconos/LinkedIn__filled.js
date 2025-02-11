import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  LinkedIn__filled  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/LinkedIn__filled.svg" 
        alt="Icono LinkedIn Negrito"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default LinkedIn__filled ;