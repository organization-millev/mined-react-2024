import React, { useState,useEffect } from 'react';
import Iconos from '../../iconos/iconos';
import {convertirMonedas} from '../../../utils/funciones'
import { useTranslation } from 'react-i18next';


const CarritoFinalModal = (props) => {
    
    const { t } = useTranslation();
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    
    const [totalOrden,setTotalOrden] = useState({
        total:0,
        puntos:0
    })
    
    const [imagenCheck,setImagenCheck] = useState("")
    
    useEffect(()=>{
        
        if(props.orden.orden_boceto != null){
            
            let total = props.orden.items.reduce(function(a,b){return a + b["precio"]},0)
            setTotalOrden({
                total:total,
            })
            
        }
        
    },[props.orden])
    
    useEffect(()=>{
        
        switch(props.tipo){
            case "SUCCESS":
                setImagenCheck("check_verde")
                break;
            case "PENDING": 
                setImagenCheck("check_verde")
                break;
            case "BINANCEPENDING":
                setImagenCheck("check_verde")
                break;
            case "ERROR":
                setImagenCheck("ErrorOn")
        }
        
    },[props.tipo])
    

    
    return (<>
        
        <div className="flex flex-col w-full p-4 items-center h-fit">
            <div className="">
                
                <Iconos icono={imagenCheck} className="!p-0 w-[150px] h-[150px]" />
                
            </div>
            <div className="max-w-[500px] flex flex-col items-center">
                <span className="text-extra font-semibold mb-4">{props.titulo}</span>
                <p dangerouslySetInnerHTML={{ __html: props.mensaje }}  className="text-medium max-w-[400px] text-center mb-4"></p>
            </div>
            {(props.tipo == "SUCCESS" || props.tipo == "PENDING") ?
            <>
                <div className="max-w-[500px] flex flex-col items-center">
                <p className="text-medium max-w-[400px] text-center mb-4">Fecha de solicitud: {props.opsdate.data.datetime}</p>
            </div>
                <div className="bg-gris-claro w-full max-w-[500px] min-h-[400px] rounded-2xl px-5 py-5 flex flex-col">
                <span className="text-xl font-bold">{t('resumenCompra')}</span>
                <div className="flex flex-col flex-wrap gap-4 mt-3 p-3">
                    {
                        props.orden.items.map((obj,ind)=>(
                            <div key={obj.id_producto}>
                                <div className="flex flex-wrap flex-col">
                                    <span className="text-modalBase">{obj.nombre}</span>
                                    <span className="text-modalBase">{(obj.draft_item_text_sale != "true") ? JSON.parse(obj.price_cat_txt_name_lng)[language_code] : obj.trans_txt_desc_prom_sale}</span>
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
            </> :
            <></>
            }
        </div>
    </>)
    
    
}

export default CarritoFinalModal