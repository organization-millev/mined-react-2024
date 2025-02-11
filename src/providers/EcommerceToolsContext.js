import React, { createContext, useContext, useState, useEffect } from 'react';
import { useEcommerceTools } from '../hooks/ecommerce/useEcommerceTools'; // Asegúrate de ajustar la ruta de importación

const EcommerceToolsContext = createContext();

export const useEcommerceToolsContext = () => useContext(EcommerceToolsContext);

export const EcommerceToolsProvider = ({ children }) => {
    const {
        tools, cargando, GetTools, getAllTools, getAcademyNameByProductId, filterTradingPro, filterEcommerce,
        GRUPO_ECOMMERCE, GRUPO_TRADING_PRO , filterTradingProById ,filterEcommerceById,GetProduct,uniqueNameGroup,filterHerramientasByGroupOrgByType,
        filterHerramientasByIdAndGroupOrgByType , obtenerHerramientasPorProgramId , obteneruniqueNameGroupPorProgramId
    } = useEcommerceTools();

    useEffect(() => {
        GetTools(); // Llamada inicial para cargar los datos
        // GetProduct();
    }, []);

    return (
        <EcommerceToolsContext.Provider value={{
            tools,
            cargando,
            getAllTools,
            getAcademyNameByProductId,
            filterTradingPro,
            filterEcommerce,
            GRUPO_ECOMMERCE,
            GRUPO_TRADING_PRO,
            filterTradingProById,
            filterEcommerceById,
            uniqueNameGroup,
            filterHerramientasByGroupOrgByType,
            filterHerramientasByIdAndGroupOrgByType,
            obtenerHerramientasPorProgramId,
            obteneruniqueNameGroupPorProgramId
        }}>
            {children}
        </EcommerceToolsContext.Provider>
    );
};
