import React, { useState,useEffect,useRef } from 'react';
const EmblemList = ({onClick,className,lista}) => {
    
    const [seleccionado,setSeleccionado] = useState(false)
    

    const handleClick = (event) =>{
        
        let item = event.currentTarget.getAttribute("id_item")
        setSeleccionado(item)
        
        if(onClick != undefined || onClick != null){
            onClick(item)
        }
    }
    
    
    useEffect(()=>{
        const item = lista.find(obj => obj.seleccionado === true);
        if (item) {
          setSeleccionado(item.id);
        }
    },[lista])
    
    if(lista == null){
        return null
    }
    
    return (<>
        <div className={"flex flex-wrap gap-2 " + className } >
            {lista.map((obj,ind)=>(
            <>
                <div key={obj.id} id_item={obj.id} className={"badge "+ (obj.className != null ? obj.className : "") + ((obj.id == seleccionado) ? " selected" : "")} 
                    onClick={handleClick}>
                    {obj.titulo}
                </div>
            </>
            ))}
        </div>
    </>)
}

export default EmblemList
