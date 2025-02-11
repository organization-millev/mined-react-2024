import React, { useState,useEffect } from 'react';
import {convertirMonedas} from '../../../utils/funciones'
import { useTranslation } from 'react-i18next';


const ResumenCompra = (props) => {
    const { t } = useTranslation();

    const [totalOrden,setTotalOrden] = useState({
        total:0,
        puntos:0
    })
    
    useEffect(()=>{
        
        if(props.orden.orden_boceto != null){
            
            let total = props.orden.items.reduce(function(a,b){return a + b["precio"]},0)
            
            setTotalOrden({
                total:total,
            })
            
        }
        
    },[props.orden])
    
    return(<>
        <div className="bg-gris-claro dark:bg-color-dark2  w-full min-h-[500px] rounded-2xl px-5 py-5 flex flex-col">
            <span className="text-xl font-bold">{t('resumenCompra')}</span>
            <div className="flex flex-col flex-wrap gap-4 mt-3">
                {
                    props.orden.items.map((obj,ind)=>(
                        <div key={obj.id_producto}>
                            <div className="flex flex-wrap">
                                <span className="text-large">{obj.nombre}</span>
                                <span className="text-large ms-auto">{convertirMonedas(props.orden.moneda)}{obj.precio} </span>
                            </div>
                        </div>
                    
                    ))
                }
                
            </div>
            <div className="mt-auto border-t border-black">
                
                <div className="flex flex-wrap mt-3">
                    <span className="text-xl">{t('total')}</span>
                    <span className="text-large ms-auto">{convertirMonedas(props.orden.moneda)}{totalOrden.total}</span>
                </div>
            </div>
        </div>
    </>)
}

export default ResumenCompra