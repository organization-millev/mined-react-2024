import React, { useState } from 'react';
import Visibility from '../../iconos/visibility';
import VisibilityOff from '../../iconos/visibility_off';
import classNames from 'classnames';

const PasswordInput = ({ placeholder = '', name, value, onChange, className }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

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
    `,
    className
  );

  const iconClassName = classNames(
    `
      absolute 
      right-3 
      top-1/2 
      transform 
      -translate-y-1/2 
      cursor-pointer 
      transition-opacity 
      duration-200 
      ease-in-out
    `
  );

  return (
    <div className="relative">
      <input
        className={inputClassName}
        autoComplete="off"
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          WebkitTextSecurity: showPassword ? 'none' : 'disc',
          MozTextSecurity: showPassword ? 'none' : 'disc',
          textSecurity: showPassword ? 'none' : 'disc',
          fontFamily: showPassword ? 'Montserrat, sans-serif' : "'text-security-disc', 'Montserrat', 'sans-serif'",
        }}
      />
      <div className={iconClassName} onClick={togglePasswordVisibility}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </div>
    </div>
  );
};

export default PasswordInput;