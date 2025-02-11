import React, { useState, useEffect } from 'react';
import ButtonHerramientas from '../ButtonHerramientas/ButtonHerramientas';
import Icon_url from '../../iconos/icon_url.js';

import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { useEcommerceToolsContext } from '../../../providers/EcommerceToolsContext';

const NuestrasHerramientas = ({ titulo, herramientas, filter,  programId }) => {
    
    const { getAllTools, tools, filterTradingPro, filterEcommerce, GRUPO_ECOMMERCE, GRUPO_TRADING_PRO, filterTradingProById, filterEcommerceById,
    uniqueNameGroup,filterHerramientasByGroupOrgByType,filterHerramientasByIdAndGroupOrgByType , obtenerHerramientasPorProgramId ,obteneruniqueNameGroupPorProgramId } = useEcommerceToolsContext()
    
    ;
    const [activeTab, setActiveTab] = useState("");
    useEffect(()=>{
        setActiveTab(uniqueNameGroup[0]);
    },[uniqueNameGroup])

    
    const [tradingProTools, setTradingProTools] = useState([]);
    const [ecommerceTools, setEcommerceTools] = useState([]);
    const [hoveredToolId, setHoveredToolId] = useState(null);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
     
    useEffect(() => {
        const tradingProData = filter ? filterTradingPro() : filterTradingPro();
        const ecommerceData = filter ?  filterEcommerce()  : filterEcommerce();
        setTradingProTools(tradingProData);
        setEcommerceTools(ecommerceData);
        
        
    }, [tools]);

    useEffect(() => {
        if (!activeTab) {
            if (tradingProTools && Object.keys(tradingProTools).length > 0) {
                setActiveTab(GRUPO_TRADING_PRO);
            } else if (ecommerceTools && Object.keys(ecommerceTools).length > 0) {
                setActiveTab(GRUPO_ECOMMERCE);
            }
        }
    }, [tradingProTools, ecommerceTools, GRUPO_TRADING_PRO, GRUPO_ECOMMERCE, activeTab]);
    
    //const generateUrl = (id) => `https://example.com/tool/${id}`;
    
    const renderHerramientas = (herramientas) => {
        
        return Object.keys(herramientas).map(type => {
            const formattedType = type !== "null" ? type.charAt(0).toUpperCase() + type.slice(1) : '';
          
            return (
                <div key={type}>
                    <div>
                        <p className="my-3 font-bold text-sm lg:text-xl dark:text-blanco">
                            {formattedType}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] w-full p-1">
                        {Array.isArray(herramientas[type]) && herramientas[type].length > 0 ? (
                            herramientas[type].map(herramienta => {
                                
                                 
                                 
                                const logoMedia = herramienta.media.find(mediaItem => mediaItem.type === 'icon');
                                const logoMediaDark = herramienta.media.find(mediaItem => mediaItem.type === 'icon_dark');
                                

                                const logoUrl = hoveredToolId === herramienta.prod_int_id 
                                    ? (logoMedia?.url || 'default-logo-url')
                                    : (theme === "dark" 
                                        ? (logoMediaDark?.url || 'default-dark-logo-url') 
                                        : (logoMedia?.url || 'default-logo-url')
                                      );
                                
                                //console.log("tools",herramientas);
                                
                                /*Color etiqueta, flecha , fondo tool*/
                                const colorTag = herramienta.tags.find(tag => tag.key === 'key_color_css_gradient');
                                const colorTool = colorTag ? colorTag.color : 'defaultColor'; 
                                
                                /*Boton Fondo*/
                                const colorFondo = herramienta.tags.find(tag => tag.key === 'key_color_tool_background');
                                const colorToolFondoBoton = colorFondo ? colorFondo.color : 'defaultColor';
                                
                                /*Color borde tool*/
                                const colorborder = herramienta.tags.find(tag => tag.key === 'key_color_tool_border');
                                const colorToolBorde = colorborder ? colorborder.color : 'defaultColor';
                                
                                //const colorArrow = herramienta.tags.find(tag => tag.key === 'key_color_tool_arrow');
                                //const colorFlecha = colorArrow ? colorArrow.color : 'defaultColor';
                                
                                
                                const urlRoute = herramienta.web_url || herramienta.play_store_url || '#';

                                return (
                                    <div 
                                        key={herramienta.prod_int_id} 
                                        onMouseEnter={() => herramienta.is_enabled && setHoveredToolId(herramienta.prod_int_id)}
                                        onMouseLeave={() => herramienta.is_enabled && setHoveredToolId(null)}
                                    >
                                        <ButtonHerramientas
                                            IconComponent={() => <Icon_url url={logoUrl} width="40" height="40" className="icon-class" />}
                                            buttonLabel={herramienta.prod_txt_name}
                                            isEnabled={herramienta.is_enabled}
                                            id={herramienta.prod_int_id}
                                            urlRoute={urlRoute}
                                            logoMedia={logoMedia}
                                            logoMediaDark={logoMediaDark}
                                            colorTool={colorTool}
                                            colorToolFondo={colorToolFondoBoton}
                                            colorToolBorde={colorToolBorde}
                                            
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <p>No hay herramientas disponibles</p>
                        )}
                    </div>
                </div>
            );
        });
    };

    if ((!tradingProTools || Object.keys(tradingProTools).length === 0) && 
        (!ecommerceTools || Object.keys(ecommerceTools).length === 0)) {
        return null;
    }

    return (
        <>
            { filter && obteneruniqueNameGroupPorProgramId(programId).length > 0 ? (
                <div className="py-[16px] lg:py-[40px]">
                    <div className="px-[5%] lg:px-[10%] 2xl:px-0 2xl:max-w-[1152px] justify-center mx-auto"  >
                        <p className="font-sans text-2xl text-center md:text-left md:text-xl lg:text-[32px] font-semibold mb-[20px] dark:text-blanco">{titulo}</p>
        
                        <Tabs key={activeTab} value={activeTab}>
                            <div className="flex items-center justify-center lg:block">
                                <TabsHeader
                                    className="md:!w-[250px] rounded-none bg-transparent p-0 text-sm lg:text-base w-[230px]"
                                    indicatorProps={{
                                        className: "dark:border-blanco bg-transparent border-b-4 border-gris-azulado-profundo shadow-none rounded-none text-sm lg:text-base",
                                    }}
                                >
                                    
    
                                        {obteneruniqueNameGroupPorProgramId(programId).map(item => {
                                            return (
                                                <Tab
                                                    key={item}
                                                    value={item}
                                                    onClick={() => setActiveTab(item)}
                                                    className={activeTab === item ? "dark:text-blanco text-gris-azulado-profundo-900" : "dark:text-blanco"}
                                                >
                                                    <p className="mb-[12px] p-0 text-medium font-semibold dark:text-blanco">{item}</p>
                                                </Tab>
                                            );
                                        })}
                                        
    
                                   
                                </TabsHeader>
                            </div>
        
                            <TabsBody>
                              {uniqueNameGroup && uniqueNameGroup.length > 0 ? (
                                uniqueNameGroup.map(groupName => (
                                  <TabPanel key={groupName} value={groupName} className="p-0">
                                    {renderHerramientas(obtenerHerramientasPorProgramId( programId , groupName))}
                                  </TabPanel>
                                ))
                              ) : (
                                <p>No hay grupos disponibles para mostrar.</p>
                              )}
                            </TabsBody>
        
                        </Tabs>
                    </div>
                </div>
            ) : !filter ? (
                
                <div className="py-[16px] lg:py-[40px]">
                <div className="px-[5%] lg:px-[10%] 2xl:px-0 2xl:max-w-[1152px] justify-center mx-auto"  >
                    <p className="font-sans text-2xl text-center md:text-left md:text-xl lg:text-[32px] font-semibold mb-[20px] dark:text-blanco">{titulo}</p>
    
                    <Tabs key={activeTab} value={activeTab}>
                        <div className="flex items-center justify-center lg:block">
                            <TabsHeader
                                className="md:!w-[250px] rounded-none bg-transparent p-0 text-sm lg:text-base w-[230px]"
                                indicatorProps={{
                                    className: "dark:border-blanco bg-transparent border-b-4 border-gris-azulado-profundo shadow-none rounded-none text-sm lg:text-base",
                                }}
                            >
                                {uniqueNameGroup.map(item => {
                                    return (
                                        <Tab
                                            key={item}
                                            value={item}
                                            onClick={() => setActiveTab(item)}
                                            className={activeTab === item ? "dark:text-blanco text-gris-azulado-profundo-900" : "dark:text-blanco"}
                                        >
                                            <p className="mb-[12px] p-0 text-medium font-semibold dark:text-blanco">{item}</p>
                                        </Tab>
                                    );
                                })}
                                    
                            </TabsHeader>
                        </div>
    
                        <TabsBody>
                          {uniqueNameGroup && uniqueNameGroup.length > 0 ? (
                            uniqueNameGroup.map(groupName => (
                              <TabPanel key={groupName} value={groupName} className="p-0">
                                {renderHerramientas(filterHerramientasByGroupOrgByType(groupName))}
                              </TabPanel>
                            ))
                          ) : (
                            <p>No hay grupos disponibles para mostrar.</p>
                          )}
                        </TabsBody>
    
                    </Tabs>
                </div>
            </div>
            ) : (
            <></>
          )}
        </>
    );
};

export default NuestrasHerramientas;
