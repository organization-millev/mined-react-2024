import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const add_shopping_cart  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/add_shopping_cart.svg" 
        alt="Icono Agregar Carrito"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default add_shopping_cart ;