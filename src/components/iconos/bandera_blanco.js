import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  bandera_blanco  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/bandera_blanco.svg" 
        alt="Icono Bandera Blanco "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default bandera_blanco ;


