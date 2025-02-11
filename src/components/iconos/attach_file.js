import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const attach_file  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/attach_file.svg" 
        alt="Icono Clip"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default attach_file ;