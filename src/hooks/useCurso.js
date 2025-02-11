import React, {  useEffect,useState  } from 'react';

export const useCurso = () => {
    
    const[curso,setCurso] = useState({
        nombre:"",
        fondo:"",
        logo:"",
        educador_cargo:"",
        color:"",
        descripcion:{subtitulo:"",parrafo:""},
        subtitulo:"",
        cargando:true
    })
    
    
    const loadCurso = () => {
        
        setCurso(prevState => ({
            ...prevState,
            nombre:"Acciones",
            fondo:"../assets/images/imagen_curso.jpg",
            logo:"../assets/images/acciones.png",
            color:"#306795",
            subtitulo:"En este curso aprenderás todo lo necesario para entender y dominar todos los conceptos relacionados a las tiendas online",
            descripcion:{
                subtitulo:"En el curso MINED Binarias te enseñaremos a operar en el mercado de opciones binarias",
                parrafo:"En este curso aprenderás todo lo necesario para entender y dominar todos los conceptos relacionados a las opciones binarias. Después de terminar el módulo 3, podrás conectarte a los temarios de MINED TV, y obtener más experiencia de los educadores en vivo con un chat en tiempo real.En esta academia aprenderás todo lo necesario para entender y dominar todos los conceptos relacionados a las opciones binarias. Después de terminar el módulo 3, podrás conectarte a los temarios de MINED TV, y obtener más experiencia de los educadores en vivo con un chat en tiempo real."
            },
            cargando:false
        }))
    }
    
    return {curso,loadCurso}
    
}