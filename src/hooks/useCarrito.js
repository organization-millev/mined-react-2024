import React, {  useEffect,useState  } from 'react';

import {apiShopCartGet,apiShopOrderSet,apiShopItemDelete,apiShopItemAdd,apiShopItemDirect} from '../api/apiConfig';
import {mapeoArrayItems} from '../utils/funciones'
import { useAlert  } from '../providers/AlertContext'; 
import { useEcommerceToolsContext } from '../providers/EcommerceToolsContext';

export const useCarrito = () => {
    
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    const { warn, success } = useAlert();
    const { getAcademyNameByProductId } = useEcommerceToolsContext();
    
    const [carrito,setCarrito] = useState({
        moneda:"USD",
        items_quantity:"",
        items:[],
        invalid_items:true,
        cargando:false,
        error:null,
        mensaje:null
    })
    
    const [orden,setOrden] = useState({
        orden:null,
        cargando:false,
        error:null,
        mensaje:null
    })
    
    const [eliminar,setEliminar] = useState({
        deleted_item:null,
        cargando:false,
        error:null,
        mensaje:null,
        params:null
    })
    
    const [agregar,setAgregar] = useState({
        shop_id:null,
        cargando:false,
        error:null,
        mensaje:null,
        params:null
    })
    
    const [directo,setDirecto] = useState({
        order_id:null,
        cargando:false,
        error:null,
        mensaje:null,
        params:null
    })
    
    const mapaProductoCarrito= {
      item_int_id: "id_item",
      cart_int_id: "id_carrito",
      prod_int_id: "id_producto",
      price_dec_amount: "precio",
      price_cat_txt_name: "categoria",
      trans_txt_name: "nombre",
      group_txt_name: "nombreGrupo",
    };
    
    
    const [triggerCarrito,setTriggerCarrito] = useState(false)
    const [triggerSetearOrden,setTriggerSetearOrden] = useState(false)
    const [triggerEliminarItem,setTriggerEliminarItem] = useState(false)
    const [triggerAgregarItem,setTriggerAgregarItem] = useState(false)
    const [triggerDirectItem,setTriggerDirectItem] = useState(false)
    
    const getCarrito = () =>{
        setTriggerCarrito(true)
    }
    
    const setearOrden = () => {
        setTriggerSetearOrden(true)
    }
    
    const activarEliminar = (params) => {
        //cart_id
        setEliminar(prevState => ({
          ...prevState,
            params:params
        }));
        setTriggerEliminarItem(true)
    }
    
    const activarAgregar = (params) => {
        setAgregar(prevState => ({
          ...prevState,
            params:params
        }));
        setTriggerAgregarItem(true)
    }
    
    const activarDirecto = (params) => {
        setDirecto(prevState => ({
          ...prevState,
            params:params
        }));
        setTriggerDirectItem(true)
    }
    
    const {data:carritoData,error:carritoError,cargando:carritoCargando,mensaje:carritoMensaje} = apiShopCartGet(triggerCarrito,{language_code:language_code})
    useEffect(()=>{
        
         if(triggerCarrito){
            if(carritoCargando){
                setCarrito(prevState => ({
                  ...prevState,
                    items_quantity:"",
                    items:[],
                    invalid_items:true,
                    error: null,
                    cargando: carritoCargando,
                    mensaje:null
                }));
            }
            else{
                if(carritoMensaje != null){
                    
                    setTriggerCarrito(false)

                    
                        setCarrito(prevState => ({
                          ...prevState,
                            items_quantity:carritoData.items_quantity,
                            items:mapeoArrayItems(carritoData.items,mapaProductoCarrito),
                            invalid_items: carritoData.invalid_items,
                            moneda: carritoData.currency,
                            error: carritoError,
                            cargando: carritoCargando,
                            mensaje:carritoMensaje
                        }));
                    
                    if(carritoError){
                        
                        
                    }
                    
                    
                }
            }
        }
        
        
    },[carritoData,carritoError,carritoCargando,carritoMensaje])
    
    
    const {data:draftData,error:draftError,cargando:draftCargando,mensaje:draftMensaje} = apiShopOrderSet(triggerSetearOrden,{})
    useEffect(()=>{
        
         if(triggerSetearOrden){
            if(draftCargando){
                setOrden(prevState => ({
                  ...prevState,
                    orden:null,
                    error: null,
                    cargando: draftCargando,
                    mensaje:null
                }));
            }
            else{
                if(draftMensaje != null){
                    
                    setTriggerSetearOrden(false)
                    setOrden(prevState => ({
                      ...prevState,
                        orden: draftData.draft_id,
                        error: draftError,
                        cargando: draftCargando,
                        mensaje:draftMensaje
                    }));
                    
                    if(draftError){
                        //
                        warn('Error setting order, please try again');
                    }
                    
                    
                }
            }
        }
        
        
    },[draftData,draftError,draftCargando,draftMensaje])
    
    const {data:eliminarData,error:eliminarError,cargando:eliminarCargando,mensaje:eliminarMensaje} = apiShopItemDelete(triggerEliminarItem,eliminar.params)
    useEffect(()=>{
        
         if(triggerEliminarItem){
            if(eliminarCargando){
                setEliminar(prevState => ({
                  ...prevState,
                    deleted_item: null,
                    error: null,
                    cargando: eliminarCargando,
                    mensaje:null
                }));
            }
            else{
                if(eliminarMensaje != null){
                    
                    setTriggerEliminarItem(false)
                    setEliminar(prevState => ({
                      ...prevState,
                        deleted_item: eliminarData.deleted_item,
                        error: eliminarError,
                        cargando: eliminarCargando,
                        mensaje:eliminarMensaje
                    }));
                    
                    if(eliminarError){
                        //
                        warn('Error deleting item from cart, please try again');
                    }
                    
                    
                }
            }
        }
        
        
    },[eliminarData,eliminarError,eliminarCargando,eliminarMensaje])
    
    const {data:agregarData,error:agregarError,cargando:agregarCargando,mensaje:agregarMensaje} = apiShopItemAdd(triggerAgregarItem,agregar.params)
    useEffect(()=>{
        
         if(triggerAgregarItem){
            if(agregarCargando){
                setAgregar(prevState => ({
                  ...prevState,
                    shop_id: null,
                    error: null,
                    cargando: agregarCargando,
                    mensaje:null
                }));
            }
            else{
                if(agregarMensaje != null){
                    
                    setTriggerAgregarItem(false)
                    setAgregar(prevState => ({
                      ...prevState,
                        shop_id: agregarData.shop_id,
                        error: agregarError,
                        cargando: agregarCargando,
                        mensaje:agregarMensaje
                    }));
                    
                    if(agregarError){
                        
                        warn('Item can´t be added to cart, please try again later');
                    }
                    
                    
                }
            }
        }
        
        
    },[agregarData,agregarError,agregarCargando,agregarMensaje])
    
    const {data:directoData,error:directoError,cargando:directoCargando,mensaje:directoMensaje} = apiShopItemDirect(triggerDirectItem,directo.params)
    useEffect(()=>{
        
         if(triggerDirectItem){
            if(directoCargando){
                setDirecto(prevState => ({
                  ...prevState,
                    order_id: null,
                    error: null,
                    cargando: directoCargando,
                    mensaje:null
                }));
            }
            else{
                if(directoMensaje != null){
                    
                    setTriggerDirectItem(false)
                    setDirecto(prevState => ({
                      ...prevState,
                        order_id: directoData.draft_id,
                        error: directoError,
                        cargando: directoCargando,
                        mensaje:directoMensaje
                    }));
                    
                    if(directoError){
                        
                        warn('Item can´t be buyed right now, please try again later');
                    }
                    
                    
                }
            }
        }
        
        
    },[directoData,directoError,directoCargando,directoMensaje])
    
    return {carrito,orden,eliminar,agregar,directo,getCarrito,setearOrden,activarEliminar,activarAgregar,activarDirecto}
    
}
