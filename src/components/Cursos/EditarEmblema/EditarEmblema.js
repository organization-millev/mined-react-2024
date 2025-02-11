import React, { useState,useEffect } from 'react';

import EmblemList from '../../common/EmblemList/EmblemList'

import { useTranslation } from 'react-i18next';

const EditarFoto = (props) => {
    //La lista deberia rellenarse desde la pagina principal de donde se llama el hook osea perfil
    const { t } = useTranslation();

    const listaEmblemas = [
      {
          id:"1",
          className:null,
          seleccionado:false,
          titulo:"Trader"
      },
      {
          id:"2",
          className:"!bg-verde-esmeralda",
          seleccionado:true,
          titulo:"WEC"
      },
      {
          id:"1",
          className:null,
          seleccionado:false,
          titulo:"Trader"
      },
      {
          id:"1",
          className:null,
          seleccionado:false,
          titulo:"Trader"
      },
      {
          id:"1",
          className:null,
          seleccionado:false,
          titulo:"Trader"
      },
      {
          id:"1",
          className:null,
          seleccionado:false,
          titulo:"Trader"
      },
      {
          id:"1",
          className:null,
          seleccionado:false,
          titulo:"Trader"
      },
      {
          id:"1",
          className:null,
          seleccionado:false,
          titulo:"Trader"
      },
      {
          id:"1",
          className:null,
          seleccionado:false,
          titulo:"Trader"
      },
      {
          id:"1",
          className:null,
          seleccionado:false,
          titulo:"Trader"
      },
      {
          id:"1",
          className:null,
          seleccionado:false,
          titulo:"Trader"
      },
      {
          id:"1",
          className:null,
          seleccionado:false,
          titulo:"Trader"
      },
    ]
    
    const handleClick = (item) => {
        
    }
    
    return (
        <>
            <div className="flex flex-col mb-3">
                <span className="text-largeB font-semibold mb-2">{t('editaEmblema')} </span>
                <span className="text-small mb-2">{t('editaTituloAvatar')}</span>
                <div className="flex flex-col">
                    <span className="text-small font-semibold mb-2">{t('titulosDisponibles')}</span>
                    <EmblemList lista={listaEmblemas} onClick={handleClick} />
                </div>
            </div>
            
        </>
        
        )
}

export default EditarFoto