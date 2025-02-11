import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  YoutubeFooter  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/youtube_footer.svg" 
        alt="Icono YouTube"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default YoutubeFooter ;