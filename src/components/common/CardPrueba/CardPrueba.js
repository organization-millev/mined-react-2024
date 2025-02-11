import React from 'react';

const CardPrueba = ({ color, children }) => {
    return (
        <div className="mb-4">
            <div className="block lg:flex">
                <div style={{ backgroundColor: color }} className={`h-6 rounded-t-[20px] lg:rounded-tr-none lg:rounded-bl-[20px] lg:w-6 lg:h-auto`}></div>
                <div className="shadow-custom-strong dark:bg-color-dark2 pt-3 pb-2 rounded-b-[20px] lg:rounded-r-[20px] lg:rounded-bl-none w-full">
                    <div className="p-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPrueba;












