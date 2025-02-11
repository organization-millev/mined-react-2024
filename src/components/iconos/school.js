import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  school  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/school.svg" 
        alt="Icono Escuela"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default school ;


