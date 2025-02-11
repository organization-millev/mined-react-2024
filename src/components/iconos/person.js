import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  person  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/person.svg" 
        alt="Icono Usuario"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default person ;


