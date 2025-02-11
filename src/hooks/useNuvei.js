import React, {  useEffect,useState  } from 'react';


import {apiNuveiGetOrder} from '../api/apiConfig';

export const useNuvei= () => {
    
    const [triggerOrden,setTriggerOrden] = useState(false)
    const [nuveiOrden,setNuveiOrden] = useState({
        
        data:{"checkoutUrl":null},
        cargando:true,
        error:null,
        mensaje:null,
        parametros:{}
        
    })
    
    const obtenerOrdenNuvei = (order_draft_id) => {
        setNuveiOrden(prevState => ({
            ...prevState,
            parametros:{
                draft_id:order_draft_id
            }
        }))
        setTriggerOrden(true)
    }

    
    const {data:ordenData,error:ordenError,cargando:ordenCargando,mensaje:ordenMensaje} = apiNuveiGetOrder(triggerOrden,nuveiOrden.parametros)
    useEffect(()=>{
        if(triggerOrden){
            if(ordenCargando){
                setNuveiOrden(prevState => ({
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
                    setNuveiOrden(prevState => ({
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
    
    return {nuveiOrden,obtenerOrdenNuvei}
}