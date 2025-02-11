import React from 'react';
import Reloj from '../../iconos/nest_clock_farsight_analog.js';
import RelojDark from '../../iconos/reloj_dark.js';

import CirculoVerde from '../../iconos/circle_green.js';
import CirculoNegro from '../../iconos/circle_black.js';
import Deshabilitado from '../../iconos/candado_blanco.js';
import { useNavigate,useLocation } from 'react-router-dom';
import { useNavigation } from '../../../providers/NavigationContext';

const ItemClase = ({ nombreClase, tiempoClase, habilitado,nameProgram,nameCurso,classId,formatForURL,onClassComplete }) => {
    //
    const location = useLocation();
    const navigate = useNavigate();
    const { goToAcademyCursoClase } = useNavigation();
    
    
    const  idClaseSeleccionada  = parseInt(localStorage.getItem('idClass')) ;
    
    const handleClick = () => {
        const idClass = classId;
        //
        if (habilitado) {
            goToAcademyCursoClase(nameProgram, nameCurso, encodeURIComponent(formatForURL(nombreClase)), { idClass });
            if (onClassComplete) {
                onClassComplete(classId);
            }
            //window.location.reload();
        }
    };
    
    
    const background = idClaseSeleccionada === classId ? 'bg-[#53454521] dark:bg-[#3a393f]' : '';
    
    return (
        <div className={`border-b-[1px] border-gris-medio w-full flex justify-between p-4 !mt-0 ${background}`} >
            <div className="flex flex-row gap-3 cursor-pointer items-start"
                 onClick={handleClick}>
                
                    {habilitado ? <CirculoVerde className="mt-1"/> : <CirculoNegro className="mt-1"/>}
            
                <div className="flex flex-col">
                    <p className="text-sm font-bold font-sans dark:text-blanco">{nombreClase}</p>
                    <div className="flex flex-row items-center gap-1">
                        <Reloj width="20px" height="20px" padding="0px"     className="dark:hidden "/>
                        <RelojDark width="20px" height="20px" padding="0px" className="!hidden dark:!block"/>

                        
                        <p className="text-sm font-normal font-sans dark:text-gris-medio dark:font-semibold">{tiempoClase}</p>
                    </div>
                </div>
            </div>
            
            {!habilitado && (
                <div>
                    <div className="flex flex-row items-center justify-center bg-gris-oscuro rounded-full w-[29px] h-[28px]">
                        <Deshabilitado className="m-2" width="15px" height="15px" padding="0px" />
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default ItemClase;