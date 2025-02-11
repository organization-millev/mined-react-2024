import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  filter_list  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/filter_list.svg" 
        alt="Icono Filtrar List "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default filter_list ;