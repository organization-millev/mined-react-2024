import React from 'react';
import FlechaPrev from '../iconos/chevron_left.js'; 
import FlechaNext from '../iconos/chevron_right.js';
import { useTranslation } from 'react-i18next';


const ItemEducador = ({ url_EducadorImagen = "../assets/images/fondoeducadorminedtv(2).png" }) => {
const { t } = useTranslation();

const contenedor_general_item_educador = "flex content-center flex-col max-w-[120px] h-auto m-2 items-center";    
const contenedor_imagen = "w-full h-full rounded-md overflow-hidden";    
const imagen_fondo_educador = "w-full h-[130px] object-cover";
const titulo_item_educador = "font-sans text-xs	mb-3"; 
const button_clases_item_educador = "font-sans text-xs rounded-xl bg-gris-azulado-profundo py-1 px-2 text-blanco font-semibold absolute top-[11.4em] left-[4.4em]"
 
  return (
        <div className={contenedor_general_item_educador}>
          <p className={titulo_item_educador}>{t('educadores')}</p>
          <div className={contenedor_imagen}>
              <img src={url_EducadorImagen} alt="perfil educador" className={imagen_fondo_educador} />
              <button className={button_clases_item_educador}>{t('btnAgendar')} </button>
          </div>
        </div>
        



  );
};

export default ItemEducador;