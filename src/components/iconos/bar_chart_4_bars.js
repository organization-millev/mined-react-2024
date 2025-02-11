import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const bar_chart_4_bars  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/bar_chart_4_bars.svg" 
        alt="Icono Barras"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default bar_chart_4_bars ;