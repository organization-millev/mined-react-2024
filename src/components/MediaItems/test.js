import React, {  useEffect  } from 'react';
import {useJWPlayer} from '../../hooks/useJWPlayer';
import JWStreamPlayer from './JWPlayer/JWStreamPlayer';
import JWPlayerEmbed from './JWPlayer/JWPlayerEmbed';
import Slido from './Slido/Slido';

const Test = () => {
    
    const {AgregarScriptsJW,jwObject} = useJWPlayer()
    const objetoSlido = {
        primer_nombre:"Jesus",
        apellido: "Salgado",
        email:"kiexd1@gmail.com"
    }
    
    useEffect(()=>{
        AgregarScriptsJW()
    },[])
    
    return (<>
        <JWStreamPlayer channelID={'nNTZRmsW'} cargado={jwObject.scriptCargado == 2} className={""}/>
        <JWPlayerEmbed src={'LNVfFcfT-MmkN3maa'} cargado={jwObject.scriptCargado == 2} className={""}/>
        <Slido src={'gvLPZv9QvQvu3PubyND28d'} datos={objetoSlido} className={""}/>
    </>)
}

export default Test