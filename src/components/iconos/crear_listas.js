import React from 'react';
import SvgIcon from './SvgIcon'; 


const crear_listas  = ({ className, onClick }) => (
  
  <SvgIcon 
        src="/assets/iconos/crear_listas.svg" 
        alt="Icono crear listas"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
      
);

export default crear_listas ;