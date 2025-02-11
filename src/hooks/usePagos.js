import React, {  useEffect,useState  } from 'react';
import {apiShopOrderGet} from '../api/apiConfig';
import {mapeoArrayItems} from '../utils/funciones'

export const usePagos = () => {
    
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    
    const [orden,setOrden] = useState({
        
        orden_boceto: localStorage.getItem("orden_boceto"),
        total: null,
        moneda:null,
        items:[],
        estado:null,
        productosValidos:null,
        error:null,
        cargando:null,
        mensaje:null
    })
    
    
    const [triggerOrden,setTriggerOrden] = useState(false)
    
    const getOrden = (orden) =>{
        setTriggerOrden(true)
    }
    
    const mapaProductoCarrito= {
      prod_int_id:"id_producto",
      prod_txt_status:"estado_producto",
      price_dec_amount:"precio",
      trans_txt_name:"nombre",
      price_cat_txt_name:"categoria"
    };
    

    
    const {data:draftData,error:draftError,cargando:draftCargando,mensaje:draftMensaje} = apiShopOrderGet(triggerOrden,{order:orden.orden_boceto,language_code:language_code})
    useEffect(()=>{
        
         if(triggerOrden){
            if(draftCargando){
                setOrden(prevState => ({
                  ...prevState,
                    productosValidos:null,
                    estado:null,
                    items:[],
                    total:null,
                    error: null,
                    cargando: draftCargando,
                    mensaje:null
                }));
            }
            else{
                if(draftMensaje != null){
                    
                    setTriggerOrden(false)
                    setOrden(prevState => ({
                      ...prevState,
                        productosValidos:draftData.invalid_prods,
                        estado: draftData.draft_status,
                        items: mapeoArrayItems(draftData.prods,mapaProductoCarrito),
                        moneda: draftData.currency,
                        error: draftError,
                        cargando: draftCargando,
                        mensaje:draftMensaje
                    }));
                    
                    if(draftError){
                        
                    }
                    
                    
                }
            }
        }
        
        
    },[draftData,draftError,draftCargando,draftMensaje])
    
        
    return {orden,getOrden}
    
}

