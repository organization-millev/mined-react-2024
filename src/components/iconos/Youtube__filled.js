import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  Youtube__filled  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/Youtube__filled.svg" 
        alt="Icono YouTube Negrito"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default Youtube__filled ;


