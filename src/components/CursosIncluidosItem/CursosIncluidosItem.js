import React, { useState } from 'react';




const CursosIncluidosItem = ({urlCurso , nombreCurso , modulo , clase , tiempo , descripcion }) => {
    const contenedor_general = "w-full h-auto flex flex-row p-3 gap-5 border-[1px] border-b-gris-medio";  
    const contenedor_imagen = "w-[15%]";  
    const contenedor_texto = "w-[85%] flex flex-col justify-center font-sans";

  return (
      
    <>
        <div className={contenedor_general}>
            
            <div className={contenedor_imagen}>
                <img  src={urlCurso} className="rounded-[16px]" />    
            </div>
            
            <div className={contenedor_texto}>
                <p className="font-bold	 text-xl text-gris-azulado-profundo">{nombreCurso}</p>        
                <p className="text-sm font-medium text-gris-oscuro mb-3">{modulo} | {clase} | {tiempo}</p>
                <p className="text-xs font-normal text-gris-azulado-profundo">Descripcion del curso Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
            </div>
        </div>
    </>
  );
};

export default CursosIncluidosItem;

