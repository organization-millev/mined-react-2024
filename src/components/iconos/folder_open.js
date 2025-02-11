import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  folder_open  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/folder_open.svg" 
        alt="Icono Carpeta Abierta"
        width="24"
        height="24"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default folder_open ;