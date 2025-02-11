import React, { useState } from 'react';
import Select from '../../common/Select/Select';
import SelectLista from '../../common/SelectLista/SelectLista';

import RadioButton from '../../common/RadioButton/RadioButton';
import { useTranslation } from 'react-i18next';

const BannerInstructor = ({tools = [],periods = [],activarBanner,bannerActive,saleBanner,cargando,desactivar}) => {
  
  const { t } = useTranslation();
  
  const [selectedTool,setSelectedTool] = useState("")
  const [selectedPeriod,setSelectedPeriod] = useState("")
  
  const handleToolsChange = (event)=>{
    setSelectedTool(event.target.value)
  }
  
  const handlePeriodChange = (event)=>{
    setSelectedPeriod(event.target.value);
  }
  
  const handleClick = () => {
    
    activarBanner(selectedTool,selectedPeriod)
  }
  
  const handleDesactivarClick = () => {
    desactivar()
  }

  return (
    <div className="rounded-[20px] shadow-custom-strong mt-[40px] p-[20px] w-full flex flex-col gap-[10px] dark:bg-color-dark2">
      <p className="text-extra text-gris-azulado-profundo font-bold dark:text-blanco">{t("saleBannerTitulo")}</p>
      
      <div className="lg:max-w-[344px] flex flex-col gap-[10px]">
        <p className="text-medium text-gris-oscuro dark:text-color-dark2-texto">{t("saleBannerHerramienta")}</p>
            <Select
              id="tools"
              name="tools"
              value={selectedTool || ''}
              onChange={handleToolsChange}
              className="md:min-w-[230px] lg:min-w-[230px] text-gris-azulado-profundo"
              disabled={cargando}
            >
              <option value="">{t("saleBannerHerramienta")}</option>
              {
                tools.map((obj,ind)=>(
                <option value={obj.price_int_id} key={obj.price_int_id}>{obj.trans_txt_name} - {obj.trans_txt_desc_prom_sale}</option>
                ))
              }
              
            </Select>
          
      </div>
      
      <div className="flex flex-col gap-[10px]">
          <p className="text-medium text-gris-oscuro dark:text-color-dark2-texto">{t("saleBannerPeriodo")}</p>
          <RadioButton
            options={periods}
            selectedOption={selectedPeriod}
            name="group1"
            onChange={handlePeriodChange}
            className="flex flex-col lg:flex-row gap-[30px] font-medium dark:text-blanco"
            />
      </div>
      <div className="flex">
        {(bannerActive) ? 
          <>
            <span className="dark:text-blanco" dangerouslySetInnerHTML={{
                __html:t('saleBannerActivo', {
                  name: saleBanner.trans_txt_name,
                  description: saleBanner.trans_txt_desc_prom_sale,
                  date: new Date(Date.parse(saleBanner.sale_dt_end+"Z")).toLocaleString(),
                })
              }}>
              
            </span> 
            <button className="ms-auto boton-primario bold" disabled={cargando} onClick={handleDesactivarClick}>{cargando ? t("cargando"):t("saleBannerDeshabilitar")}</button>
          </>
          : 
          <button className="ms-auto boton-primario bold" disabled={(selectedPeriod == "" || selectedTool == "" || cargando)} onClick={handleClick}>{cargando ? t("cargando"):t("saleBannerHabilitar")}</button>
        }
        
      </div>
    </div>
  );
};

export default BannerInstructor;