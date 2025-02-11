import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const SubscriptionItem = ({ title, daysRemaining }) => {
    const totalDays = 31;
    const [progressPercent, setProgressPercent] = useState(0);
    const { t } = useTranslation();


    useEffect(() => {
        // Calcular el porcentaje de progreso y asegurar que no exceda el 100%
        const newProgressPercent = Math.min((daysRemaining / totalDays) * 100, 100);
        setProgressPercent(newProgressPercent);
    }, [daysRemaining, totalDays]);

    const progressStyle = {
        width: `${progressPercent}%`,
        transition: 'width 0.8s ease-in-out'
    };

    return (
        <div className="w-full h-[53px] mb-4">
            <div className="bg-azul-oscuro-grisáceo  dark:bg-blanco  py-1 px-4 rounded-full inline-block">
                <h2 className="font-sans font-normal text-blanco dark:text-color-dark dark:font-medium text-sm ">{title}</h2>
            </div>
            <div className="h-[20px] flex flex-row font-sans font-normal text-sm text-[#4A4A4A]  gap-[49px] mt-[7px] dark:text-blanco">
                <p className="">{t('diasrestantes')} </p>
                <span>{daysRemaining} {t('dias')}</span>
            </div>
            <div className="w-full bg-plata-suave dark:bg-plata-oscuro  rounded-full h-[6px]">
                {/* Aplicar la clase y el estilo dinámico */}
                <div className="bg-azul-oscuro-grisáceo dark:bg-blanco subscripcion-estilo h-[6px] rounded-full" style={progressStyle}>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionItem;
