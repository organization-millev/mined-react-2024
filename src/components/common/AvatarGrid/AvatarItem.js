import React from 'react';
import LockIcon from '../../iconos/lock';

const AvatarItem = ({ src, alt, state, onClick, isSelected }) => {
    let borderClass = '';
    let opacityClass = '';

    switch (state) {
        case 'inactivo':
            borderClass = 'border-2 border-transparent';
            opacityClass = 'opacity-50';
            break;
        case 'activo':
            borderClass = isSelected ? 'border-[5px] border-gris-oscuro' : 'border-2 border-transparent';
            opacityClass = 'opacity-100';
            break;
        default:
            borderClass = 'border-2 border-transparent';
            opacityClass = 'opacity-100';
            break;
    }

    return (
        <div className={`relative bg-plata-suave w-32 h-32 rounded-[20px] overflow-hidden ${borderClass} ${opacityClass} cursor-pointer`} onClick={onClick}>
            <img src={src} alt={alt} className="w-full h-full" />
            {state === 'inactivo' && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-25">
                    <LockIcon className="bg-white bg-opacity-75 rounded-full" padding="8px" />
                </div>
            )}
        </div>
    );
};

export default AvatarItem;