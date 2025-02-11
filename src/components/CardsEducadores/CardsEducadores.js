import React from 'react';
import Favorito from '../iconos/favorite.js'; 
import FavoritoMarcado from '../iconos/heart_red.js'; 
import Iconos from '../iconos/iconos';
import CustomFavoriteButton from '../common/CustomFavoriteButton/CustomFavoriteButton';

  
import { useTranslation } from 'react-i18next';
import { useChannelFavorite } from '../../hooks/favorite/useChannelFavorite';

const CardsEducadores = ({file_url  , is_live , estadoClase  , NombreCurso , descripcion , instructor_name , is_favorite,isHovered, onHover,session_description,start_time, expected_end_time , files, channel_id }) => {
  
  const contenedor_card_educador = ` hidden lg:block rounded-[20px] overflow-hidden font-sans text-blanco mr-2  transition-all duration-300 ease-in-out group`;
  
  const { t } = useTranslation();
  
  const { guardarChannelFavorite } = useChannelFavorite();
  
  
  const tipoDispositivo = window.innerWidth <= 768 ? 'mobile' : 'desktop';
  
  const fileMinedTv = files.find(file => file.file_tag === 'minedtv_en_vivo_ahora' && file.file_device_type === tipoDispositivo);
  
  

 
  
  const calculateDurationInHours = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date();
  const msDiff = endDate - startDate;
  const minDiff = Math.floor(msDiff / (1000 * 60));
  const secDiff = Math.floor((msDiff / 1000) % 60);

  let timeSinceClose = "";

  if (msDiff < 0) {
    return `${t('sesionSinFinalizar')}`;
  } else if (minDiff < 1) {
    timeSinceClose = secDiff === 1 
      ? `${t('hace')} ${secDiff} ${t('segundo')}`
      : `${t('hace')} ${secDiff} ${t('segundos')}`;
  } else if (minDiff < 60) {
    timeSinceClose = minDiff === 1 
      ? `${t('hace')} ${minDiff} ${t('minuto')}`
      : `${t('hace')} ${minDiff} ${t('minutos')}`;
  } else if (minDiff < 1440) {  // Menos de un día
    const hoursDiff = Math.floor(minDiff / 60);
    timeSinceClose = hoursDiff === 1 
      ? `${t('hace')} ${hoursDiff} ${t('hora')}`
      : `${t('hace')} ${hoursDiff} ${t('horas')}`;
  } else {
    const daysDiff = Math.floor(minDiff / 1440);
    timeSinceClose = daysDiff === 1 
      ? `${t('hace')} ${daysDiff} ${t('día')}`
      : `${t('hace')} ${daysDiff} ${t('días')}`;
  }

  return timeSinceClose;
};

  
  const durationInHours = calculateDurationInHours(expected_end_time, expected_end_time);
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    guardarChannelFavorite(channel_id,true);
    
  };

  const estadoTexto = is_live ? (
    <>
      <Iconos icono="enVivo" className="icono-sm" />
      <p className="text-xs font-medium ml-1">{t('enVivo')}</p>
    </>
  ) : (
    <>
      <Iconos icono="reloj" className="icono-sm" />
      {/*
      <Iconos icono="reloj_dark" className="icono-sm" />
      */}
      <p className="text-xs font-medium ml-1"> {durationInHours} </p>
    </>
  );
  
  
  
  

  return (
    <div key={channel_id}>
      <div
        className={`${contenedor_card_educador} h-[328px] w-[174px] lg:w-[374px]`}
        style={{
          backgroundImage: `url('${fileMinedTv ? fileMinedTv.file_url : process.env.REACT_APP_DEFAULT_NO_IMAGE_URL }')`, // Usamos el file_url del archivo minedtv si existe, si no, usamos "lightgray"
          width: isHovered ? '374px' : '184px', // Cambia el ancho al hacer hover
          backgroundPosition: isHovered ? 'center' : '0px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        onMouseEnter={onHover}
        onMouseLeave={onHover} // Puedes usar el mismo evento para entrar y salir
      >
        <div className="flex flex-col items-start justify-between p-3 h-full bg-gradient-to-b from-transparent to-black/70 via-transparent bg-opacity-40">
          <div className="flex justify-end w-full">
            <div className="bg-blanco rounded-[50%] w-[38px] h-[38px] flex justify-center items-center" onClick={handleFavoriteClick}>
              <CustomFavoriteButton emptyIcon={Favorito} filledIcon={FavoritoMarcado} isOn={is_favorite} />
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center">
              {estadoTexto}
            </div>
            <p className="font-bold text-xl my-1">{NombreCurso}</p>
            <p className={`text-xs font-medium mb-2 ${isHovered ? 'block' : 'hidden'} group-hover:block`}>{session_description}</p>
            <p className="text-xs font-medium">{instructor_name}</p>
          </div>
        </div>
      </div>
        
        
        {/*--------------------------------*/}
      

        
      <div className={`lg:hidden relative rounded-[20px] overflow-hidden font-sans text-blanco bg-cover bg-center transition-all duration-300 ease-in-out group w-[300px] h-[176px] mr-6`} 
            style={{ background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 83.5%), url('${fileMinedTv ? fileMinedTv.file_url : process.env.REACT_APP_DEFAULT_NO_IMAGE_URL }') 50% / cover no-repeat` ,
              backgroundPosition: `center`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}
      >
        <div className="relative flex flex-col items-start justify-between p-[12px] h-full bg-gradient-to-b from-transparent to-black/70 via-transparent bg-opacity-40 z-20">
          <div className="flex justify-end w-full">
              <div className="bg-blanco rounded-[50%] w-[30px] h-[30px] flex justify-center items-center" onClick={handleFavoriteClick}>
                <CustomFavoriteButton emptyIcon={Favorito} filledIcon={FavoritoMarcado} isOn={is_favorite}/>
              </div>
          </div>
          <div>
            <div className="flex flex-row items-center gap-[4px]">
              {estadoTexto}
            </div>
            <p className="font-bold text-base">{NombreCurso}</p>
            <p className="text-xs font-medium">{session_description}</p>
            <p className="text-sm font-medium">{instructor_name}</p>
          </div>
        </div>
      </div>



    </div>
  );
}

export default CardsEducadores;
