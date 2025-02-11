import React, { useEffect, useState } from 'react';
import { apiEcommerceProducts, apiEcommerceTools } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useEcommerceTools = (productoId) => {
    
    const [products, setProducts] = useState([]);
    const [tools, setTools] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [limit, setLimit] = useState(20);
    const [triggerProducto, setTriggerProducto] = useState(false);
    const { data:ToolsData, error:ToolsError, cargando:ToolsCargando } = apiEcommerceTools(trigger,limit);
    const { data:productsData, error: productsError, cargando: productsCargando, mensaje:productsMensaje } = apiEcommerceProducts(triggerProducto,productoId);
    
    const GRUPO_TRADING_PRO = "Trading Pro";
    const GRUPO_ECOMMERCE = "E- Commerce";
    
    const [uniqueNameGroup, setUniqueNameGroup] = useState([]);
    
    const GetTools = () => {
        setTrigger(true);
    };
    
    const GetProduct = () => {
        setTriggerProducto(true);
    };
    
    useEffect(() => {
        if (ToolsData) {
            if (ToolsData && Array.isArray(ToolsData) && ToolsData.length > 0) {
                
                const formattedToolsData = ToolsData.map(tool => {
                    //const webLink = tool.links.find(link => link.link_txt_type === 'web') || tool.links[0];
                    //const webLink = Array.isArray(tool.links) ? tool.links.find(link => link.link_txt_type === 'web') : null;
                    const webLink = Array.isArray(tool.links) ? tool.links.find(link => link.link_txt_type === 'web') : null;
                    const playStoreLink = Array.isArray(tool.links) ? tool.links.find(link => link.link_txt_type === 'play_store') : null;
                    
                    return {
                        prod_int_id: tool.prod_int_id,
                        prod_txt_name: tool.trans_txt_name,
                        prod_txt_type: tool.prod_txt_type,
                        is_enabled: tool.is_enabled,
                        
                        web_url: webLink ? webLink.link_txt_url : '', // URL web
                        play_store_url: playStoreLink ? playStoreLink.link_txt_url : '',
                        
                    
                        //url: webLink ? webLink.link_txt_url : '', // Extract the URL
                        groups: Array.isArray(tool.groups) ? tool.groups.map(group => group.group_txt_name) : [],
                        links: Array.isArray(tool.links) ? tool.links.map(link => ({
                            url: link.link_txt_url,
                            type: link.link_txt_type
                        })) : [],
                        media: Array.isArray(tool.media) ? tool.media.map(item => ({
                            id: item.media_id,
                            url: item.media_url,
                            type: item.media_type
                        })) : [],
                        tags: Array.isArray(tool.tags) ? tool.tags.map(item => ({
                            key:item.tag_txt_title,
                            color: item.tag_txt_value
                        })) : [],
                        academias: tool.academias
                    };
                });
                
                const toolOrdenadas = formattedToolsData.sort((a, b) => {
                    return b.is_enabled - a.is_enabled;
                });
                setTools(toolOrdenadas);
                setUniqueNameGroup(getUniqueGroupNames(ToolsData));
            } else {
                
            }
            setTrigger(false);
        } else if (ToolsError) {
            console.error('Error fetching tools');
        }
    }, [ToolsData, ToolsError]);
    
    useEffect(()=>{
        
        if(productsData){
            if (productsData && productsMensaje != null) {
                
                const filteredProductsData = Array.isArray(productsData)
                    ? productsData.filter(product => product.prod_txt_type !== 'Academia' && product.prod_int_id == productoId)
                    : productsData.prod_txt_type !== 'Academia' && productsData.prod_int_id == productoId ? [productsData] : [];
                    
    
                if (filteredProductsData.length > 0) {
                    const formattedProducts = filteredProductsData.map(product => ({
                        product_id: product.prod_int_id,
                        name: product.translations?.[0]?.trans_txt_name || '',
                        type: product.prod_txt_type,
                        is_enabled: product.prod_txt_status === 'active',
                        groups: product.groups ? product.groups.map(group => group.group_txt_name) : [],
                        links: product.links ? product.links.map(link => ({
                            url: link.link_txt_url,
                            type: link.link_txt_type
                        })) : []
                    }));
                    setProducts(formattedProducts);
                } else {
                    setProducts(false)
                }
            } else if (productsError) {
                
            }
            
            
        }
        
    },[productsData,productsError])
    
    const getProductDescription = () => {
        
        const filteredProductsData = Array.isArray(productsData)
            ? productsData.filter(product => product.prod_txt_type !== 'Academia' && product.prod_int_id == productoId)
            : productsData.prod_txt_type !== 'Academia' && productsData.prod_int_id == productoId ? [productsData] : [];

        if (filteredProductsData.length === 0) return [];

        return filteredProductsData.map(product => {
            const translation = product.translations ? product.translations.map(trans => ({
                description: trans.trans_txt_description,
                subtitle: trans.trans_txt_caption_1,
                name: trans.trans_txt_name,
            })) : [];
        
            const mediaLogo = product.media ? product.media.find(media => media.media_txt_type === "logo") : null;
            const mediaLogoDescription = mediaLogo ? mediaLogo.media_txt_url : '';
    
            return {
                product_id: product.prod_int_id,
                translation,
                mediaLogoDescription
            };
        });
    }
    
    const getProductDetails = () => {
        
        const filteredProductsData = Array.isArray(productsData)
            ? productsData.filter(product => product.prod_txt_type !== 'Academia' && product.prod_int_id == productoId)
            : productsData.prod_txt_type !== 'Academia' && productsData.prod_int_id == productoId ? [productsData] : [];

        if (filteredProductsData.length === 0) return [];

        return filteredProductsData.map(product => {
            const prices = product.prices ? product.prices.map(price => ({
              price_id: price.price_int_id,
              category: price.price_cat_txt_name,
              amount: price.price_dec_amount,
              category_id: price.price_cat_int_id
            })) : [];
            const keyColorCssGradient = product.tags?.find(tag => tag.tag_txt_title === 'key_color_css_gradient')?.tag_txt_value || '';
            return { prices, keyColorCssGradient };
        });
        
    }
    
    const getBeneficios = () => {
        const filteredProductsData = Array.isArray(productsData)
            ? productsData.filter(product => product.prod_txt_type !== 'Academia' && product.prod_int_id == productoId)
            : productsData.prod_txt_type !== 'Academia' && productsData.prod_int_id == productoId ? [productsData] : [];

        if (filteredProductsData.length === 0) return [];

        return filteredProductsData.map(product => {
            if (!product.tags) return [];
    
            const titulosKeys = [
                "key_beneficio_1_titulo",
                "key_beneficio_2_titulo",
                "key_beneficio_3_titulo",
                "key_beneficio_4_titulo",
                "key_beneficio_5_titulo"
            ];
    
            const subtitulosKeys = [
                "key_beneficio_1_subtitulo",
                "key_beneficio_2_subtitulo",
                "key_beneficio_3_subtitulo",
                "key_beneficio_4_subtitulo",
                "key_beneficio_5_subtitulo"
            ];
    
            const beneficios = [];
    
            const titulos = {};
            const subtitulos = {};
    
            product.tags.forEach(tag => {
                if (titulosKeys.includes(tag.tag_txt_title)) {
                    titulos[tag.tag_txt_title] = tag.tag_txt_value;
                }
                if (subtitulosKeys.includes(tag.tag_txt_title)) {
                    subtitulos[tag.tag_txt_title] = tag.tag_txt_value;
                }
            });
    
            titulosKeys.forEach((key, index) => {
                beneficios.push({
                    title: titulos[key] || '',
                    description: subtitulos[subtitulosKeys[index]] || ''
                });
            });
    
            return beneficios;
        });
        
        // return []
    };
    
    const filterMedia = () => {
        
        const filteredProductsData = Array.isArray(productsData)
                    ? productsData.filter(product => product.prod_txt_type !== 'Academia' && product.prod_int_id == productoId)
                    : productsData.prod_txt_type !== 'Academia' && productsData.prod_int_id == productoId ? [productsData] : [];
        
        if (filteredProductsData.length === 0) {
            return [{
                prod_int_id: 0,
                mediaUrl: process.env.REACT_APP_DEFAULT_NO_IMAGE_URL,
                type:"image"
            }];
        }
        
        return filteredProductsData.map(product => {
            let video = product.media?.find(mediaItem => mediaItem.media_txt_type === 'video');
            let imagen = product.media?.find(mediaItem => mediaItem.media_txt_type === 'image');
            
            let media = video ? video : imagen ? imagen : {media_txt_type: 'image', media_txt_url: process.env.REACT_APP_DEFAULT_NO_IMAGE_URL}
            
            return {
                prod_int_id: product.prod_int_id,
                mediaUrl: media.media_txt_url,
                type: media.media_txt_type
            }
        });
    }

    
    useEffect(() => {
        
        if(productoId != undefined){
            GetTools()
            GetProduct() 
        }
        
    }, [productoId]);
    
    
    const getAllTools = () => {
        return tools
            .filter(tool => tool.prod_txt_type && tool.prod_txt_type !== "Academia")
            .reduce((acc, tool) => {
                const type = tool.prod_txt_type;
                if (!acc[type]) {
                    acc[type] = [];
                }
                acc[type].push(tool);
                return acc;
            }, {});
    };
    
    const getAcademyNameByProductId = (prod_int_id) => {
        const product = products.find(product => product.product_id === prod_int_id);
        
        if (!product) {
            return null;
        }
    
        // Verificar si el producto tiene grupos asociados y retornar el nombre del grupo
        if (Array.isArray(product.groups) && product.groups.length > 0) {
            return product.groups[0].group_txt_name; // Retorna el primer grupo encontrado
        }
        return null;
    }
    
    function getUniqueGroupNames(products) {
      const groupNamesSet = new Set();
    
      products.forEach(product => {
        if (product.groups && Array.isArray(product.groups)) {
          product.groups.forEach(group => {
            groupNamesSet.add(group.group_txt_name);
          });
        }
      });
    
      return Array.from(groupNamesSet);
    }
    
    // // Función para filtrar y organizar herramientas por grupo y tipo
    const filterHerramientasByGroupOrgByType = (groupName) => {
        const filtered = tools.filter(tool =>
            tool.groups.includes(groupName)
        );

        // Organiza las herramientas filtradas por tipo
        const organizedByType = filtered.reduce((acc, tool) => {
            const type = tool.prod_txt_type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(tool);
            return acc;
        }, {});
  

        return organizedByType;
    };

    // Función para filtrar herramientas por el grupo de Trading Pro
    const filterTradingPro = () => {
        return filterHerramientasByGroupOrgByType(GRUPO_TRADING_PRO);
    };

    // Función para filtrar herramientas por el grupo de E-commerce
    const filterEcommerce = () => {
        return filterHerramientasByGroupOrgByType(GRUPO_ECOMMERCE);
    };
    
    
    const filterHerramientasByIdAndGroupOrgByType = (groupName, ids) => {
        
        const filtered = tools.filter(tool =>
            tool.groups.includes(groupName) && ids.includes(tool.prod_int_id)
        );
        
        // Organiza las herramientas filtradas por tipo
        const organizedByType = filtered.reduce((acc, tool) => {
            const type = tool.prod_txt_type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(tool);
            return acc;
        }, {});
    
        return organizedByType;
    };
    
    // Función para filtrar herramientas por el grupo de Trading Pro
    const filterTradingProById = (ids) => {
        return filterHerramientasByIdAndGroupOrgByType(GRUPO_TRADING_PRO,ids);
    };

    // Función para filtrar herramientas por el grupo de E-commerce
    const filterEcommerceById = (ids) => {
        return filterHerramientasByIdAndGroupOrgByType(GRUPO_ECOMMERCE,ids);
    };
    
    
    const obteneruniqueNameGroupPorProgramId = (programId) => {
        const toolsfilter = tools.filter(herramienta => 
            Array.isArray(herramienta.academias) && 
            herramienta.academias.some(academia => academia.program_id === programId)
        );
         // Extrae todos los grupos de cada herramienta y los combina en un solo array
        const allGroups = toolsfilter.flatMap(tool => tool.groups);
        
          // Usamos un Set para obtener los valores únicos
        const uniqueGroups = [...new Set(allGroups)];
        
        return uniqueGroups || [];
      
       
    }
    
    
    const obtenerHerramientasPorProgramId = (programId, groupName) => {
      // Filtra herramientas por academias que tengan el programId especificado
        const toolsfilter = tools.filter(herramienta => 
            Array.isArray(herramienta.academias) && 
            herramienta.academias.some(academia => academia.program_id === programId)
        );
        
        const filtered = toolsfilter.filter(tool =>
            tool.groups.includes(groupName)
        );

        // Organiza las herramientas filtradas por tipo
        const organizedByType = filtered.reduce((acc, tool) => {
            const type = tool.prod_txt_type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(tool);
            return acc;
        }, {});

        return organizedByType;
    };



    
    return { GetTools,GetProduct, tools, products,productsCargando,productsMensaje, ToolsCargando ,getProductDescription ,getProductDetails,getBeneficios,
    filterMedia,getAllTools, getAcademyNameByProductId,filterTradingPro, filterEcommerce , GRUPO_ECOMMERCE , GRUPO_TRADING_PRO , filterTradingProById ,
    filterEcommerceById,uniqueNameGroup,filterHerramientasByGroupOrgByType,filterHerramientasByIdAndGroupOrgByType , obtenerHerramientasPorProgramId , obteneruniqueNameGroupPorProgramId
    };
}
