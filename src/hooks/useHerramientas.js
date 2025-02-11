import React, { useState, useEffect } from 'react';
import { apiEcommerceTools } from '../api/apiConfig';

// Constantes para los nombres de los grupos
const GRUPO_TRADING_PRO = "Trading-Pro";
const GRUPO_ECOMMERCE = "E-commerce";

// Estructura base de herramientas vacía
const estructuraBaseHerramientas = [
    {
        prod_int_id: null,
        prod_txt_name: "",
        links: [],
        prod_txt_type: "",
        groups: [{ group_txt_name: "" }],
        is_enabled: false
    }
];

export const useHerramientas = () => {
    const [triggerApiCall,setTriggerApiCall] = useState(true);
    const { data: dataTools ,error:errorTools,cargando:cargandoTools } = apiEcommerceTools(triggerApiCall);
    //
    // Inicializa el estado con la estructura base vacía
    const [herramientas, setHerramientas] = useState(estructuraBaseHerramientas);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        loadHerramientas();
    }, []); // Cargar las herramientas una vez al montar el componente

    const loadHerramientas = () => {
        // Datos de ejemplo para llenar
        const herramientasIniciales = [
            {
                prod_int_id: 1,
                prod_txt_name: "Flag Tracker",
                links: [{ link_txt_url: "https://example.com/flagtracker", link_txt_type: "web" }],
                prod_txt_type: "Scanners",
                groups: [{ group_txt_name: "Trading-Pro" }],
                is_enabled: true,
            },
            {
                prod_int_id: 2,
                prod_txt_name: "Wedge Vision",
                links: [{ link_txt_url: "https://example.com/wedgevision", link_txt_type: "web" }],
                prod_txt_type: "Scanners",
                groups: [{ group_txt_name: "Trading-Pro" }],
                is_enabled: true,
            },
            {
                prod_int_id: 3,
                prod_txt_name: "Harmonix",
                links: [{ link_txt_url: "https://example.com/harmonix", link_txt_type: "web" }],
                prod_txt_type: "Scanners",
                groups: [{ group_txt_name: "Trading-Pro" }],
                is_enabled: false,
            },
            {
                prod_int_id: 4,
                prod_txt_name: "Smart Zones",
                links: [{ link_txt_url: "https://example.com/smartzones", link_txt_type: "web" }],
                prod_txt_type: "Scanners",
                groups: [{ group_txt_name: "Trading-Pro" }],
                is_enabled: true,
            },
            {
                prod_int_id: 5,
                prod_txt_name: "Hunter",
                links: [{ link_txt_url: "https://example.com/hunter", link_txt_type: "web" }],
                prod_txt_type: "Scanners",
                groups: [{ group_txt_name: "Trading-Pro" }],
                is_enabled: true,
            },
            {
                prod_int_id: 6,
                prod_txt_name: "Mined GO",
                links: [
                    { link_txt_url: "https://example.com/hunter/playstore", link_txt_type: "play_store" },
                    { link_txt_url: "https://example.com/hunter/appstore", link_txt_type: "app_store" }
                ],
                prod_txt_type: "Apps",
                groups: [{ group_txt_name: "Trading-Pro" }],
                is_enabled: true,
            },
            {
                prod_int_id: 7,
                prod_txt_name: "Crypton",
                links: [ 
                    { link_txt_url: "https://example.com/hunter/playstore", link_txt_type: "play_store" },
                    { link_txt_url: "https://example.com/hunter/appstore", link_txt_type: "app_store" } 
                ],
                prod_txt_type: "Apps",
                groups: [{ group_txt_name: "Trading-Pro" }],
                is_enabled: true,
            },
            {
                prod_int_id: 8,
                prod_txt_name: "Binary beats",
                links: [
                    { link_txt_url: "https://example.com/hunter/playstore", link_txt_type: "play_store" },
                    { link_txt_url: "https://example.com/hunter/appstore", link_txt_type: "app_store" }
                ],
                prod_txt_type: "Apps",
                groups: [{ group_txt_name: "Trading-Pro" }],
                is_enabled: true,
            },
            {
                prod_int_id: 9,
                prod_txt_name: "E-Metrics",
                links: [{ link_txt_url: "https://example.com/emetrics", link_txt_type: "web" }],
                prod_txt_type: "",
                groups: [{ group_txt_name: "E-commerce" }],
                is_enabled: true,
            },
            {
                prod_int_id: 10,
                prod_txt_name: "Easify",
                links: [{ link_txt_url: "https://example.com/easify", link_txt_type: "web" }],
                prod_txt_type: "",
                groups: [{ group_txt_name: "E-commerce" }],
                is_enabled: true,
                
            }
        ];

        

        // Simula la carga de datos, por ejemplo, desde una API
        setTimeout(() => {
            setHerramientas(herramientasIniciales);
            setCargando(false);
        }, 2000); // Simula una carga con delay
    };
    
    
     // Función para filtrar herramientas por grupo
    const filterHerramientasByGroup = (groupName) => {
        return herramientas.filter(herramienta =>
            herramienta.groups.some(group => group.group_txt_name === groupName)
        );
    };
    
    
     // Función para filtrar y organizar herramientas por grupo y tipo
    const filterHerramientasByGroupOrgByType = (groupName) => {
        const filtered = herramientas.filter(herramienta =>
            herramienta.groups.some(group => group.group_txt_name === groupName)
        );

        // Organiza las herramientas filtradas por tipo
        const organizedByType = filtered.reduce((acc, herramienta) => {
            const type = herramienta.prod_txt_type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(herramienta);
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
    
    
    return { herramientas, cargando, loadHerramientas , filterTradingPro, filterEcommerce , GRUPO_ECOMMERCE , GRUPO_TRADING_PRO  };
};
