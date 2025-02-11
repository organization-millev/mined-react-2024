import React from 'react';
import CustomSaberMas from '../common/CustomSaberMas/CustomSaberMas';
import { useTranslation } from 'react-i18next';


const Publicitario = ({urlFondo = "../assets/images/Miniaturacurso(2).png"}) => {

const { t } = useTranslation();

const contenedor_general_publicitario = "w-full h-[300px]  flex flex-row";    
const contenedor_texto = "w-2/5	 flex justify-center items-center flex-col gap-3";    
const contenedor_imagen = "w-3/5 ";    
const imagen_clase = "w-full h-full object-cover";

  return (
        <div className={contenedor_general_publicitario}>
            <div className={contenedor_texto}>
                <p className="text-3xl font-semibold text-center font-sans">{t('complementa')}  <br/>{t('educacion')} </p>
                <CustomSaberMas
                text="Mined TV"
                className="" 
                />
            </div> 
            
            <div className={contenedor_imagen}>
                <img src={urlFondo }className={imagen_clase} />
            </div>  
        </div>
        



  );
};

export default Publicitario;