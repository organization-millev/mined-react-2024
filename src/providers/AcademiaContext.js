import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAcademias } from '../hooks/useAcademias';  // Asegúrate de importar tu hook

const AcademiaContext = createContext();

export const useAcademia = () => useContext(AcademiaContext);

export const AcademiaProvider = ({ children }) => {
    const {
        banners, academies, loading, error, getFilteredBanners, getAcademyDetails,
        GetAcademias, listaAcademias, getListaCursos, getCarouselListaAcademias,
        getListadoDeCursos, academias, getVistaAcademias, getTeachers,getCoursesDetails , getNameByIds, getIdsByName , formatForURL , formatFromURL,getCourseMetrics,allNames,getTeachersByCourseId,getCourseDetails , getProgramDetailsByCourseId} = useAcademias();

    useEffect(() => {
        GetAcademias();  // Llamada inicial para cargar los datos
    }, []);
    

    return (
        <AcademiaContext.Provider value={{
            banners, academies, loading, error, getFilteredBanners, getAcademyDetails,
            listaAcademias, getListaCursos, getCarouselListaAcademias,
            getListadoDeCursos, academias, getVistaAcademias, getTeachers,getCoursesDetails , getNameByIds, getIdsByName , formatForURL , formatFromURL,getCourseMetrics,allNames,getTeachersByCourseId,getCourseDetails , getProgramDetailsByCourseId
        }}>
            {children}
        </AcademiaContext.Provider>
    );
};
