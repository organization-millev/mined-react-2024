import React, { useState,useEffect } from 'react';
import ProductosCarrito from '../common/ProductosCarrito/ProductosCarrito'
import CarritoResumen from '../common/CarritoResumen/CarritoResumen'
import CarritoEliminarModal from '../common/CarritoEliminarModal/CarritoEliminarModal'
import Navbar from '../Navbar/Navbar'; 
import AvisoLegal from '../common/AvisoLegal/AvisoLegal';
import Footer from '../Footer/Footer';
import Iconos from '../iconos/iconos'

import FlechaDerDark from '../iconos/arrow_forward'

import { useTranslation } from 'react-i18next';
import {useCarrito} from '../../hooks/useCarrito'
import {useNavigate} from 'react-router-dom';
import { useLoading } from '../../providers/LoadingContext';

const CarritoCompra = () => {
    const { showLoadingForAWhile } = useLoading();
    useEffect(() => {
        showLoadingForAWhile();
    }, []);
    const { t } = useTranslation();

    const {carrito,orden,eliminar,getCarrito,setearOrden,activarEliminar} = useCarrito()
    const [cargandoEnvio,setCargandoEnvio] = useState(false)
    const [abrirEliminar,setAbrirEliminar] = useState(false)
    const [itemSeleccionado,setItemSeleccionado] = useState(null) 
    const navigate = useNavigate();
    
    const EliminarItem = (event) => {
        
        let cart_id = event.currentTarget.getAttribute("id_prod") 
        setItemSeleccionado({cart_id:cart_id})
        setAbrirEliminar(true)
    }
    
    const activarEliminarFunc = () => {
        activarEliminar(itemSeleccionado)
        CerrarModalEliminar()
        setCargandoEnvio(true)
    }
    
    const CerrarModalEliminar = () => {
        setAbrirEliminar(false)
    }
    
    const EventoContinuar = () => {
        setearOrden()
    }
    
    useEffect(()=>{
        
        if(!orden.cargando && orden.error == null && orden.orden ){
            
            
            localStorage.setItem("orden_boceto",orden.orden)
            navigate(`/pago?draft=${orden.orden}&origin=shopping_cart`)    
        }
        
        else if(!orden.cargando && orden.error != null){
            setCargandoEnvio(false)
            getCarrito()
        }
        
    },[orden.cargando])
    
    useEffect(()=>{
        getCarrito()
    },[])
    
    useEffect(()=>{
        if(!carrito.cargando) {
            setCargandoEnvio(false)
        }
        if(carrito.cargando){
            setCargandoEnvio(true)
        }
    },[carrito.cargando])
    
    useEffect(()=>{

        if(!eliminar.cargando && eliminar.mensaje != null && eliminar.deleted_item != null ){
            
            getCarrito()
            
        }
        else if(!eliminar.cargando && eliminar.error != null){
        }
        
    },[eliminar])
    
    return(
        <>
            <Navbar  logoAlt="Logo"/>
            <div className="min-h-[calc(100vh-120px)]">
                <div className="semi-full-container  flex flex-col gap-3 mt-[60px]">
                    <span className="text-3extra font-semibold dark:text-blanco">{t('tuCarrito')}</span>
                    <p className="text-largeB dark:text-blanco ">{t('verTodosLosProductos')} </p>
                </div>
                {
                (carrito.items.length == 0 && !carrito.cargando)
                ?
                 <div className="semi-full-container  mt-[30px] mb-[60px]">
                    <div className="bg-gris-claro dark:bg-color-dark2 w-full rounded-2xl px-5 py-5 flex flex-col gap-1 justify-center items-center ">
                        <span className="text-xl font-semibold dark:text-blanco">{t('carritoVacio')} </span>
                        <span className="text-large font-normal text-gris-oscuro mb-3 dark:text-blanco">{t('cuandoAgreguesApareceraAqui')} </span>
                        <button className="rounded-full boton-primario dark:!bg-gris-medio text-medium w-full" disabled={true}>
                        <div className="flex p-1 gap-2 justify-center items-center"> 
                            <span className="font-bolder text-medium dark:text-color-dark dark:!font-bold ">{t('continuarCompra')}</span> 
                            <Iconos icono={"FlechaBlanco"} className={"icono-mini-sm dark:hidden"} /> 
                            <FlechaDerDark className="dark:block hidden !w-[24px] !h-[24px]" padding="0px"/>
                        </div>
                    </button>
                    </div>
                 </div> 

                :<div className="semi-full-container mt-[30px] mb-[60px]">
                    <div className="w-full grid grid-row-flow-dense lg:grid-cols-2 mt-2 gap-4">
                        <div>
                            {
                                (cargandoEnvio) ? 
                                <>
                                    <div className={"flex bg-gris-claro dark:bg-color-dark2 w-full rounded-2xl items-center min-h-[60px] p-4 mb-3 gap-4 animate-tw-pulse"}>
                                        <div ></div>
                                    </div>
                                </>
                                :
                                carrito.items.map((obj,ind)=>(
                                <>
                                    <ProductosCarrito nombre={obj.nombre} isTool={obj.is_tool} isValid={obj.is_valid} nombreAcademia={obj.nombreGrupo} descripcion={obj.price_cat_txt_name_lng} id_prod={obj.id_item} accionEliminar={EliminarItem} prod_txt_status={obj.prod_txt_status} tag={obj.tag}/>
                                </>
                                ))
                            }
                        </div>
                        <div>
                            <CarritoResumen carrito={carrito} accion={EventoContinuar} cargando={cargandoEnvio} cargandoOrden={orden.cargando}/>
                        </div>
                    </div>
                </div>
                }
            </div>
            <AvisoLegal/>
            <Footer/>
            <CarritoEliminarModal mostrarModalFinal={abrirEliminar} cerrarModal={CerrarModalEliminar} accionEliminar={activarEliminarFunc} />
        </>
        )
    
}

export default CarritoCompra