import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  publish  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/publish.svg" 
        alt="Icono Publicar"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default publish ;


