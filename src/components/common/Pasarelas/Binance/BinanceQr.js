import React, {  useEffect,useState  }  from 'react';
    import { useTranslation } from 'react-i18next';

const BinanceQR = ({qrcode,cargando,className})=>{
    
    

const { t } = useTranslation();

    
    
    return (<>
        {cargando ?
            <>{t('qrCargando')}</>:
            <div className={className + " shrink-0"}>
                <img src={qrcode} ></img>
            </div>
        }
        
    </>)
    
    
}

export default BinanceQR