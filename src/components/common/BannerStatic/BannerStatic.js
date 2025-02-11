import React from 'react';

const BannerStatic = ({ contenidoBanner, useSubtitle = false }) => {
  return (
    <>
      {contenidoBanner.map((obj) => (
        <div key={obj.program_id} className={`relative overflow-hidden h-[228px] lg:h-[360px] bg-no-repeat bg-cover bg-center object-contain`} style={{ backgroundImage: `url(${obj.bannerUrl})` }}>
          <div className="absolute inset-0 flex px-[5%]">
            <div className="flex items-center flex-col justify-center gap-4 lg:gap-5 w-full">
              <img src={obj.logoUrl} alt={obj.name} className="w-[220px] h-[37px] md:w-[397px] md:h-[67px] lg:w-[523px] lg:h-[88px] object-contain" />
              <p className="text-xs lg:text-base text-white text-center font-sans md:w-[550px]">
                {useSubtitle && obj.subtitle ? obj.subtitle : obj.slogan}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BannerStatic;