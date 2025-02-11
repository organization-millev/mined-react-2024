import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  filter_alt  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/filter_alt.svg" 
        alt="Icono Filtrar Todo "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default filter_alt ;