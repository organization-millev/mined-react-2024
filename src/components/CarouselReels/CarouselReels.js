import React, { useRef, useState, useEffect } from 'react';
import './CarouselReels.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardReel from '../CardReel/CardReel';
import FlechaIz from '../iconos/arrow_circle_right.js';
import FlechaDer from '../iconos/arrow_circle_left.js';
import CustomSaberMas from '../common/CustomSaberMas/CustomSaberMas';
import { useReels } from '../../hooks/help/useReels';
import { useTranslation } from 'react-i18next';

const CarouselReels = ({openModal, reels}) => {
    /*const { GetReels, reels, cargando } = useReels();
    

    useEffect(() => {
        GetReels();
    }, []);*/

    const { t } = useTranslation();
    const sliderRef = useRef();
    const [slidesToShow, setSlidesToShow] = useState(3);
    const [isMobile, setIsMobile] = useState(true);
    const [showMore, setShowMore] = useState(false);

    const updateSlidesToShow = () => {
        const width = window.innerWidth;
        
        if (width >= 1200) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
        if (width >= 1920) {
            setSlidesToShow(5);
        } else if (width >= 1440) {
            setSlidesToShow(5);
        } else if (width >= 1280) {
            setSlidesToShow(5);
        } else if (width >= 1100) {
            setSlidesToShow(3.8);
        } else if (width >= 1040) {
            setSlidesToShow(6.5);
        } else if (width >= 1024) {
            setSlidesToShow(4);
        } else if (width >= 768) {
            setSlidesToShow(3);
        } else if (width >= 425) {
            setSlidesToShow(3.5);
        } else if (width >= 375) {
            setSlidesToShow(3.1);
        } else if (width >= 320) {
            setSlidesToShow(2.6);
        } else if (width >= 280) {
            setSlidesToShow(2.2);
        } else {
            setSlidesToShow(1);
        }
    };

    useEffect(() => {
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
        nextArrow: <FlechaDer />,
        prevArrow: <FlechaIz />,
    };

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className="carousel-reels py-[20px] ">
            {!isMobile ? (
                <Slider ref={sliderRef} {...settings}>
                    {reels.map((reel, index) => (
                        <div key={reel.reel_id} className="">
                            <CardReel {...reel} openModal={openModal}/>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className="grid grid-cols-5 gap-[24px] justify-items-center">
                    {reels.slice(0, 5).map((reel, index) => (
                        <div key={reel.reel_id} className="">
                            <CardReel {...reel} openModal={openModal}/>
                        </div>
                    ))}
                    {showMore && reels.slice(5).map((reel, index) => (
                        <div key={reel.reel_id} className="">
                            <CardReel {...reel} openModal={openModal}/>
                        </div>
                    ))}
                </div>
            )}
            {isMobile && (
                <div className="flex justify-center my-6">
                    <button onClick={handleShowMore} className="hidden md:block">
                        <CustomSaberMas text={showMore ? t('verMenos') :  t('verMas') } className="hidden md:block " />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CarouselReels;