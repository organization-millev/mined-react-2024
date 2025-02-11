import React from 'react';

const LiveClassesItem = ({ title, name, imageUrl, statusColor }) => {
    return (
        <div className="flex flex-col justify-between items-center bg-transparent" style={{ width: '90px', height: '150px', boxSizing: 'border-box' }}>
            <div className="relative w-full h-auto" style={{ height: '90px' }}>
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover rounded-full"
                    style={{ display: 'block', width: '90px', height: '90px' }}
                />
            </div>
            <div className="">
                <div className="text-center w-full" style={{ height: '40px' }}>
                    <p className="font-sans text-sm font-semibold text-gris-azulado-profundo" style={{ lineHeight: '20px', margin: '0', position: 'relative' }}>
                        {title}
                        <span className="absolute left-0 top-50% transform -translate-y-50% w-3 h-3"
                              style={{ backgroundColor: statusColor, border: '2px solid white', borderRadius: '9999px' }}>
                        </span>
                    </p>
                </div>
                <div className="font-sans text-sm font-normal text-center text-xs text-azul-oscuro-grisáceo w-full" style={{ height: '16px' }}>
                    {name}
                </div>
            </div>
        </div>
    );
};

export default LiveClassesItem;
