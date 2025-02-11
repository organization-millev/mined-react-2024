import React, {  useEffect,useState  } from 'react';
import { apiYunoCliente,apiYunoSesion,apiYunoPay } from '../api/apiConfig';


export const useYuno = () => {
    
    const [triggerCliente,setTriggerCliente] = useState(false)
    const [triggerSesion,setTriggerSesion] = useState(false)
    const [triggerPay,setTriggerPay] = useState(false)
    
    const [yunoCliente,setYunoCliente] = useState({
        
        data:{
            "id":null,
            "merchant_customer_id":null,
            "country":null
        },
        cargando:true,
        error:null,
        mensaje:null,
        parametros:{}
        
    })
    
    const [yunoSesion,setYunoSesion] = useState({
        data:{
            "merchant_order_id":null,
            "checkout_session":null,
            "amount":null
        },
        cargando:true,
        error:null,
        mensaje:null,
        parametros:{}
    })
    
    const [yunoPay,setYunoPay] = useState({
        data:{
            "status":null,"order_status":null,"draft_status":null,"gateway_status":null,"datetime":null
        },
        cargando:false,
        error:null,
        mensaje:null,
        parametros:{}
    })
    
    const obtenerClienteYuno = (codigoCliente,order_draft_id) => {
        
        setYunoCliente(prevState => ({
            ...prevState,
            parametros:{
                cliente:codigoCliente
            }
        }))
        setTriggerCliente(true)
        
    }
    
    const obtenerSesion = (idCliente,order_draft_id) => {
        
        setYunoSesion(prevState => ({
            ...prevState,
            parametros:{cliente:idCliente,draft_id:order_draft_id}
        }))
        setTriggerSesion(true)
        
    }
    
    const obtenerPay= (checkout_session,oneTimeToken,merchant_order_id,order_draft_id) => {
        
        setYunoPay(prevState => ({
            ...prevState,
            parametros:{
                checkout_session:checkout_session,
                oneTimeToken:oneTimeToken,
                merchant_order_id:merchant_order_id,
                draft_id:order_draft_id
            }
        }))
        setTriggerPay(true)
        
    }
    
    const {data:clienteData,error:clienteError,cargando:clienteCargando,mensaje:clienteMensaje} = apiYunoCliente(triggerCliente,yunoCliente.parametros)
    useEffect(()=>{
        if(triggerCliente){
            if(clienteCargando){
                setYunoCliente(prevState => ({
                  ...prevState,
                    data: clienteData,
                    error: null,
                    cargando: clienteCargando,
                    mensaje:null
                }));
            }
            else{
                if(clienteMensaje != null){
                    
                    setTriggerCliente(false)
                    setYunoCliente(prevState => ({
                      ...prevState,
                        data: clienteData,
                        error: clienteError,
                        cargando: clienteCargando,
                        mensaje:clienteMensaje
                    }));
                    
                    if(clienteError){
                        
                    }
                }
            }
        }
        
    },[clienteData,clienteError,clienteCargando,clienteMensaje])
    
    const {data:sesionData,error:sesionError,cargando:sesionCargando,mensaje:sesionMensaje} = apiYunoSesion(triggerSesion,yunoSesion.parametros)
    useEffect(()=>{
        if(triggerSesion){
            if(sesionCargando){
                setYunoSesion(prevState => ({
                  ...prevState,
                    data: sesionData,
                    error: null,
                    cargando: sesionCargando,
                    mensaje:null
                }));
            }
            else{
                if(sesionMensaje != null){
                    
                    setTriggerSesion(false)
                    setYunoSesion(prevState => ({
                      ...prevState,
                        data: sesionData,
                        error: sesionError,
                        cargando: sesionCargando,
                        mensaje:sesionMensaje
                    }));
                    
                    if(sesionError){
                        
                    }
                }
            }
        }
        
    },[sesionData,sesionError,sesionCargando,sesionMensaje])
    
    const {data:payData,error:payError,cargando:payCargando,mensaje:payMensaje} = apiYunoPay(triggerPay,yunoPay.parametros)
    useEffect(()=>{
        if(triggerPay){
            if(payCargando){
                setYunoPay(prevState => ({
                  ...prevState,
                    data: payData,
                    error: null,
                    cargando: payCargando,
                    mensaje:null
                }));
            }
            else{
                if(payMensaje != null){
                    
                    setTriggerPay(false)
                    setYunoPay(prevState => ({
                      ...prevState,
                        data: payData,
                        error: payError,
                        cargando: payCargando,
                        mensaje:payMensaje
                    }));
                    
                    if(payError){
                        
                    }
                }
            }
        }
        
    },[payData,payError,payCargando,payMensaje])
    
    return {yunoCliente,yunoSesion,yunoPay,obtenerClienteYuno,obtenerSesion,obtenerPay}
    
}