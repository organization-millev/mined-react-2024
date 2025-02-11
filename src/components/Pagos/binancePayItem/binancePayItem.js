import React, { useState,useEffect } from 'react';
import BinanceQR from '../../common/Pasarelas/Binance/BinanceQr'
import BinanceButton from '../../common/Pasarelas/Binance/BinanceButton'
import Iconos from '../../iconos/iconos'
import { useTranslation } from 'react-i18next';

const BinancePayItem = ({isOpenBinance,isOpenYuno,isOpenNuvei,cargandoBinance,dataBinance,onClickItem,errorBinance,binanceStatus,checkstatus,accionError,accionFinal,checkeandoEstado}) => {
    const { t } = useTranslation();

    const [cuentaRegresiva,setCuentaRegresiva] = useState(false)
    const [intervalo,setIntervalo] = useState("")
    const [orden,setOrden] = useState("")
    
    
    useEffect(()=>{
        
        if(!cargandoBinance && errorBinance == null && dataBinance.expireTime != null){
             
            const updateCountdown = () => {
                let currentTimestamp = Date.now()
            
                let finalTime = (dataBinance.expireTime - currentTimestamp)
            
                  if (finalTime <= 0) {
                    clearInterval(finalTime);
                  }
                  else{
                    const hours = Math.floor(finalTime / (1000 * 60 * 60));
                    const minutes = Math.floor((finalTime % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((finalTime % (1000 * 60)) / 1000);
                    setCuentaRegresiva(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                  }
                
            };
            setOrden(dataBinance.merchantTradeNo)
            setIntervalo(setInterval(updateCountdown, 1000))
            
        }
        else if(errorBinance){
            
        }

        return () => {
            clearInterval(intervalo)
            setCuentaRegresiva("")
        };  
        
        
    },[isOpenBinance,cargandoBinance])
    
    useEffect(()=>{
        
        if(errorBinance){
            accionError()
        }
        
    },[errorBinance])
    
    useEffect(()=>{
        
        if(!binanceStatus.cargando && binanceStatus.error == null && isOpenBinance && !Array.isArray(binanceStatus.data)){
            
            if(binanceStatus.data != null){
                if(binanceStatus.data.order_status != null) {
                    accionFinal(binanceStatus.data.order_status)
                } 
            }
            
        }else if(!binanceStatus.cargando && binanceStatus.error != null && isOpenBinance){
            
            accionFinal("ERROR")
        }
        
    },[binanceStatus])
    
    const handleCheckStatus = () =>{
        checkstatus(orden)
    }

    return(<div className={ ((isOpenYuno || isOpenNuvei) ? "!max-h-0" : "!max-h-[1000px] !opacity-100") + " transicion-up-down"}>
        
        <div className={"flex bg-gris-claro dark:bg-color-dark2  w-full rounded-2xl items-center min-h-[60px] p-4 mb-3"}>
            <img src="/assets/images/binance_logo.png" className="h-[40px] p-3"></img>
            {(!isOpenBinance) ?
                <button className="rounded-full boton-primario !p-0 ms-auto" onClick={onClickItem}>
                    <div className="h-[30px] w-[30px] flex items-center justify-center" >
                        <Iconos icono={"FlechaBlanco"} className={"icono-mini-sm"} /> 
                    </div>
                </button>
                :
                <button className="!p-0 ms-auto" onClick={onClickItem}>
                    <span className="text-small underline">Modificar</span>
                </button>
            }
        </div>
        <div className={((isOpenBinance) ? "!max-h-[1000px] !opacity-100 " : "!max-h-0 ") + " flex flex-col transicion-up-down"}>
            
                {
                ( isOpenBinance & !cargandoBinance & errorBinance == null) ?
                <div className="flex flex-col min-h-[400px]" >
                    <div className="flex gap-3 flex-col xl:flex-row ">
                        <BinanceQR qrcode={dataBinance.qr} cargando={cargandoBinance} className="w-[250px] h-[250px] self-center"/>
                        <div className="bg-gris-claro dark:bg-color-dark2  h-[250px] p-3 w-full rounded-2xl flex flex-col gap-4 justify-center items-center">
                            <span className="mt-3 text-xlarge font-bold">{t('tiempoValidez')} </span>
                           <div className="h-[50px]">
                               <span className="text-5xl font-bold">{cuentaRegresiva}</span>
                           </div>
                           <BinanceButton link={dataBinance.checkoutUrl} cargando={cargandoBinance} className="w-[fit-content]" />
                        </div>
                    </div>
                    <span className="mt-3 text-large">{t('realizadoPagoProceso')}</span>
                    <div className="mt-3 lg:mt-auto">
                       <button className="boton-primario" onClick={handleCheckStatus} disabled={binanceStatus.cargando} >
                           {binanceStatus.cargando  ? t('cargando') : t('pagoRealizado') }
                        </button> 
                    </div>
                </div>
                :
                <>{t('cargandoPago') } </>   
                }
        </div>
        
    </div>)
    
}

export default BinancePayItem