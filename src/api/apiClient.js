// api.js
import React, { useState, useEffect,useContext  } from 'react';
import axios from 'axios';
import qs from 'qs'; 
import { obtenerInfoDispositivo } from '../utils/funciones';
import { useApiClient } from './useApiClient';


export const useEnviarSolicitudPostFormUrlEncoded = (prefijo = "general" ) => {
  
  const apiClient = useApiClient( prefijo );

  const enviarSolicitud = async (endpoint, parametrosHeader, parametrosPost, requiereAutorizacion = false ) => {
  
    try {
      const headers = {
        ...parametrosHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      
      if (requiereAutorizacion) {
         const token =  localStorage.getItem('accessToken');
         if (!token) {
          throw new Error('No authorization token found');
         }
         headers['Authorization'] = `Bearer ${token}`;
      }

      const ip = sessionStorage.getItem('ipUsuario') || 'No disponible';
      const pais = sessionStorage.getItem('paisUsuario') || 'No disponible';
      const { sistemaOperativo, tipoDispositivo } = obtenerInfoDispositivo();
      const parametrosFijos = {
        user_agent : sistemaOperativo,
        device: tipoDispositivo,
        ip_address: ip,
        user_country:pais,
        //au_id_dispositivo: "No disponible",
        app_name:"minedacademy",
      };
        
      const parametrosPostCombinados = {
        ...parametrosFijos,
        ...parametrosPost
      };
      
      const data = qs.stringify(parametrosPostCombinados);
      const response = await apiClient.post(endpoint, data, { headers });
      return response.data;
    } catch (error) {
      // Manejo de errores
      return { error };
    }
    
  };

  return enviarSolicitud;
};



export const ApiPost = (triggerApiCall, endpoint, parametrosHeader, parametrosPost, requiereAutorizacion = false, prefijo = "general") => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const enviarSolicitud = useEnviarSolicitudPostFormUrlEncoded(prefijo);
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const respuesta = await enviarSolicitud(endpoint, parametrosHeader, parametrosPost, requiereAutorizacion);
        //
        setError(respuesta.error);
        if (respuesta.error) {
          // Manejo del error retornado
          setError(respuesta.error);
          setMensaje(respuesta.error.message || "Error desconocido al realizar la operación.");
        }else if (respuesta.status === "success") {
          
          setData( respuesta.data );
          setMensaje(respuesta.message);
          setError(null);
          
        } else {
          
          setData(  respuesta.data  );
          setMensaje(respuesta.message || "Error desconocido al realizar la operación."); 
          setError(respuesta.error);
          throw new Error(respuesta.message || "Error desconocido");
          
        }
      } catch (err) {
        if (err.response) {
          // Error generado por Axios
          setMensaje(err.response.data.message || "Error al realizar la operación.");
          setError(err.response);
          
        } else {
          // Error no generado por Axios
          setMensaje(err.message || "Error desconocido al realizar la operación.");
          setError(err);
          
        }
        console.error(`Error al obtener datos de ${endpoint}:`, err);
      } finally {
        setCargando(false);
      }
    };

    
    if (triggerApiCall) {
      cargarDatos();
    }else{
      setCargando(false);
      setData([]);
      setMensaje(null);
      setError(null);
    }
  }, [endpoint, JSON.stringify(parametrosPost) , triggerApiCall]);
//}, [endpoint, , triggerApiCall]);
   
 
  return { data, error, cargando, mensaje };
};





