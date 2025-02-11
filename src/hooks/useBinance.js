import React, {  useEffect,useState  } from 'react';


import {apiBinanceGetOrder,apiBinanceGetStatus} from '../api/apiConfig';

export const useBinance= () => {
    
    const [triggerOrden,setTriggerOrden] = useState(false)
    const [triggerStatus,setTriggerStatus] = useState(false)
    
    const [binanceOrden,setBinanceOrden] = useState({
        
        data:{"code":null
             ,"qr":null
             ,"checkoutUrl":null
             ,"expireTime":null
             ,"merchantTradeNo":null}, 
        cargando:true,
        error:null,
        mensaje:null,
        parametros:{}
        
    })
    const [binanceStatus,setBinanceStatus] = useState({
        data:{
            "status":null,"order_status":null,"draft_status":null,"gateway_status":null
        },
        cargando:false,
        error:null,
        mensaje:null,
        parametros:{}
    })
    
    const obtenerOrden = (language_code,order_draft_id) => {
        setBinanceOrden(prevState => ({
            ...prevState,
            parametros:{
                language_code:language_code,
                draft_id:order_draft_id
            }
        }))
        setTriggerOrden(true)
    }
    
    const obtenerStatus = (orden) => {
        
        setBinanceStatus(prevState => ({
                  ...prevState,
                    parametros:{
                        merchantTradeNo:orden
                    },
                    cargando:true
                }))
        setTriggerStatus(true)
    }
    
    
    const {data:ordenData,error:ordenError,cargando:ordenCargando,mensaje:ordenMensaje} = apiBinanceGetOrder(triggerOrden,binanceOrden.parametros)
    useEffect(()=>{
        if(triggerOrden){
            if(ordenCargando){
                setBinanceOrden(prevState => ({
                  ...prevState,
                    data: ordenData,
                    error: null,
                    cargando: ordenCargando,
                    mensaje:null
                }));
            }
            else{
                if(ordenMensaje != null){
                    
                    setTriggerOrden(false)
                    setBinanceOrden(prevState => ({
                      ...prevState,
                        data: ordenData,
                        error: ordenError,
                        cargando: ordenCargando,
                        mensaje:ordenMensaje
                    }));
                    
                    if(ordenError){
                        
                    }
                }
            }
        }
        
    },[ordenData,ordenError,ordenCargando,ordenMensaje])
    
    const {data:statusData,error:statusError,cargando:statusCargando,mensaje:statusMensaje} = apiBinanceGetStatus(triggerStatus,binanceStatus.parametros)
    useEffect(()=>{
        if(triggerStatus){
            if(statusCargando){
                setBinanceStatus(prevState => ({
                  ...prevState,
                    data: statusData,
                    error: statusError,
                    cargando: statusCargando,
                    mensaje:statusMensaje
                }));
            }
            else{
                if(statusMensaje != null){
                    setTriggerStatus(false)
                    setBinanceStatus(prevState => ({
                      ...prevState,
                        data: statusData,
                        error: statusError,
                        cargando: statusCargando,
                        mensaje:statusMensaje
                    }));
                    
                    if(statusError){
                        
                    }
                }
            }
        }
        
    },[statusData,statusError,statusCargando,statusMensaje])
    
    return {binanceOrden,obtenerOrden,binanceStatus,obtenerStatus}
}