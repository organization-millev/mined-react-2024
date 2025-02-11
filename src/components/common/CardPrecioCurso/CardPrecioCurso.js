import React, { useState,useEffect } from 'react';
import CarritoAgregar from '../../iconos/add_shopping_cart';
import CarritoAgregarBlanco from '../../iconos/add_shopping_cart_white';
import Tarjeta from '../../iconos/credit_card';
import TarjetaBlanca from '../../iconos/credit_card_white';
import Iconos from '../../iconos/iconos';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAlert  } from '../../../providers/AlertContext';

const CardPrecioCurso = ({ prices, fondoGradient,accionAgregar,accionEliminar,cargando,itemSeleccionado }) => {
    const { t } = useTranslation();
    const { warn, success } = useAlert();
    const navigate = useNavigate();

    const BOTONES = "hover_to_dark text-medium lg:text-large font-bold bg-white lg:p lg:gap-[4px] dark:bg-color-dark dark:text-blanco dark:hover:bg-color-dark2  rounded-[40px] py-[5px] px-[10px] flex flex-row items-center justify-center w-full hover:bg-gris-azulado-profundo hover:text-white transition ease-in-out duration-300";
    
    
    
    const [selected,setSelected] = useState(false)
    const handleClickCategoria = (event) => {
        
        if(!cargando){
          setSelected(event.currentTarget.getAttribute("data-id"))  
        }
        
        
    }
    const handleClickAgregar = (event) => {
        if(selected){
            accionAgregar(selected)
        }
        else{
            warn(t("cartMissingItems"))  
        }
        
    }
    const handleClickAgregarDirect = (event) => {
        if(selected){
            accionAgregar(selected,"direct")
        }
        else{
            warn(t("cartMissingItems"))  
        }
    }
    const handleClickEliminar = (event) => {
        
        if(selected){
            accionEliminar(selected)
        }
        
    }
    
    useEffect(()=>{
        if(itemSeleccionado){
            if(itemSeleccionado.price_cat_int_id != null){
               setSelected(itemSeleccionado.price_cat_int_id) 
            }
        }
        else{
            setSelected(false)
        }
        
    },[itemSeleccionado])

    return (
        <div className="w-[100%] max-w-[518px] mx-auto h-auto">
            <div className="rounded-[20px] p-6 lg:max-w-[518px]" style={{background:fondoGradient}}>
                <div className="text-white dark:text-color-dark font-sans">
                    <p className="text-center text-small font-medium mb-2">{t('precioEspecial')} </p>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center  w-full justify-around lg:max-w-[400px]">
                            {prices.map((price, index) => (
                                <div key={index} data-id={price.category_id} className={"flex flex-col justify-center items-center cursor-pointer" + ((selected == price.category_id) ? " selected-price text-black dark:text-blanco":"")} onClick={handleClickCategoria}>                                    <div className="font-sans font-semibold flex flex-row items-end gap-1">
                                        <p className="text-extra">$</p>
                                        <p className="text-2extra">{price.amount}</p>
                                    </div>
                                    <p className="text-small font-medium">{price.category}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center my-5 px-3">
                    <hr className="border-white dark:border-color-dark w-full lg:max-w-[300px]" />
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                    {(itemSeleccionado) ?
                        <button className={BOTONES} onClick={handleClickEliminar} disabled={cargando}>
                            <span className="text-large">{t('btnEliminarCarrito')}</span>
                            <Iconos icono="eliminar" className="affected icono-semi-md " /> 
                        </button>
                       :
                        <button className={BOTONES} onClick={handleClickAgregar} disabled={cargando}>
                            <span className="text-large">{t('btnAgregarCarrito')}</span> 
                            <CarritoAgregar className="affected icono-semi-md" /> 
                        </button>
                    }
                    {(itemSeleccionado) ? 
                    <button className={BOTONES} disabled={cargando} onClick={() => {navigate('/carrito')}}>
                        <span className="text-large">{t('btnIrCarrito')}</span>
                        <Iconos icono="flechaDer" className="affected icono-semi-md" /> 
                    </button>
                        :
                    <button className={BOTONES} disabled={cargando} onClick={handleClickAgregarDirect}>
                        <span className="text-large">{t('btnComprarAhora')}</span>
                        <Tarjeta className="affected icono-semi-md" />  
                    </button>   
                    }
                </div>
                <div className={"flex hidden-boxes"+((cargando)?" show":"")}>
                    <div className="w-[60%] mx-auto bg-white h-[5px] mt-[5px] rounded-full">
                        <div className={"bg-[#3486C5] h-full rounded-full loading-bar-mini"+((cargando)?" loading":"")}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPrecioCurso;