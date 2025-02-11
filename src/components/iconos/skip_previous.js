import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  skip_previous  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/skip_previous.svg" 
        alt="Icono Saltar  "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default skip_previous ;


