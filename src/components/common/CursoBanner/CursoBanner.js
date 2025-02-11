import React, { useState } from 'react';

const CursoBanner = (props) => {
    
    return(<>
            <div className="relative w-[100%]">
                <img src={props.obj.fondo} className="max-h-[320px] w-[100%] object-cover"></img>
                <div className={"absolute w-[100%] h-[100%] top-0 left-0 bg-["+props.obj.color+"] opacity-50"}></div>
                <div className="absolute w-[100%] h-[100%] top-0 left-0">
                    <div className="flex flex-col items-center justify-center h-[100%]">
                        <img src={props.obj.logo} className="w-[170px] pt-[50px] md:w-[420px] md:p-[0px]" ></img>
                        <div className="p-[1rem] text-center">
                            <p className="text-white text-[12px] max-w-[550px] md:text-[16px] ">{props.obj.subtitulo}</p>
                        </div>
                    </div>
                </div>
            </div>
    </>)
}

export default CursoBanner;