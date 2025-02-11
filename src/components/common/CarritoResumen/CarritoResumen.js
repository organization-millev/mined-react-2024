import React, { useState,useEffect } from 'react';
import Iconos from '../../iconos/iconos'
import FlechaDark from '../../iconos/arrow_forward'
import {convertirMonedas} from '../../../utils/funciones'
import { useTranslation } from 'react-i18next';

const CarritoResumen = (props) => {
    
    const { t } = useTranslation();

    const [totalCarrito,setTotalCarrito] = useState({
        total:0
    })
    
    useEffect(()=>{
        
        if(props.carrito != null){
            
            let total = props.carrito.items.reduce(function(a,b){return a + b["precio"]},0)
            setTotalCarrito({
                total:total,
            })
            
        }
        
    },[props.carrito])
    
    return(<>
        {
        (props.cargando) ?
        <div className="bg-gris-claro dark:bg-color-dark2 w-full rounded-2xl px-5 py-5 flex flex-col animate-tw-pulse">
            <div className="flex flex-col flex-wrap gap-1 mt-3">
            </div>
            <div className="mt-auto h-[300px]">
            </div>
        </div>
        :<div className="bg-gris-claro dark:bg-color-dark2 dark:text-blanco w-full rounded-2xl px-5 py-5 flex flex-col">
            <div className="flex flex-col flex-wrap gap-1 mt-3">
                {
                    props.carrito.items.map((obj,ind)=>(
                        <div key={obj.id_producto}>
                            <div className="flex flex-wrap">
                                <span className="text-large text-gris-oscuro dark:text-blanco dark:font-normal">{obj.nombre}</span>
                                <span className="text-large ms-auto text-gris-oscuro dark:text-blanco dark:font-normal">{convertirMonedas(props.carrito.moneda)}{obj.precio} </span>
                                
                            </div>
                        </div>
                    
                    ))
                }
                
            </div>
            <div className="mt-auto">
                
                <div className="flex flex-wrap mt-3">
                    <span className="text-xl font-semibold">{t('total')} </span>
                    <span className="text-xl ms-auto"> {convertirMonedas(props.carrito.moneda)}{totalCarrito.total} </span>
                </div>
                <div className="w-full mt-[10px]">
                    <button className="rounded-full boton-primario dark:boton-secundario dark:font-bold text-medium w-full" onClick={props.accion} disabled={props.carrito.invalid_items || props.cargandoOrden}>
                        <div className="flex p-1 gap-2 justify-center items-center"> 
                            <span className="font-bolder text-medium">{t('continuarCompra')} </span> 
                            <Iconos icono={"FlechaBlanco"} className={"icono-mini-sm dark:!hidden"} />
                            <FlechaDark className="!hidden dark:!block h-[24px] w-[24px] !p-0"/>
                            
                        </div>
                    </button>
                </div>
            </div>
        </div>
        }
    </>)
}

export default CarritoResumen