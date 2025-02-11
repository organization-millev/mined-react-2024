import React from 'react';

const CardDescription = ({ nombreAcademia, descriptionAcademy }) => {
    return (
        <div className="rounded-[20px] overflow-hidden shadow-custom-strong flex h-auto lg:h-[178px] dark:bg-color-dark2  ">
            <div className="px-6 py-4 md:flex md:flex-col md:justify-center md:px-[5%] w-full">
                <p className="md:block font-bold text-md lg:text-[20px] mb-2 text-gris-azulado-profundo font-sans dark:text-blanco ">{nombreAcademia}</p>
                <p className="text-marron-oscuro text-small lg:text-medium font-sans dark:text-blanco">
                    {descriptionAcademy}
                </p>
            </div>
        </div>
    );
};

export default CardDescription;
