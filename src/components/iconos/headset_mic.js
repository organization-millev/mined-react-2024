import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  headset_mic  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/headset_mic.svg" 
        alt="Icono Audifonos "
        width="40"
        height="40"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default headset_mic ;