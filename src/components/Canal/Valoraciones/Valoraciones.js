import React, { useState,useEffect } from 'react';
import IconosCanal from '../../iconos/iconos_canal'
//import EstrellaBlanca from '../../iconos/estrella_blanca';
//import EstrellaFondoBlanca from '../../iconos/estrella_llena_blanca';

import StarFill from '../../iconos/estrella_star_fill';
import StarFillBlanca from '../../iconos/estrella_llena_blanca';

import { useLiveValoracion } from '../../../hooks/canal/useLiveValoracion'; 
import { useLiveValoracionList } from '../../../hooks/canal/useLiveValoracionList'; 
import { useTranslation } from 'react-i18next';
import { useAlert } from '../../../providers/AlertContext';

const Valoraciones = ({obj ,idCanal,sessionId}) => {
    
    const { warn, success } = useAlert()
    const { registrarValoracion, isRatingSuccess } = useLiveValoracion();
    const { t } = useTranslation();
    const { GetValoracionList,valoracionList } = useLiveValoracionList(idCanal);
    const [totalEstrellas,setTotalEstrellas] = useState(0)
    const [clickedEstrellas,setClickedEstrellas] = useState(false)
    const [abrirComentario,setAbrirComentario] = useState(false)
    const [commentValue, setCommentValue] = useState('');
    
    const [valoraciones, setValoraciones] = useState(valoracionList);
    //const [comentarios, setComentarios] = useState(commentValue);
    const [newRatingRegistered, setNewRatingRegistered] = useState(false)
    const [testimonios, setTestimonios] = useState([]);
    
    useEffect(() =>{
        if(isRatingSuccess === true){
            GetValoracionList(true);
        }
    },[isRatingSuccess,idCanal])
    
    
    useEffect(() => {
        setValoraciones(valoracionList);
        //setComentarios(commentValue);
        setNewRatingRegistered(false);
    }, [valoracionList, newRatingRegistered]);
    
    const handleClickOcultar = () =>{
        setAbrirComentario(true)
    }
    
    const handleEstrella = (event) =>{
        setTotalEstrellas(Number(event.currentTarget.getAttribute('data-estrella')));
        //setTotalEstrellas(event.currentTarget.getAttribute("data-estrella"))
    }
    
    const handleEstrellaOut = (event) =>{
        
        if(!clickedEstrellas){
            setTotalEstrellas(0)   
        }
        
    }



    const handleClickEstrella = (event) => {
        setClickedEstrellas(true)
        //setTotalEstrellas(event.currentTarget.getAttribute("data-estrella"))
        setTotalEstrellas(Number(event.currentTarget.getAttribute('data-estrella')));
    }
    
    useEffect(()=>{
        GetValoracionList(true)
    },[idCanal])
    
    
    const handleCommentChange = (event) => {
        setCommentValue(event.target.value);
    };
    
    
    /*const handleSubmitValoracion = () => {

        if (totalEstrellas > 0 && commentValue.trim() !== '') {
           registrarValoracion(totalEstrellas,commentValue,sessionId,true);
            
            const newValoracion = {
                average_rating: totalEstrellas,
                rating_5_count: totalEstrellas === 5 ? 1 : 0,
                rating_4_count: totalEstrellas === 4 ? 1 : 0,
                rating_3_count: totalEstrellas === 3 ? 1 : 0,
                rating_2_count: totalEstrellas === 2 ? 1 : 0,
                rating_1_count: totalEstrellas === 1 ? 1 : 0,
            };
            

            setValoraciones(prevValoraciones => {
                if (prevValoraciones.length > 0) {
                    const updatedValoraciones = [...prevValoraciones];
                    
                    // Actualizar los contadores de estrellas en el objeto correspondiente
                    updatedValoraciones[0].rating_5_count += newValoracion.rating_5_count;
                    updatedValoraciones[0].rating_4_count += newValoracion.rating_4_count;
                    updatedValoraciones[0].rating_3_count += newValoracion.rating_3_count;
                    updatedValoraciones[0].rating_2_count += newValoracion.rating_2_count;
                    updatedValoraciones[0].rating_1_count += newValoracion.rating_1_count;

                    // Recalcular average_rating
                    const totalRatings = (updatedValoraciones[0].rating_5_count + updatedValoraciones[0].rating_4_count +
                        updatedValoraciones[0].rating_3_count + updatedValoraciones[0].rating_2_count + 
                        updatedValoraciones[0].rating_1_count);
                    updatedValoraciones[0].average_rating = (updatedValoraciones[0].average_rating * (totalRatings - 1) + totalEstrellas) / totalRatings;
                    
                    return updatedValoraciones;
                } else {
                    return [...prevValoraciones, newValoracion];
                }
            });
        
            setTotalEstrellas(0);
            setCommentValue('');
            //window.location.reload();
        } else {
            warn('Por favor, completa todos los campos antes de enviar tu valoración.');
        }
    };*/
    const handleSubmitValoracion = () => {
        if (totalEstrellas > 0 && commentValue.trim() !== '') {
            registrarValoracion(totalEstrellas, commentValue, sessionId, true);
            
            const newValoracion = {
                average_rating: totalEstrellas,
                total_reviews: 1, // Inicializamos total_reviews en 1
                rating_5_count: totalEstrellas === 5 ? 1 : 0,
                rating_4_count: totalEstrellas === 4 ? 1 : 0,
                rating_3_count: totalEstrellas === 3 ? 1 : 0,
                rating_2_count: totalEstrellas === 2 ? 1 : 0,
                rating_1_count: totalEstrellas === 1 ? 1 : 0,
            };
            
            setValoraciones(prevValoraciones => {
                if (prevValoraciones.length > 0) {
                    const updatedValoraciones = [...prevValoraciones];
                    
                    // Actualizar los contadores de estrellas en el objeto correspondiente
                    updatedValoraciones[0].rating_5_count += newValoracion.rating_5_count;
                    updatedValoraciones[0].rating_4_count += newValoracion.rating_4_count;
                    updatedValoraciones[0].rating_3_count += newValoracion.rating_3_count;
                    updatedValoraciones[0].rating_2_count += newValoracion.rating_2_count;
                    updatedValoraciones[0].rating_1_count += newValoracion.rating_1_count;
                    
                    // Incrementar total_reviews
                    updatedValoraciones[0].total_reviews += 1;
                    
                    // Recalcular average_rating
                    const totalReviews = updatedValoraciones[0].total_reviews;
                    const sumOfRatings = (updatedValoraciones[0].rating_5_count * 5) +
                                         (updatedValoraciones[0].rating_4_count * 4) +
                                         (updatedValoraciones[0].rating_3_count * 3) +
                                         (updatedValoraciones[0].rating_2_count * 2) +
                                         (updatedValoraciones[0].rating_1_count * 1);
                    updatedValoraciones[0].average_rating = sumOfRatings / totalReviews;
                    
                    return updatedValoraciones;
                } else {
                    // Si no hay valoraciones previas, agregamos la nueva
                    return [newValoracion];
                }
            });
            
            setTotalEstrellas(0);
            setCommentValue('');
        } else {
            warn('Por favor, completa todos los campos antes de enviar tu valoración.');
        }
    };

    
 
    
    const ratingData = valoraciones.length > 0 ? valoraciones[0] : {
        rating_5_count: 0,
        rating_4_count: 0,
        rating_3_count: 0,
        rating_2_count: 0,
        rating_1_count: 0,
        total_reviews: 0,
        average_rating: 0.0,
    };
    
    /*const ratingPercentages = [
        { estrellas: 5, porcentaje: ratingData.total_reviews > 0 ? Math.round((ratingData.rating_5_count / ratingData.total_reviews) * 100) : 0 },
        { estrellas: 4, porcentaje: ratingData.total_reviews > 0 ? Math.round((ratingData.rating_4_count / ratingData.total_reviews) * 100) : 0 },
        { estrellas: 3, porcentaje: ratingData.total_reviews > 0 ? Math.round((ratingData.rating_3_count / ratingData.total_reviews) * 100) : 0 },
        { estrellas: 2, porcentaje: ratingData.total_reviews > 0 ? Math.round((ratingData.rating_2_count / ratingData.total_reviews) * 100) : 0 },
        { estrellas: 1, porcentaje: ratingData.total_reviews > 0 ? Math.round((ratingData.rating_1_count / ratingData.total_reviews) * 100) : 0 }
    ];*/
    const totalReviews = ratingData.total_reviews;
    const unroundedPercentages = [
      { estrellas: 5, porcentaje: totalReviews > 0 ? (ratingData.rating_5_count / totalReviews) * 100 : 0 },
      { estrellas: 4, porcentaje: totalReviews > 0 ? (ratingData.rating_4_count / totalReviews) * 100 : 0 },
      { estrellas: 3, porcentaje: totalReviews > 0 ? (ratingData.rating_3_count / totalReviews) * 100 : 0 },
      { estrellas: 2, porcentaje: totalReviews > 0 ? (ratingData.rating_2_count / totalReviews) * 100 : 0 },
      { estrellas: 1, porcentaje: totalReviews > 0 ? (ratingData.rating_1_count / totalReviews) * 100 : 0 },
    ];
    
    const flooredPercentages = unroundedPercentages.map(item => ({
      estrellas: item.estrellas,
      porcentaje: Math.floor(item.porcentaje),
    }));
    
    let sumFloored = flooredPercentages.reduce((sum, item) => sum + item.porcentaje, 0);
    let difference = 100 - sumFloored;
    
    if (difference !== 0) {
      const decimalParts = unroundedPercentages
        .map((item, index) => ({
          index,
          decimalPart: item.porcentaje - Math.floor(item.porcentaje),
        }))
        .filter(item => item.decimalPart > 0); // Solo tomamos en cuenta los decimales mayores a 0
    
      decimalParts.sort((a, b) => b.decimalPart - a.decimalPart);
    
      const limit = Math.min(Math.abs(difference), decimalParts.length);
    
      for (let i = 0; i < limit; i++) {
        const index = decimalParts[i].index;
    
        if (difference > 0) {
          flooredPercentages[index].porcentaje += 1;
        } else if (flooredPercentages[index].porcentaje > 0) {
          flooredPercentages[index].porcentaje -= 1;
        }
      }
    }
    const ratingPercentages = flooredPercentages.map(item => ({
      ...item,
      porcentaje: item.porcentaje || 0,
    }));
    
    //console.log(ratingPercentages);

    const averageRating = ratingData.average_rating !== undefined ? ratingData.average_rating.toFixed(1) : '0.0';
    
    return(<>
        <div className="w-full grid gap-4 lg:grid-cols-2">
            <h2 className="text-xl text-left pb-[10px] lg:text-left lg:col-span-2 lg:pb-[0px] lg:text-extra font-semibold dark:text-blanco">
                {obj?.titulo || t('valoracionesTitulo')}
            </h2>
            <div className="grid grid-flow-row-dense grid-cols-2 gap-[1rem] lg:grid-cols-1 lg:gap-0">
                <div className="flex flex-col lg:flex-row lg:gap-[14px] items-center">
                    <span className="flex text-4xl  lg:text-[32px] font-bold dark:!text-blanco" >
                        {averageRating}
                    </span>
                    <div className="flex md:gap-[14px]">
                        {[...Array(5)].map((_, ind) => (
                            <div key={`IconosCanal56-${ind}`} >
                              <IconosCanal 
                                key={`IconosCanal5-${ind}`}
                                icono={ind + 1 <= Math.round(ratingData.average_rating) ? "estrella_llena" : "estrella"} 
                                className="!p-0 h-[25px] w-[25px] lg:h-[25px] lg:w-[25px] dark:hidden " 
                               />
                               <IconosCanal
                                    key={`IconosCanal6-${ind}`}
                                    icono={ind + 1 <= Math.round(ratingData.average_rating) ? "estrella_llena_blanca" : "estrella_blanca"} 
                                    className="!p-0 h-[25px] w-[25px] lg:!h-[40px] lg:!w-[25px] dark:!h-[25px] dark:!w-[25px] hidden  dark:block " 
                               />
                            </div>
                        ))}
                    </div>
                </div>
                {/*<div className="grid grid-flow-row gap-[0.5rem] h-[100%]">
                    <div className="flex flex-col ">
                        {ratingPercentages.map((obj, ind) => (
                            <div className="flex w-[100%] items-center  h-[18px] md:h-[25px]" key={`ratingPercentages-${ind}`} >
                                <span className="text-[10px] lg:text-[15px] dark:text-blanco">{obj.estrellas}</span>
                                <IconosCanal icono="estrella_llena" className="dark:hidden !p-0 h-[15px] w-[15px] lg:h-[20px] lg:w-[20px]" />
                                <EstrellaFondoBlanca className="!hidden dark:!block w-[13px] h-[13px] mx-[2px] !p-0 md:p-[8px]"/>
                                
                                <div className="w-[100%] bg-[var(--color-gris-valoracion)] dark:bg-color-dark2  h-[35%] rounded lg:w-[50%]">
                                    <div className="bg-[var(--color-gris-azulado-profundo)] dark:bg-blanco rounded" style={{ width: `${obj.porcentaje}%`, height: '100%' }}></div>
                                </div>
                                <span className="hidden lg:block dark:text-blanco">{obj.porcentaje}%</span>
                            </div>
                        ))}
                    </div>
                </div>*/}
                
                <div className="grid grid-flow-row max-w-[371px]">
                    {ratingPercentages.map((obj, ind) => (
                        <div key={`ratingPercentages-${ind}`} className="flex items-center h-[18px] md:h-[25px]  ">
                            <span className="text-xs font-sans font-semibold text-color-dark w-4 dark:text-blanco">{obj.estrellas}</span>
                            <StarFill className="dark:hidden w-[13px] h-[13px] !p-0 md:p-[8px]"/>
                            <StarFillBlanca className="!hidden dark:!block w-[13px] h-[13px] !p-0 md:p-[8px]"/>
        
                            <div className="flex items-center w-full mx-2">
                                <div className="bg-gray-300 dark:bg-color-dark2 w-full h-[4px] rounded-lg">
                                    <div
                                        className="bg-color-dark dark:bg-blanco h-[4px] rounded-lg"
                                        style={{ width: `${obj.porcentaje}%` }}
                                    ></div>
                                </div>
                            </div>
                            <span className="hidden md:block text-xs font-sans font-semibold text-color-dark dark:text-blanco ">{obj.porcentaje}%</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className={"flex-col " + (abrirComentario ? "flex" : "hidden") + " lg:!flex"}>
                <div className="flex lg:mt-[-10px] lg:ms-auto lg:pb-[1.5rem] md:gap-[14px] cursor-pointer">
                    {[...Array(5)].map((_, ind) => (
                        <div
                            onMouseEnter={handleEstrella}
                            onMouseLeave={handleEstrellaOut}
                            onClick={handleClickEstrella}
                            data-estrella={(ind + 1).toString()}
                            key={`Comentario-${ind}`} 
                        >
                            <IconosCanal icono={totalEstrellas >= (ind + 1) ? "estrella_llena" : "estrella"} className="dark:hidden !p-0 h-[25px] w-[25px] " />
                            <IconosCanal icono={totalEstrellas >= (ind + 1) ? "estrella_llena_blanca" : "estrella_blanca"} className="hidden dark:block !p-0 h-[25px] w-[25px] " />
                        </div>
                    ))}
                </div>
                <div>
                    <textarea
                        className="h-[100%] w-[100%] border-[var(--color-gris-azulado-profundo)] dark:border-blanco dark:text-blanco dark:bg-color-dark border-2 rounded-[20px] p-[1rem] min-h-[150px] focus:ring-0 font-sans"
                        placeholder={obj?.placeholderComentario || t('dejaValoracion')}
                        value={commentValue}
                        onChange={handleCommentChange}
                    />
                </div>
            </div>
            
            <div className="lg:col-span-2 flex">
                <button
                    onClick={handleClickOcultar}
                    className={"bg-[var(--color-gris-azulado-profundo)] dark:boton-secundario  text-white px-[0.75rem] py-[0.5rem] rounded-[20px] w-[100%] " + (abrirComentario ? "hidden" : "block") + " lg:hidden lg:ms-auto lg:w-[auto]"}
                >
                    {obj?.textoDejaValoracion || t('dejaUnaValoracion')}
                </button>
                <button
                    className={"bg-[var(--color-gris-azulado-profundo)] dark:boton-secundario dark:font-bold dark:text-sm dark:py-2 text-white px-[0.75rem] py-[0.5rem] rounded-[20px] w-[100%] " + (!abrirComentario ? "hidden" : "block") + " lg:block lg:ms-auto lg:w-[auto]"}
                    onClick={handleSubmitValoracion}
                >
                    {obj?.textoEnviar || t('enviarbtn')}
                </button>
            </div>
        </div>
    </>)
}

export default Valoraciones