import { useState, useEffect } from 'react';
import axios from 'axios';
import useObtenerIP from './useObtenerIP'; // Importa tu hook useObtenerIP

export const useObtenerPais = () => {
  const [pais, setPais] = useState(() => {
    return sessionStorage.getItem('paisUsuario') || '';
  });

  const ip = useObtenerIP(); // Utiliza el hook useObtenerIP para obtener la IP

  useEffect(() => {
    const obtenerPais = async () => {
      try {
        if (ip && !pais) {
          // Construir la URL completa para la solicitud a ipinfo.io
          const url = `${process.env.REACT_APP_ENDPOINT_PAIS}/${ip}?token=c164044ce6609f`;

          const response = await axios.get(url);

          const nuevoPais = response.data.country;

          if (nuevoPais !== pais) {
            setPais(nuevoPais);
            sessionStorage.setItem('paisUsuario', nuevoPais);
          }
        }
      } catch (error) {
        console.error('Error al obtener el país:', error);
      }
    };

    if (ip && !pais) {
      obtenerPais();
    }
  }, [ip, pais]);

  return pais;
};

export default useObtenerPais;