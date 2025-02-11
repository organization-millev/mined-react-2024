import React, {  useEffect,useState  }  from 'react';
import { useTranslation } from 'react-i18next';

const BinanceButton = ({link,onClick,cargando,className})=>{
    

const { t } = useTranslation();


    
    
    return(<>
        <a href={link} onClick={onClick} target="_blank" className={"boton-primario " + className}>{t('sitioProcesador')}  </a>
    </>)
}

export default BinanceButton