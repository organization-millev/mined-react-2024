import React from 'react';

const CardReel = ({ url_ImagenFondo_Reel, tiempo, tituloReel, videoReel, openModal }) => {

    return (
        <div>
            <div
                className="w-[100px] h-[180px] md:w-[213px] lg:w-full md:h-[350px] bg-gris-oscuro rounded-[10px] md:rounded-[20px] p-3 cursor-pointer"
                style={{
                    backgroundImage: `url('${url_ImagenFondo_Reel}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                onClick={() => openModal(videoReel)}
            >
                <div className="flex justify-end h-[70%] md:h-5/6">
                    <p className="text-xs font-medium line-clamp-2 font-sans text-blanco md:hidden">
                        {tiempo}
                    </p>
                </div>
                <div>
                    <p className="line-clamp-2 text-xs font-semibold font-sans text-blanco max-w-[70%] md:max-w-[100%] md:text-largeB md:line-clamp-3">
                        {tituloReel}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardReel;