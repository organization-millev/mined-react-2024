import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  text_fields  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/text_fields.svg" 
        alt="Icono Campos Texto  "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default text_fields ;


