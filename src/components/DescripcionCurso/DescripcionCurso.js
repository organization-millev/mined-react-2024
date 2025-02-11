import React from 'react';



const DescripcionCurso = ({tituloCurso = "Más sobre Trading Pro"}) => {
    
   const Contenedor_Descripcion_Curso  = "w-[90%] rounded-[16px] border-1 h-auto p-[30px]  shadow-lg"; 
   const Texto_Titulo_Descripcion = "font-sans font-bold text-xl mb-2	";
   const Texto_Parrafo_Descripcion = "max-h-[170px] font-sans text-sm";
 
 
  return (
     <>
        <div className={Contenedor_Descripcion_Curso}>
            <p  className={Texto_Titulo_Descripcion}>{tituloCurso}</p>
            <p className={Texto_Parrafo_Descripcion}> Si quieres ser un trader exitoso, debes seguir 3 pilares: Tener un sistema de análisis, trabajar en la psicología del inversor y tener una buena gestión de riesgo.</p>
            <p className={Texto_Parrafo_Descripcion}>NUESTROS EDUCADORES:  Cuentan con la certificación de trading CEWA y con cuentas auditadas, donde se muestra su rentabilidad y experiencia para invertir. Estudia una de las carreras más rentables del mundo.</p>
        </div>

    </>
  );
};

export default DescripcionCurso;





