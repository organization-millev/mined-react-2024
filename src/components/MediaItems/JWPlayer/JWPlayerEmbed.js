import React, {  useEffect,useState } from 'react';
import './JWStreamPlayer.css'

const JWPLAYERURL = "https://cdn.jwplayer.com/players/"

const JWPlayerEmbed= (props) => {
    
    const [src,setSrc] = useState(props.src)
    const [fullURL,setFullURL]  = useState(false)
    
    useEffect(()=>{
        if(props.cargado){
            setFullURL(JWPLAYERURL+src+".html")
        }
    },[props.cargado])
    
    useEffect(()=>{
        
        if(fullURL){
            const videos = document.querySelectorAll("video")
            //console.log(videos)
            
            videos.forEach(video=>{
                video.pause()
            })
        }

        return () => {
            
            setFullURL(false)
        }
        
    },[fullURL])
    
    return (<>
        {(fullURL)?
        <div className={props.className + " jwplayer-embed-container"}>
            <iframe src={fullURL}></iframe>
        </div>:
        <img className="aspect-video" src="../assets/images/miniaturaclasesminedtv.png"/>
        }
    </>)
}

export default JWPlayerEmbed

// https://cdn.jwplayer.com/players/LNVfFcfT-MmkN3maa.html