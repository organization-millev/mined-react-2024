import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  format_list_bulleted  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/format_list_bulleted.svg" 
        alt="Icono Formato Lista"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default format_list_bulleted ;