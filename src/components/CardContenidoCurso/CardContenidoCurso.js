import React, { useState } from 'react';
import Calendar from '../iconos/calendar_today.js';
import Circle from '../iconos/circle_orange.js';

const ContenidoCurso = () => {
    const cursos = [
        {
            imgUrl: "https://placehold.co/600x400.png?text=Background+Pattern",
            nombreClase: "Nombre de la clase 1",
            educador: "Alexandra Laguna",
            fecha: "12/06/23"
        },
        {
            imgUrl: "https://placehold.co/600x400.png?text=Background+Pattern",
            nombreClase: "Nombre de la clase 2",
            educador: "Juan Pérez",
            fecha: "15/06/23"
        },
        {
            imgUrl: "https://placehold.co/600x400.png?text=Background+Pattern",
            nombreClase: "Nombre de la clase 3",
            educador: "Juan Pérez",
            fecha: "15/06/23"
        },
        {
            imgUrl: "https://placehold.co/600x400.png?text=Background+Pattern",
            nombreClase: "Nombre de la clase 4",
            educador: "Juan Pérez",
            fecha: "15/06/23"
        },
        {
            imgUrl: "https://placehold.co/600x400.png?text=Background+Pattern",
            nombreClase: "Nombre de la clase 5",
            educador: "Juan Pérez",
            fecha: "15/06/23"
        },
    ];

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cursos.map((curso, index) => (
                <div key={index} className="max-w-sm overflow-hidden bg-white relative">
                    <div className="flex justify-between items-center mb-2">
                        <img className="rounded-20 w-274 h-154" src={curso.imgUrl} alt="Profile" />
                    </div>
                    <div className="flex items-center justify-start">
                        <Circle className="mr-3"/>
                        <h3 className="text-sm font-bold text-gris-azulado-profundo-700 font-sans">{curso.nombreClase}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gris-azulado-profundo-400 font-sans">{curso.educador}</p>
                        <div className="flex items-center">
                            <Calendar/>
                            <span className="text-sm text-gris-azulado-profundo-400 font-sans">{curso.fecha}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContenidoCurso;
