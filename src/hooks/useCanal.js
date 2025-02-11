import React, {  useEffect,useState  } from 'react';

export const useCanal = () => {
    
    //Aqui se debera llenar un objeto con la estructura usando diferentes llamados a las apis
    
    const [canal,setCanal] = useState({
        nombre_canal:"",
        poster_canal:"",
        nombre_educador:"",
        subtitulo_educador:"",
        foto_educador:"",
        id_canal:"",
        id_academia:"",
        id_curso:"",
        stream:{
            tipo:"jw", // jw o mc
            poster:"", //No es necesario en el caso de millicast
            identificadorCanal:"",
            
        },
        chat:{
            tipo:"slido", //unicamente slido
            identificador:""
        },
        valoraciones:[
            {estrellas:1,porcentaje:"0%",cantidad:"0"},
            {estrellas:2,porcentaje:"0%",cantidad:"0"},
            {estrellas:3,porcentaje:"0%",cantidad:"0"},
            {estrellas:4,porcentaje:"0%",cantidad:"0"},
            {estrellas:5,porcentaje:"0%",cantidad:"0"}],
        calificacion:"0",
        cargando:true,
    })
    
    const [listasReproduccion,setListasReproduccion] = useState({
        lista:[],
        listas_reproduccion:[],
        filtro:{
            texto:null,
            orden:"fecha_desc",
            lista_seleccionada:null,
            dificultad:null,
            pagina:1
        },
        paginador:{
            total:10,
            inicio:1
        },
        dificultades:[
            {nombre:"Fácil",valor:"easy"},
            {nombre:"Intermedio",valor:"medium"},
            {nombre:"Difícil",valor:"hard"},
        ],
        ordenfecha:[
            {nombre:"Fecha descendente",valor:"fecha_desc"},  
            {nombre:"Fecha Ascendente",valor:"fecha_asc"},
        ],
        cargandoVideos:true,
        cargandoLista:true
    })
    
    
    const [resenas,setResenas] = useState({
        resenas:[],
        cargando:true
    })
    
    const [preguntasRespuestas,setPreguntasRespuestas] = useState({
        preguntas:[],
        cargando:true
    })
    
    
    const loadCanal = () => {
        const foto = "/assets/images/miniaturaclasesminedtv.png";
        //Info cargada desde el api, no debe ir aqui si no al traer los datos desde el servidor por el api
        setCanal(prevState => ({
            ...prevState,
            nombre_educador:"Alexandra Laguna",
            subtitulo_educador:"Educadora Drop Shipping",
            foto_educador:`${process.env.REACT_APP_URL_IMG}${foto}`,
            poster_canal:"https://miro.medium.com/v2/resize:fit:698/1*0jjdu52m0MO4SjLWiCVOlg.jpeg",
            stream:{
                ...prevState.stream,
                // poster:"https://miro.medium.com/v2/resize:fit:698/1*0jjdu52m0MO4SjLWiCVOlg.jpeg", //foto debe venir desde el stream,
                poster:"../assets/images/miniaturaclasesminedtv.png",
                identificadorCanal:"nNTZRmsW"
            },
            chat:{
                tipo:"slido",
                identificador:"gvLPZv9QvQvu3PubyND28d"
            },
            valoraciones:[
            {estrellas:1,porcentaje:"2.5%",cantidad:"3"},
            {estrellas:2,porcentaje:"7.5%",cantidad:"8"},
            {estrellas:3,porcentaje:"15%",cantidad:"15"},
            {estrellas:4,porcentaje:"25%",cantidad:"25"},
            {estrellas:5,porcentaje:"50%",cantidad:"50"}],
            calificacion:"4.7",
            cargando:false
        }))
        
        setResenas({
            resenas:[
                {
                    id_comentario:1,
                    calificacion:3,
                    comentario:"“La Academia ofrece educación personalizada y de calidad con un enfoque innovador. Con un destacado cuerpo docente y modernos temarios, es la elección ideal para el éxito académico”",
                    estudiante_img:"/assets/images/perfil-color.png"
                
                },
                {
                    id_comentario:2,
                    calificacion:4,
                    comentario:"“La Academia ofrece educación personalizada y de calidad con un enfoque innovador. Con un destacado cuerpo docente y modernos temarios, es la elección ideal para el éxito académico”",
                    estudiante_img:"/assets/images/perfil-color.png"
                
                },
                {
                    id_comentario:3,
                    calificacion:5,
                    comentario:"“La Academia ofrece educación personalizada y de calidad con un enfoque innovador. Con un destacado cuerpo docente y modernos temarios, es la elección ideal para el éxito académico”",
                    estudiante_img:"/assets/images/perfil-color.png"
                
                },
                {
                    id_comentario:4,
                    calificacion:2,
                    comentario:"“La Academia ofrece educación personalizada y de calidad con un enfoque innovador. Con un destacado cuerpo docente y modernos temarios, es la elección ideal para el éxito académico”",
                    estudiante_img:"/assets/images/perfil-color.png"
                
                },
                {
                    id_comentario:5,
                    calificacion:1,
                    comentario:"“La Academia ofrece educación personalizada y de calidad con un enfoque innovador. Con un destacado cuerpo docente y modernos temarios, es la elección ideal para el éxito académico”",
                    estudiante_img:"/assets/images/perfil-color.png"
                
                },
            ],
            cargando:false
        })
        
        //Carga trigger de videos
        setListasReproduccion(prevState=>({
            ...prevState,
            lista:[{
                id_video:1,
                nombre:"Nombre de la clase",
                miniatura:"../assets/images/miniaturaclasesminedtv.png",
                fecha:"2023/12/31",
                educador:"Alexandra Laguna",
                descripcion:"Descripcion de la clase Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
            },{
                id_video:2,
                nombre:"Nombre de la clase",
                miniatura:"../assets/images/miniaturaclasesminedtv.png",
                fecha:"2023/12/31",
                educador:"Alexandra Laguna",
                descripcion:"Descripcion de la clase Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
            },{
                id_video:3,
                nombre:"Nombre de la clase",
                miniatura:"../assets/images/miniaturaclasesminedtv.png",
                fecha:"2023/12/31",
                educador:"Alexandra Laguna",
                descripcion:"Descripcion de la clase Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
            },{
                id_video:4,
                nombre:"Nombre de la clase",
                miniatura:"../assets/images/miniaturaclasesminedtv.png",
                fecha:"2023/12/31",
                educador:"Alexandra Laguna",
                descripcion:"Descripcion de la clase Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
            },{
                id_video:5,
                nombre:"Nombre de la clase",
                miniatura:"../assets/images/miniaturaclasesminedtv.png",
                fecha:"2023/12/31",
                educador:"Alexandra Laguna",
                descripcion:"Descripcion de la clase Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
            }],
            cargandoVideos:false
        }))
        
        //carga de lista
        setListasReproduccion(prevState=>({
            ...prevState,
            listas_reproduccion:[{
                id_lista:1,
                nombre:"Lista 1"
            }],
            cargandoLista:false
        }))
        
        setPreguntasRespuestas(prevState=>({
            ...prevState,
            preguntas:[{
                id_pregunta:1,
                pregunta:"¿Cómo abordas los desafíos específicos de la enseñanza en un entorno virtual para garantizar la participación y el compromiso de los estudiantes, así como la efectividad del aprendizaje a distancia?",
                nombre:"Diego Lázaro",
                foto:"/assets/images/perfil-color.png",
                fecha:"07/03/23",
                respuesta:{
                    id_respuesta:1,
                    educador:"Alexandra Laguna",
                    perfil:"../assets/images/miniaturaclasesminedtv.png",
                    respuesta:"En la enseñanza dentro de una academia virtual, mi enfoque se centra en la creación de experiencias de aprendizaje significativas y atractivas. Utilizo una variedad de herramientas tecnológicas para facilitar la interactividad, como plataformas de videoconferencia, foros de discusión y recursos multimedia. Además, diseño actividades que fomentan la participación activa, promoviendo la colaboración entre los estudiantes a través de proyectos en línea y actividades grupales. Para mantener la motivación, incorporo elementos gamificados y retroalimentación constante. También estoy comprometida con la actualización continua de mis habilidades tecnológicas y la exploración de nuevas metodologías que mejoren la calidad del aprendizaje en el entorno virtual.",
                    fecha:"07/03/23"
                },
            }],
            cargando:false
        }))
    }
    
    return{canal,loadCanal,resenas,preguntasRespuestas,listasReproduccion}
}