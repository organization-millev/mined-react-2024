import React, { useState,useEffect } from 'react';
import NuveiButton from '../../common/Pasarelas/Nuvei/NuveiButton'
import Iconos from '../../iconos/iconos'
import { useTranslation } from 'react-i18next';

const NuveiPayItem = ({isOpenBinance,isOpenYuno,isOpenNuvei,onClickItem,cargandoNuvei,dataNuvei,errorNuvei,accionError}) => {
    const { t } = useTranslation();

    const [cuentaRegresiva,setCuentaRegresiva] = useState(false)
    const [intervalo,setIntervalo] = useState("")
    const [orden,setOrden] = useState("")
    
    
    useEffect(() => {
        if (!cargandoNuvei && errorNuvei == null) {
            const oneHourInMilliseconds = 60 * 60 * 1000; 
            const targetTime = Date.now() + oneHourInMilliseconds; 
    
            const updateCountdown = () => {
                const currentTimestamp = Date.now();
                const finalTime = targetTime - currentTimestamp; 
    
                if (finalTime <= 0) {
                    clearInterval(newInterval); 
                    setCuentaRegresiva("00:00:00");
                } else {
                    const hours = Math.floor(finalTime / (1000 * 60 * 60));
                    const minutes = Math.floor((finalTime % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((finalTime % (1000 * 60)) / 1000);
    
                    setCuentaRegresiva(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                }
            };
    
            const newInterval = setInterval(updateCountdown, 1000);
    
            return () => {
                clearInterval(newInterval); 
                setCuentaRegresiva(""); 
            };
        }
    }, [isOpenNuvei, cargandoNuvei]);
    

    return(<div className={ ((isOpenYuno || isOpenBinance) ? "!max-h-0" : "!max-h-[1000px] !opacity-100") + " transicion-up-down"}> 
        
        <div className={"flex bg-gris-claro dark:bg-color-dark2  w-full rounded-2xl items-center min-h-[60px] p-4 mb-3"}>
            <img src="/assets/images/logo_nuvei.png" className="h-[40px] p-3"></img>
            {(!isOpenNuvei) ?
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
        <div className={((isOpenNuvei) ? "!max-h-[1000px] !opacity-100 " : "!max-h-0 ") + " flex flex-col transicion-up-down"}>
                {
                ( isOpenNuvei & !cargandoNuvei & errorNuvei == null) ?  
                <div className="flex flex-col min-h-[400px]" >
                    <div className="flex gap-3 flex-col xl:flex-row ">
                        <div className="bg-gris-claro dark:bg-color-dark2  h-[250px] p-3 w-full rounded-2xl flex flex-col gap-4 justify-center items-center">
                            <span className="mt-3 text-xlarge font-bold">{t('tiempoValidez')} </span>
                            <div className="flex items-center gap-4">
                               <img src="/assets/images/timer_iconn.png" alt="Timer Icon" className="h-[50px]" />
                               <span className="text-5xl font-bold">{cuentaRegresiva}</span>
                           </div>
                           <NuveiButton link={dataNuvei.checkoutUrl} cargando={cargandoNuvei} className="w-[fit-content]" />
                        </div>
                    </div>
                    <span className="mt-3 text-large">{t('realizadoPagoProceso')}</span>
                    <div className="mt-3 lg:mt-auto">
                       <button className="boton-primario" >
                            Ya realice el pago 
                        </button> 
                    </div>
                </div>
                :
                <>{t('cargandoPago') } </>   
                }
        </div>
        
    </div>)
    
}

export default NuveiPayItem