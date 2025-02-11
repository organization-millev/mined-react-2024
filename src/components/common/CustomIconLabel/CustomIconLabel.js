import React from 'react';

const CustomIconLabel = ({icon, label}) => {
    const Icon = icon;
    return (
        <div className='w-[97px] h-[24px] flex items-end justify-between'>
            <Icon padding={0} className='size-[24px]'/>
            <p className='font-sans font-medium text-gris-azulado-profundo text-sm h-[20px]'>{label}</p>
        </div>
    );
};

export default CustomIconLabel;