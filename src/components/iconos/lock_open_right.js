import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  lock_open_right  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/lock_open_right.svg" 
        alt="Icono Candado Abierto "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default lock_open_right ;