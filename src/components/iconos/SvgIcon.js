import React from 'react';

const SvgIcon = ({ src, alt, width, height, padding, style, className, onClick = () => {} }) => (
  <img
    src={src}
    alt={alt || 'Icono'}
    width={width} // valor predeterminado si no se proporciona
    height={height } // valor predeterminado si no se proporciona
    style={{ padding: padding, ...style }} // aplicar padding por defecto y cualquier otro estilo pasado
    className={className}
    onClick={ onClick}
  />
);

// Aquí establecemos los valores predeterminados para las props
SvgIcon.defaultProps = {
  width: '40',  // Establece el ancho predeterminado
  height: '40', // Establece el alto predeterminado
  padding: '8px',
  alt: 'Icon',  // Un valor predeterminado para alt en caso de que no se proporcione
};

export default SvgIcon;