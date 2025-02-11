import React, {  useEffect,useState } from 'react';

const MILLICASTURL = "https://viewer.millicast.com?streamId"

const Millicast= (props) => {
    
    const [fullURL,setFullURL] = useState("")
    
    useEffect(()=>{
        setFullURL(MILLICASTURL+"="+props.millicast_account_id+"/"+props.millicast_stream_name+`&image=${props.poster}&cast=false&liveBadge=false&userCount=false`)
    },[])
    
    return(
    <div className={props.className + " MillicastContainer aspect-video"} >
        <iframe width="100%" height="100%" src={fullURL} allowfullscreen="true"></iframe>
    </div>)
}

export default Millicast