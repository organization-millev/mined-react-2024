import React, {  useEffect,useState  } from 'react';

export const useProgramacion = () => {
    
    const[programacion,setProgramacion] = useState({
        cargando:true,
        programacion:[],
        diascalendario:[]
    })
    
    const[listaEnVivo,setListaEnVivo] = useState({
        listado:[],
        cargando:true
    })

    const loadHorario = () => {
        setProgramacion(prevState => ({
            ...prevState,
            programacion:[
                {
                    educador:"Jonathan Cayupe",
                    id_canal:"",
                    id_curso:"",
                    id_academia:"",
                    imagen_educador:`${process.env.REACT_APP_URL_IMG}/assets/images/fondoeducadorminedtv(1).png`,
                    nombre_canal:"",
                    clases:{
                        lunes:[
                            {
                                hora:"10:30",
                                utc:"",
                                zona:"",
                                envivo:true,
                                nombre_clase:"Aprende a utilizar la plataforma MT4.",
                            },
                            {
                                hora:"10:30",
                                utc:"",
                                zona:"",
                                envivo:false,
                                nombre_clase:"Aprende a utilizar la plataforma MT4.",
                            },
                            {
                                hora:"10:30",
                                utc:"",
                                zona:"",
                                envivo:true,
                                nombre_clase:"Aprende a utilizar la plataforma MT4.",
                            }
                        ],
                        miercoles:[
                            {
                                hora:"10:30",
                                utc:"",
                                zona:"",
                                envivo:true,
                                nombre_clase:"Aprende a utilizar la plataforma MT4.",
                            }
                        ]
                    }
                },
                {
                    educador:"Alexandra Laguna",
                    id_canal:"",
                    id_curso:"",
                    id_academia:"",
                    imagen_educador:`${process.env.REACT_APP_URL_IMG}/assets/images/fondoeducadorminedtv(1).png`,
                    nombre_canal:"",
                    clases:{
                        miercoles:[
                            {
                                hora:"10:30",
                                utc:"",
                                zona:"",
                                envivo:false,
                                nombre_clase:"Aprende a utilizar la plataforma MT4.",
                            }
                        ],
                        sabado:[
                            {
                                hora:"10:30",
                                utc:"",
                                zona:"",
                                envivo:false,
                                nombre_clase:"Aprende a utilizar la plataforma MT4.",
                            },
                            {
                                hora:"10:30",
                                utc:"",
                                zona:"",
                                envivo:false,
                                nombre_clase:"Aprende a utilizar la plataforma MT4.",
                            }
                        ]
                    }
                },
            ],
            diascalendario:[17,18,10,20,21,22,23],
            cargando:false
        }))
    }
    
    
    const LoadListaEnVivo = () => {
        
        setListaEnVivo({
        listado:[{
            educador:"",
            id_curso:"",
            id_canal:"",
            nombre_curso:"Dropshipping",
            nombre_canal:"",
            nombre_educador:"Andrea Retana",
            imagen_canal:`${process.env.REACT_APP_URL_IMG}/assets/images/miniaturaclasesminedtv.png`,
        },
        {
            educador:"",
            id_curso:"",
            id_canal:"",
            nombre_curso:"Dropshipping",
            nombre_canal:"",
            nombre_educador:"Andrea Retana",
            imagen_canal:`${process.env.REACT_APP_URL_IMG}/assets/images/miniaturaclasesminedtv.png`,
        },
         {
            educador:"",
            id_curso:"",
            id_canal:"",
            nombre_curso:"Dropshipping",
            nombre_canal:"",
            nombre_educador:"Andrea Retana",
            imagen_canal:`${process.env.REACT_APP_URL_IMG}/assets/images/miniaturaclasesminedtv.png`,
        },
         {
            educador:"",
            id_curso:"",
            id_canal:"",
            nombre_curso:"Dropshipping",
            nombre_canal:"",
            nombre_educador:"Andrea Retana",
            imagen_canal:`${process.env.REACT_APP_URL_IMG}/assets/images/miniaturaclasesminedtv.png`,
        }, {
            educador:"",
            id_curso:"",
            id_canal:"",
            nombre_curso:"Dropshipping",
            nombre_canal:"",
            nombre_educador:"Andrea Retana",
            imagen_canal:`${process.env.REACT_APP_URL_IMG}/assets/images/miniaturaclasesminedtv.png`,
        },  {
            educador:"",
            id_curso:"",
            id_canal:"",
            nombre_curso:"Dropshipping",
            nombre_canal:"",
            nombre_educador:"Andrea Retana",
            imagen_canal:`${process.env.REACT_APP_URL_IMG}/assets/images/miniaturaclasesminedtv.png`,
        },{
            educador:"",
            id_curso:"",
            id_canal:"",
            nombre_curso:"Dropshipping",
            nombre_canal:"",
            nombre_educador:"Andrea Retana",
            imagen_canal:`${process.env.REACT_APP_URL_IMG}/assets/images/miniaturaclasesminedtv.png`,
        },
         {
            educador:"",
            id_curso:"",
            id_canal:"",
            nombre_curso:"Dropshipping",
            nombre_canal:"",
            nombre_educador:"Andrea Retana",
            imagen_canal:`${process.env.REACT_APP_URL_IMG}/assets/images/miniaturaclasesminedtv.png`,
        }
        ],
        cargando:false})
    }
    
    return {programacion,listaEnVivo,LoadListaEnVivo,loadHorario}
    
}