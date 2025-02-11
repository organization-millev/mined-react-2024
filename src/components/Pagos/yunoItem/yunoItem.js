import React, { useState,useEffect } from 'react';
import Iconos from '../../iconos/iconos'
import { useTranslation } from 'react-i18next';

const YunoItem = ({isOpenBinance,isOpenYuno,isOpenNuvei,onClickItem,onClickPay,cargandoYuno,pagoSeleccionado}) => {
    const { t } = useTranslation();

    
    return(
    <div className={((isOpenBinance || isOpenNuvei) ? "!max-h-0" : "!max-h-[1000px] !opacity-100") + " transicion-up-down"}>
        <div className={"flex bg-gris-claro dark:bg-color-dark2 w-full rounded-2xl items-center min-h-[60px] p-4 mb-3"}>
            <img src="/assets/images/logo_yuno_morado.png" className="h-[40px] p-3"></img>
            {(!isOpenYuno) ?
                <button className="rounded-full boton-primario !p-0 ms-auto" onClick={onClickItem}> 
                    <div className="h-[30px] w-[30px] flex items-center justify-center" >
                        <Iconos icono={"FlechaBlanco"} className={"icono-mini-sm"} /> 
                    </div>
                </button>
                :
                <button className="!p-0 ms-auto" onClick={onClickItem} disabled={cargandoYuno}>
                    <span className="text-small underline">{t('modificar')}</span>
                </button>
            }
        </div>
        <div className={((isOpenYuno) ? "!max-h-[1000px] !opacity-100" : "!max-h-0 ") + " flex flex-col transicion-up-down"}>
            <div className="min-h-[400px] flex flex-col">
                {(isOpenYuno & !cargandoYuno) ?
                    <>
                    <div className="Yuno-container-medios"></div>
                    <div className="mt-auto">
                       <button className="boton-primario" onClick={onClickPay} disabled={!pagoSeleccionado} >{t('btnPagar')}</button> 
                    </div> 
                    </>:
                    <span>{t('cargandoPago')} </span>
                }
            </div>    
                
        </div>
    </div>)
}

export default YunoItem