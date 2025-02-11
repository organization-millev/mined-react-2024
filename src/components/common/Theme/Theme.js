import React, { useState, useEffect } from 'react';
import Luna from '../../iconos/dark_mode';
import LunaSelect from '../../iconos/dark_mode__fill_white';
import Sol from '../../iconos/light_mode';
import SolSelect from '../../iconos/light_mode__fill';

const Theme = ({ onThemeChange }) => {
  
  //const [theme, setTheme] = useState('light');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  

  /*useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (onThemeChange) onThemeChange(theme);
  }, [theme]);


  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };*/
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]); // Efecto se ejecuta cuando cambia el tema
  
  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    /*if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }*/
    window.location.reload();
  };

  return (
    <div className="bg-white border-[1px] border-gris-oscuro rounded-3xl inline-flex h-[30px] w-full">
      <button
        className={`flex items-center justify-center w-1/2 rounded-l-3xl ${theme === 'light' ? 'bg-gris-azulado-profundo' : ''}`}
        onClick={() => handleThemeChange('light')}
      >
        <div className="relative flex items-center justify-center transition-opacity duration-300">
          <div className={`${theme === 'light' ? 'block' : 'hidden'}`}>
            <SolSelect />
          </div>
          <div className={`${theme === 'light' ? 'hidden' : 'block'}`}>
            <Sol />
          </div>
        </div>
      </button>
      <button
        className={`flex items-center justify-center w-1/2 rounded-r-3xl ${theme === 'dark' ? 'bg-gris-azulado-profundo' : ''}`}
        onClick={() => handleThemeChange('dark')}
      >
        <div className="relative flex items-center justify-center transition-opacity duration-300">
          <div className={`${theme === 'dark' ? 'block' : 'hidden'}`}>
            <LunaSelect />
          </div>
          <div className={`${theme === 'dark' ? 'hidden' : 'block'}`}>
            <Luna />
          </div>
        </div>
      </button>
    </div>
  );
};

export default Theme;