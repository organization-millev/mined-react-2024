import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  file_copy  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/file_copy.svg" 
        alt="Icono Copiar Archivo "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default file_copy ;