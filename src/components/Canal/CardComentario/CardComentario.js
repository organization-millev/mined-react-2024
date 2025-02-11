import React, { useState } from 'react';
import IconosCanal from '../../iconos/iconos_canal';
import { useRatingEducator } from '../../../hooks/sync/useRatingEducator.js';
import { useUser } from '../../../providers/UserContext';

const CardComentario = ({ obj, permisoInstructor }) => {
    //
    const { roleUser, userData } = useUser();
    const { visualizarResenas } = useRatingEducator();

    // Estado local para rateEnable, inicializado con el valor de obj.rateEnable
    const [rateEnable, setRateEnable] = useState(obj.rateEnable === "true");

    const handleVisibilityClick = () => {
        // Actualiza el estado local de rateEnable
        setRateEnable(prevState => !prevState);

        // Aquí podrías llamar a visualizarResenas o alguna lógica que necesites
        visualizarResenas(obj.rate_int_id);
    };

    return (
        <div className={"w-[100%] min-h-[150px] shrink-0 " + "flex" + " lg:w-[100%] " + "lg:flex"}>
            {permisoInstructor === true && (
                <div onClick={handleVisibilityClick}  style={{ cursor: 'pointer' }}>
                    {rateEnable ? (
                        <>
                            <IconosCanal icono="visibility" className="!p-0 h-[20px] w-[20px] dark:hidden" />
                            <IconosCanal icono="visibility_white" className="!p-0 h-[20px] w-[20px] hidden dark:block" />
                        </>
                    ) : (
                        <>
                            <IconosCanal icono="visibility_off" className="!p-0 h-[20px] w-[20px] dark:hidden" />
                            <IconosCanal icono="visibility_off_blanco" className="!p-0 h-[20px] w-[20px] hidden dark:block" />
                        </>
                    )}
                </div>
            )}
            <div className="w-[50px] h-[50px] p-[5px]">
                {/*<img src={obj.user_avatar} className="rounded-full w-[40px] h-[40px] object-cover" alt="Estudiante" />*/}
                {obj.user_avatar && obj.user_avatar !== 'null' ? (
                    <img src={obj.user_avatar} className="rounded-full w-[40px] h-[40px] object-cover" alt="Estudiante" />
                ) : (
                    <div className="rounded-full w-[40px] h-[40px] bg-gray-400 flex items-center justify-center">
                        <p className="text-white text-xs font-semibold">{obj.user_name}</p>
                    </div>
                )}
            </div>
            <div className="w-[calc(100%-50px)]">
                <div className="flex mt-[10px] dark:lg:gap-[3px]">
                    {[...Array(5)].map((_, ind) => (
                        ind + 1 <= obj.rating ? (
                            <div key={`IconosCanal1-2-${ind}`}>
                                <IconosCanal icono="estrella_llena" className="dark:hidden !p-1 !-[19px] !w-[19px]" key={`IconosCanal1-${ind}`} />
                                <IconosCanal icono="estrella_llena_blanca" className="hidden dark:block !p-1 !h-[19px] !w-[19px] " key={`IconosCanal2-${ind}`} />
                            </div>
                        ) : (
                            <div key={`IconosCanal3-4-${ind}`}>
                                <IconosCanal icono="estrella" className="dark:hidden !p-1 !h-[19px] !w-[19px]" key={`IconosCanal3-${ind}`} />
                                <IconosCanal icono="estrella_blanca" className="hidden dark:block !p-1 !h-[19px] !w-[19px]" key={`IconosCanal4-${ind}`} />
                            </div>
                        )
                    ))}
                </div>
                <div className="px-[0.25rem] text-small lg:text-medium text-left  dark:text-blanco">
                    {obj.comment}
                </div>
            </div>
        </div>
    );
}

export default CardComentario;
