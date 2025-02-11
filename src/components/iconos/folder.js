import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  folder  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/folder.svg" 
        alt="Icono Carpeta "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default folder ;