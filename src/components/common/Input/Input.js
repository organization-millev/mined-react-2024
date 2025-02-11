import React from 'react';
import classNames from 'classnames';

const Input = ({ type = 'text', placeholder = '', name, value, onChange, className }) => {
  const inputClassName = classNames(
    `
      w-full 
      h-10 
      py-0 px-3 
      border 
      border-azul-oscuro-grisáceo 
      rounded-full 
      text-sm 
      font-sans
      font-medium 
      leading-5 
      text-left 
      text-gris-grafito
      focus:border-gray-600
      focus:outline-none focus:shadow-outline
      bg-white
      shadow
      focus:ring-0
      placeholder-gris-oscuro
      dark:text-blanco
      dark:border-blanco
      dark:bg-color-dark
    `,
    className,
    {
      //'border-azul-oscuro-grisáceo': !className.includes('border-rojo-coral'), // mantener el borde azul por defecto si no hay error
      //'border-rojo-coral': className.includes('border-rojo-coral'), // aplicar borde rojo solo si hay error
    }
  );

  return (
    <input
      className={inputClassName}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;