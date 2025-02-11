import React from 'react';

const InputArea = ({ type = 'text', placeholder = '', name, value, onChange,className}) => {
  
    const inputClassName = `
        w-full
        min-h-[138px]
        py-2 px-3 
        border 
        border-azul-oscuro-grisáceo 
        rounded-[20px] 
        text-sm 
        font-sans
        font-medium 
        leading-5 
        text-left 
        text-gris-oscuro 
        focus:border-gray-600
        focus:outline-none 
        focus:shadow-outline
        bg-white
        shadow
        resize-none
        focus:ring-0
        dark:text-blanco
        dark:border-blanco
        dark:bg-color-dark
        ${className}
    `;
    
    const handleChange = (e) => {
        //onChange(e);
        onChange(e.target.value);
    };
  
  
  return (
    
    <textarea
      className={inputClassName}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputArea;
