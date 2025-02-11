import React, {  useEffect,useState } from 'react';
// https://app.sli.do/event/gvLPZv9QvQvu3PubyND28d
import './Slido.css'
import { useTranslation } from 'react-i18next';

const SLIDOURL = "https://app.sli.do/event/"

const Slido= (props) => {
    const { t } = useTranslation();

    const [fullURL,setFullURL]  = useState(SLIDOURL)
    
    useEffect(()=>{
        //console.log(props.src,props.datos,props.estado)
        if((props.src && props.src != "") & props.datos.primer_nombre != null & props.datos.apellido != null & !props.estado){
            setFullURL(props.src+"?user_name="+encodeURIComponent(props.datos.primer_nombre+" "+props.datos.apellido)+"&user_email="+props.datos.email)
        }

    },[props.src,props.datos,props.estado])
    
    
    return (<>
        {(fullURL != SLIDOURL)?
        <div className={props.className + " slido-embebed-container slido-op"}>
            <iframe src={fullURL} title="Slido" className={"!h-auto"} id="slido-op"></iframe>
        </div>:
        <div className={props.className + " slido-embebed-container"}>
            <div className="!h-auto bg-gris-claro dark:bg-color-dark2 animate-tw-pulse "></div>
        </div>
        }
    </>) 
}

export default Slido