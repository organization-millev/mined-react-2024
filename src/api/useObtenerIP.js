import { useState, useEffect } from 'react';
import axios from 'axios';

export const useObtenerIP = () => {
  const [ip, setIp] = useState(() => {
    // Intentar obtener la IP del almacenamiento de sesión
    return sessionStorage.getItem('ipUsuario') || '';
  });

  useEffect(() => {
    const obtenerIP = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_ENDPOINT_IP);
        const nuevaIP = response.data.ip;

        // Si la IP ha cambiado, actualizar el estado y el almacenamiento de sesión
        if (nuevaIP !== ip) {
          setIp(nuevaIP);
          sessionStorage.setItem('ipUsuario', nuevaIP);
        }
      } catch (error) {
        console.error('Error al obtener la IP:', error);
      }
    };

    // Si no hay IP en el estado, intentar obtenerla
    if (!ip) {
      obtenerIP();
    }
  }, [ip]);

  return ip;
};

export default useObtenerIP;