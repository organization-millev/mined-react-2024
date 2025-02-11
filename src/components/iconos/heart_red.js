import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  heart_red  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/heart_red.svg" 
        alt="Icono Favorito Negrito"
        width="19"
        height="17"
        padding="0px"
        className={className}
        onClick={onClick}
      />
);

export default heart_red ;
