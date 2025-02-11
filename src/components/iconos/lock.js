import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const lock = ({ className, padding = 0, onClick }) => (
  <SvgIcon 
    src="/assets/iconos/lock.svg" 
    alt="Icono Candado Cerrado "
    width="40"
    height="40"
    padding={padding}
    className={className}
    onClick={onClick}
  />
);

export default lock ;