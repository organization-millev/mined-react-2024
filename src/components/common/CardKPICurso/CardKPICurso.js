import React from 'react';

const CardKPICurso = ({ items }) => {
    
    // Filtrar y limitar los elementos
    const limitedItems = items
        .slice(0, 5)
        .map(item => ({
            title: item.title || '',
            description: item.description || ''
        }))
        .filter(item => item.title || item.description);

    // Si no hay elementos válidos, no renderizar nada
    if (limitedItems.length === 0) {
        return null; // O retornar <></> para un fragmento vacío
    }
    
   
    
    const mobileOrder = (index) => {
        if (limitedItems.length >= 4) {
            switch(index) {
                case limitedItems.length - 2: // Antepenúltimo elemento
                    return limitedItems.length - 1;
                case limitedItems.length - 1: // Último elemento
                    return limitedItems.length - 2;
                default:
                    return index;
            }
        }
        return index;
    };

    return (
        <div className="dark:lg:bg-color-dark2 w-full  dark:bg-color-dark  lg:rounded-[20px] lg:max-w-[1152px] justify-center lg:overflow-hidden lg:shadow-custom-strong lg:justify-center lg:items-center grid grid-cols-2 gap-4 lg:gap-0 lg:flex lg:flex-row lg:h-[135px] lg:py-[16px]">
            {limitedItems.map((item, index) => (
                <div 
                    key={index} 
                    className={`col-span-1 h-full lg:flex-1 ${index < limitedItems.length - 1 ? 'lg:border-r border-gris-divisor' : ''} lg:flex lg:flex-col lg:justify-center lg:items-center lg:pl-[2%] lg:pr-[2%] lg:text-center order-${mobileOrder(index)} lg:order-${index}`}
                >
                    <p className="text-sm font-sans font-semibold lg:text-center lg:text-xl lg:font-semibold dark:text-blanco">{item.title}</p>
                    <p className="text-xs font-sans font-normal lg:text-sm dark:text-blanco">{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default CardKPICurso;
