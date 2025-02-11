import React, { useState, useRef, useEffect } from 'react';
import FlechaAbajo from '../../iconos/expand_more';
import FlechaArriba from '../../iconos/keyboard_arrow_up';
import FlechaAbajoDark from '../../iconos/expand_more_white';
import FlechaArribaDark from '../../iconos/keyboard_arrow_up_white';

import Bandera from '../../iconos/bandera_peru';
import { useTimeZone } from '../../../hooks/support/useTimeZone';

const DropdownPais = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openContinent, setOpenContinent] = useState(null); 
  const dropdownRef = useRef(null);
  
  const [selectedCountry, setSelectedCountry] = useState(localStorage.getItem('selectedCountry') || 'America/Lima'); 
  const [selectedCountryUrl, setSelectedCountryUrl] = useState(localStorage.getItem('selectedCountryUrl') || '/assets/iconos/bandera_peru.svg'); 

  const handleClickOutside = (event) => {
    // Verifica si el clic es fuera del dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Cierra el dropdown si se hace clic fuera
    }
  };
  const { GetTimeZone, timeZone } = useTimeZone();

  useEffect(() => { 
    GetTimeZone(); 
  }, []);

  //
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleContinent = (continent) => {
    if (openContinent === continent) {
      setOpenContinent(null); 
    } else {
      setOpenContinent(continent); 
    }
  };

  const groupByContinent = (zones) => {
    return zones.reduce((acc, zone) => {
      const continent = zone.timz_txt_group;
      if (!acc[continent]) {
        acc[continent] = [];
      }
      acc[continent].push(zone);
      return acc;
    }, {});
  };

  const continents = groupByContinent(timeZone);
  
  const handleCountryClick = (countryName, countryCode, timz_txt_flag_url) => {
    setSelectedCountry(countryCode); 
    localStorage.setItem('selectedCountry', countryCode); 
    localStorage.setItem('selectedCountryUrl', timz_txt_flag_url); 
    window.location.reload(); 
  };


  useEffect(() => {
    const savedCountry = localStorage.getItem('selectedCountry');
    const saveCountryUrl = localStorage.getItem('selectedCountryUrl');
    if (savedCountry) {
      setSelectedCountry(savedCountry); 
      setSelectedCountryUrl(saveCountryUrl);
    }
  }, []);


  return (
    <div className="flex items-center justify-center" ref={dropdownRef}>
      <Bandera className="w-[24px] h-[24px] !p-0" onClick={toggleDropdown}  url={`${process.env.REACT_APP_URL_IMG}${selectedCountryUrl}`} />
         
      {isOpen && (
        <div className="absolute top-[60px] bg-white dark:bg-color-dark2 shadow-custom-strong rounded-md w-[170px] h-[225px] max-h-[300px] !overflow-y-auto">
          {Object.keys(continents).map((continent) => (
            <div key={continent} className="">
              <div
                className="flex justify-between items-center p-2 text-xs h-[45px]"
                onClick={() => toggleContinent(continent)}
              >
                {continent}
                {openContinent === continent ? 
                  <>
                    <FlechaArriba className="cursor-pointer dark:hidden" />
                    <FlechaArribaDark className="cursor-pointer hidden dark:block" />
                  </>
                  
                  :
                  <>
                    
                    <FlechaAbajo className="cursor-pointer dark:hidden" />
                    <FlechaAbajoDark className="cursor-pointer  hidden dark:block" />
                  </>
                  }
              </div>

              {openContinent === continent && (
                <div className="pb-2 text-xs">
                  {continents[continent]
                    .filter(country => country.timz_txt_country_name)  
                    .map((country, index) => (
                      <div
                        key={index}
                        onClick={() => handleCountryClick( country.timz_txt_country_name, country.timz_txt_name, country.timz_txt_flag_url )} // Almacena el nombre y código del país
                        className="flex px-4 flex-row items-center gap-[5px] hover:bg-gray-200 dark:hover:bg-gris-carbón cursor-pointer"
                      >
                        <img src={`${process.env.REACT_APP_URL_IMG}${country.timz_txt_flag_url}`} 
                             alt={country.timz_txt_flag_url}
                             className="w-4 h-4"
                        />
                        <div className="h-[32px] max-h-[32px] flex items-center">
                          <p className={selectedCountry === country.timz_txt_name ? 'font-bold' : 'font-normal'}>
                            {country.timz_txt_country_name}
                          </p>
                        </div>
                      </div>
                  ))}
                  
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownPais;
