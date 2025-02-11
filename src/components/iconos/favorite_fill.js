import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  favorite__fill  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/favorite__fill.svg" 
        alt="Icono Favorito Negrito"
        width="19"
        height="17"
        padding="0px"
        className={className}
        onClick={onClick}
      />
);

export default favorite__fill ;