import React, { useEffect, useState } from 'react';
import { apiEcommerceProducts, apiEcommerceTools } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useEcommerceProducts = (productoId) => {
    const [products, setProducts] = useState([]);
    const [tools, setTools] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [toolsTrigger, setToolsTrigger] = useState(false);
    //const language_code = (localStorage.getItem('language') || 'es').toUpperCase();

    const { data: productsData, error: productsError, cargando: productsCargando, mensaje:productsMensaje } = apiEcommerceProducts(trigger, productoId);
    const { data: toolsData, error: toolsError, cargando: toolsCargando } = apiEcommerceTools(toolsTrigger);
    
    const GetProducts = () => {
        setTrigger(true);
    };
    
    const GetTools = () => {
        setToolsTrigger(true);
    };
    
    useEffect(() => {
        if (productoId) {
            GetProducts();
            GetTools();
        }
    }, [productoId]);

    useEffect(() => {
        if (productsData && productsMensaje != null) {
            const filteredProductsData = Array.isArray(productsData)
                ? productsData.filter(product => product.prod_txt_type === 'Academia')
                : productsData.prod_txt_type === 'Academia' ? [productsData] : [];
                

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
                setProducts([])
                //
            }
        } else if (productsError) {
            
        }
    }, [productsData, productsError,productsCargando]);
    
    useEffect(() => {
        if (toolsData) {
            setTools(toolsData.map(tool => ({
                prod_int_id: tool.prod_int_id,
                prod_txt_name: tool.prod_txt_name,
                prod_txt_type: tool.prod_txt_type,
                is_enabled: tool.is_enabled,
                groups: tool.groups ? tool.groups.map(group => group.group_txt_name) : [],
                links: tool.links ? tool.links.map(link => ({
                    url: link.link_txt_url,
                    type: link.link_txt_type
                })) : []
            })));
        } else if (toolsError) {
            console.error('Error fetching tools');
        }
    }, [toolsData, toolsError]);

    const filterMedia = () => {
        const filteredProductsData = Array.isArray(productsData)
            ? productsData.filter(product => product.prod_txt_type === 'Academia')
            : productsData.prod_txt_type === 'Academia' ? [productsData] : [];
        
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
    };

    const getProductDetails = () => {
        const filteredProductsData = Array.isArray(productsData)
            ? productsData.filter(product => product.prod_txt_type === 'Academia')
            : productsData.prod_txt_type === 'Academia' ? [productsData] : [];

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
    };

    const getProductDescription = () => {
        const filteredProductsData = Array.isArray(productsData)
            ? productsData.filter(product => product.prod_txt_type === 'Academia')
            : productsData.prod_txt_type === 'Academia' ? [productsData] : [];

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
    };

    const getBeneficios = () => {
        
        const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    
        const filteredProductsData = Array.isArray(productsData)
            ? productsData.filter(product => product.prod_txt_type === 'Academia')
            : productsData.prod_txt_type === 'Academia' ? [productsData] : [];
    
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
                if (titulosKeys.includes(tag.tag_txt_title) && tag.lng_txt_code === language_code) {
                    titulos[tag.tag_txt_title] = tag.tag_txt_value;
                }
                if (subtitulosKeys.includes(tag.tag_txt_title) && tag.lng_txt_code === language_code) {
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
    };


    const filterToolsByProduct = () => {
        const filteredProductsData = Array.isArray(productsData)
            ? productsData.filter(product => product.prod_txt_type === 'Academia')
            : productsData.prod_txt_type === 'Academia' ? [productsData] : [];

        if (filteredProductsData.length === 0 || !filteredProductsData[0].tags) return {};

        const productToolIds = filteredProductsData[0].tags
            .filter(tag => tag.title === 'key_tools')
            .map(tag => parseInt(tag.value, 10));
        
        const filteredTools = tools.filter(tool => productToolIds.includes(tool.prod_int_id));
        const organizedTools = filteredTools.reduce((acc, tool) => {
            const type = tool.prod_txt_type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(tool);
            return acc;
        }, {});

        return organizedTools;
    };

    const extractTagValues = (tagTitle) => {
        const filteredProductsData = Array.isArray(productsData)
            ? productsData.filter(product => product.prod_txt_type === 'Academia')
            : productsData.prod_txt_type === 'Academia' ? [productsData] : [];

        if (filteredProductsData.length === 0 || !filteredProductsData[0].tags) {
            return [];
        }

        return filteredProductsData[0].tags
            .filter(tag => tag.tag_txt_title === tagTitle)
            .map(tag => tag.tag_txt_value);
    }
    
    const obtenerHerramientasPorProgramId = (herramientas, programId) => {
      return herramientas.filter(herramienta => 
        herramienta.academias.some(academia => academia.program_id === programId)
      );
    }

    const getIdsTools = (programId) => {
        const tools = obtenerHerramientasPorProgramId(toolsData,programId);
        return tools
    }

    return {
        GetProducts,
        productsData,
        products,
        productsCargando,
        productsMensaje,
        filterMedia,
        getProductDetails,
        getProductDescription,
        getBeneficios,
        filterToolsByProduct,
        getIdsTools
    };
}
