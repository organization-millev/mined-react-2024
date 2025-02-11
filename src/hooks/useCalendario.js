import React, {  useEffect,useState  } from 'react';

export const useCalendario = () => {
    
    const [calendario,setCalendario] = useState({
        semanas:{
                dias:[],
                mes:""
            },
        calendario:{
            lunes:[],
            martes:[],
            miercoles:[],
            jueves:[],
            viernes:[],
            sabado:[],
            domingo:[]
        },
        cargando:true
    }) 
    
    const loadCalendario = () =>{
        
        setCalendario(prevState =>({
            ...prevState,
            semanas:{
                dias:[7,8,9,10,11,12,13],
                mes:"marzo"
            },
            calendario:{
                lunes:[ 
                    {
                        hora:"10:30",
                        utc:"",
                        zona:"",
                        envivo:true,
                        nombre_clase:"Aprende a utilizar divisas.",
                        nombre_educador:"Gianvictor Cueva",
                        color:"#21D9FF",
                        imagen_educador:"",
                        imagen_educador:"../assets/images/fondoeducadorminedtv(1).png",
                    },
                    {
                        hora:"10:30",
                        utc:"",
                        zona:"",
                        envivo:false,
                        nombre_clase:"Aprende a utilizar la plataforma MT4.",
                        nombre_educador:"Gianvictor Cueva",
                        color:"#FFDA6B",
                        imagen_educador:"",
                        imagen_educador:"../assets/images/fondoeducadorminedtv(1).png",
                    }
                ],
                martes:[],
                miercoles:[],
                jueves:[],
                viernes:[],
                sabado:[],
                domingo:[]
            },
            cargando:false

        }))
    }
    
    
    return {calendario,loadCalendario}
}