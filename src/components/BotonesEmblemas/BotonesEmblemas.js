import React, { useState, useEffect } from 'react';

const Button = ({ label, idTitulo, selected, onClick, estado }) => {
  const color = estado === "activo" ? "bg-gris-carbón" : "bg-gris-medio";
  const isDisabled = estado === "inactivo";
  const toCapitalize = (str) => {
    return str
      .toLowerCase() 
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '); 
  };

  //
  return (
    <button
      className={`mt-4 text-white font-normal font-sans rounded-full focus:outline-none ${color} ${selected ? 'border-gris-azulado-profundo border-2' : ''}`}
      onClick={() => !isDisabled && onClick(idTitulo)}
      style={{ 
        padding: selected ? 'calc(0.5rem - 2px) 1rem' : '0.5rem 1rem', 
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.6 : 1,
        transition:'transform 0.2s ease, box-shadow 0.2s ease',
        textTransform: 'capitalize'
      }}
      disabled={isDisabled}
      onFocus={(e) => e.target.style.transform = 'scale(1.05)'}
      onBlur ={(e) => e.target.style.transform = 'scale(1)'}
    >
      {toCapitalize(label)}
    </button>
  );
};

function BotonesEmblemas({ titulos = [], onSelect }) {
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    const preselectedTitulo = titulos.find(titulo => titulo.estadoSeleccionado === true);
    if (preselectedTitulo) {
      setSelectedButton(preselectedTitulo.idTitulo);
      onSelect(preselectedTitulo.idTitulo); // Notificar la selección inicial
    }
  }, [titulos]);

  const handleButtonClick = (idTitulo) => {
    setSelectedButton(prev => prev === idTitulo ? null : idTitulo);
    onSelect(idTitulo); // Notificar la selección al componente padre
  };

  return (
    <div className="flex flex-wrap gap-2">
      {titulos.map((titulo) => (
        <Button
          key={titulo.idTitulo}
          label={titulo.nombre}
          idTitulo={titulo.idTitulo}
          selected={selectedButton === titulo.idTitulo}
          onClick={handleButtonClick}
          estado={titulo.estado}
        />
      ))}
    </div>
  );
}

export default BotonesEmblemas;