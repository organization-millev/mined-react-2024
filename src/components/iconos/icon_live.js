import React from 'react';
import SvgIcon from './SvgIcon';


const icon_live  = ({ className, padding="0", onClick }) => (
  <SvgIcon 
        src="/assets/iconos/icon_live.svg" 
        alt="Icono Live"
        width="40"
        height="40"
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default icon_live ;