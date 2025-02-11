import React from 'react';


const DescripcionClase = ({tituloClase = "En el curso MINED Binarias te enseñaremos a operaren el mercado de opciones binarias" }) => {
    
   const Contenedor_Descripcion_Curso  = "w-full rounded-[16px] border-1 h-auto p-[30px]  shadow-lg"; 
   const Texto_Titulo_Descripcion = "font-sans font-semibold text-xl mb-2	";
   const Texto_Parrafo_Descripcion = "max-h-[170px] font-sans text-sm";
 
 
  return (
     <>
        <div className={Contenedor_Descripcion_Curso}>
            <p  className={Texto_Titulo_Descripcion}>{tituloClase}</p>
           <p className={Texto_Parrafo_Descripcion}> En este curso aprenderás todo lo necesario para entender y dominar
            todos los conceptos relacionados a las opciones binarias. Después de terminar
            el módulo 3, podrás conectarte a los temarios de MINED TV, y obtener más
            experiencia de los educadores en vivo con un chat en tiempo real.En esta academia aprenderás todo lo necesario para entender y dominar
            todos los conceptos relacionados a las opciones binarias. Después de terminar
            el módulo 3, podrás conectarte a los temarios de MINED TV, y obtener más
            experiencia de los educadores en vivo con un chat en tiempo real.</p>
        </div>

    </>
  );
};

export default DescripcionClase;