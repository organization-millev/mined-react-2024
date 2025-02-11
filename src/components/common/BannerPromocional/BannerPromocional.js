import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const BannerPromocional = ({titulo,precio,precioTachado,descripcion,img,boton,cargando}) => {
  
  const { t } = useTranslation();
  const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
  const [texts,setTexts] = useState({
      titulo:titulo,precio:precio,precioTachado:precioTachado,descripcion:descripcion,img:img
  })
  
  const handleClick = ()=>{
      
      boton();
      
  }
  
  useState(()=>{
    
    if(titulo != undefined && precio != undefined && precioTachado != undefined && descripcion != undefined && img != undefined){
        
        setTexts({
              titulo:titulo,precio:precio,precioTachado:precioTachado,descripcion:descripcion,img:img
        })
    }
    
  },[titulo,precio,precioTachado,descripcion,img])
  

  return (
    <div className="rounded-[20px] shadow-custom-strong mt-[40px] py-[20px] px-[20px] lg:px-[62px] w-full flex flex-col gap-[10px] md:flex-row justify-between lg:min-h-[295px] dark:bg-color-dark2">
        <div className="flex flex-col gap-[12px] items-start justify-center">
            <p className="text-extra text-gris-azulado-profundo font-bold dark:text-blanco">{titulo}</p>
            <div className="text-extra text-gris-azulado-profundo font-bold flex flex-row gap-1 dark:text-blanco">
                <span>{precio}</span>
                <span className="line-through text-large text-gris-carbón dark:text-color-dark2-texto">{(precioTachado != undefined) ? JSON.parse(precioTachado)[language_code] : ""}</span>
            </div>
            <p className="text-small text-gris-azulado-profundo font-medium dark:text-blanco">
                {descripcion} 
            </p>
            <button className="boton-primario" onClick={handleClick} diabled={cargando}>{t("saleBannerObtener")}</button>
        </div>
        
        <div className="flex items-end justify-end shrink-0">
            <img src={img} className="w-[380px] h-[255px] h-full object-contain" />
        </div>
    </div>
  );
};

export default BannerPromocional;