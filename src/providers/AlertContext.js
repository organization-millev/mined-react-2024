
 /**
 * Hook personalizado para acceder al contexto de alertas desde los componentes hijos.
 * @returns {Object} Objeto que contiene la función 'warn' para mostrar advertencias.

 * Este archivo define un contexto y un proveedor de alertas para mostrar mensajes de advertencia en la aplicación.
 * También proporciona un hook personalizado para acceder al contexto de alertas desde los componentes hijos.
 * Importación de React y bibliotecas externas necesarias.
 */
 
import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
const AlertContext = createContext();

/**
 * Proveedor de alertas.
 * Proporciona la función 'warn' que muestra mensajes de advertencia utilizando React Toastify.
 * @param {Object} children - Componentes hijos a los que se les proporciona el contexto de alertas.
 * Función 'warn' para mostrar una advertencia.
 */
 
export const AlertProvider = ({ children }) => {
    const warn = (message) => {
        toast.warn(message);
    };
    
    const success = (message) => {
        toast.success(message);
    };
    
    const alertDefault = (message) => {
        toast.default(message);
    };
    
    const alertCustomTitle = (title, message) => {
        toast(
            <div>
                <strong>{title}</strong>
                <div>{message}</div>
            </div>,
            {
                hideProgressBar: true,
            }
        );
    };



    return (
        <AlertContext.Provider value={{ warn, success , alertDefault , alertCustomTitle }}>
            {children}
        </AlertContext.Provider>
    );
};


export const useAlert = () => useContext(AlertContext);
