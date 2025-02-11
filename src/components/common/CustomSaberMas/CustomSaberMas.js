import React from 'react';


const CustomSaberMas = ({ text, className, onClick }) => {
  
  const buttonStyle = "bg-gris-claro lg:bg-gris-azulado-profundo text-azul-oscuro-grisáceo lg:text-white text-xs lg:text-sm font-bold  font-sans py-2 px-4 rounded-2xl hover:bg-[#656472]";

  
  return (
    
    <button className={buttonStyle} onClick={onClick}>
      
      {text}
      
    </button>
    
  );
}

export default CustomSaberMas;


