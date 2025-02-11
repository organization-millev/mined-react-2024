import React from 'react';

const DetalleProductoAcademia = ({ logo, subtitle, description, itemNoComprada }) => {
    return (
        <div className="mb-3 md:mb-0 w-full">
            <div key={itemNoComprada}>
                <div className="flex flex-col gap-4 md:flex-col-reverse">
                    <div className="w-full h-auto flex items-start">
                        <img src={logo} alt={subtitle} className="object-contain max-h-[55px] md:max-w-[316px] md:!max-h-[52px] lg:max-w-[80%] lg:!max-h-[70px] 2xl:max-w-[550px] 2xl:!max-h-auto"/>
                    </div>
                    <p className="text-large font-sans font-bold lg:text-extra lg:font-semibold dark:text-blanco">{subtitle}</p>
                </div>
                <div className="mt-3">
                    <p className="text-medium font-sans font-normal dark:text-blanco">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default DetalleProductoAcademia;