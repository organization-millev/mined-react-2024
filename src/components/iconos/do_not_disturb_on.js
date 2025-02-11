import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  do_not_disturb_on  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/do_not_disturb_on.svg" 
        alt="Icono Menos en Circulo"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default do_not_disturb_on ;