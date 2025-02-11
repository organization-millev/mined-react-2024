import React, { useState } from 'react';
import EstrellaFondo from '../iconos/iconoEstrellaFondo.js';

const ValoracionItem = ({ valoracion, porcentaje }) => {
  return (
    <div className="flex items-center">
        <div className="text-gris-azulado-profundo flex items-center font-sans space-x-2 text-12px">
            <p className=" text-gris-azulado-profundo font-sans font-semibold">{valoracion}</p> <EstrellaFondo/>
        </div>
        <div className={`flex-1 mx-2 bg-gris-valoracion h-2 rounded max-w-[278px]`}>
            <div
            className={`h-2 rounded bg-gris-azulado-profundo`}
            style={{ width: `${porcentaje}%` }}></div>
        </div>
        <div className="text-gris-azulado-profundo font-sans font-semibold text-12px">{porcentaje}%</div>
    </div>
  );
};

const ListaValoracion = () => {
    
    const valoraciones = [
        { valoracion: 5, porcentaje: 43 },
        { valoracion: 4, porcentaje: 28 },
        { valoracion: 3, porcentaje: 20 },
        { valoracion: 2, porcentaje: 7 },
        { valoracion: 1, porcentaje: 2 },
    ];

return (
    <div className="space-y-2">
      {valoraciones.map((item, index) => (
        <ValoracionItem
            key={index}
            valoracion={item.valoracion}
            porcentaje={item.porcentaje}
        />
      ))}
    </div>
  );
};

export default ListaValoracion;