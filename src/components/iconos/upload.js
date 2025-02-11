import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  upload  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/upload.svg" 
        alt="Icono Subir"
        width="40"
        height="40"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default upload ;


