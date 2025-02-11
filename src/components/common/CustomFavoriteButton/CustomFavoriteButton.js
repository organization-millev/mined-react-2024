import React, { useState } from 'react';
import BookmarkLoader from '../../iconos/bookmarkLoader.js';

const CustomFavoriteButton = ({ isOn, emptyIcon: EmptyIcon, filledIcon: FilledIcon }) => {
    //const [state, setState] = useState(isOn);
    const [isBookmarked, setIsBookmarked] = useState(isOn);
    const [isLoadingBookmark, setIsLoadingBookmark] = useState(false);
    
    
    /*const toggleState = (event) => {
        setState(prevState => !prevState);
    };*/
    //const transitionClasses = 'transition-opacity duration-300 ease-in-out';
    //const EmptyIcon = emptyIcon;
    //const FilledIcon = filledIcon;
    
    const toggleBookmark = () => {
        setIsLoadingBookmark(true); // Mostrar el cargando

        setTimeout(() => {
            setIsBookmarked(prevState => !prevState); // Cambiar el estado de bookmark
            setIsLoadingBookmark(false); // Ocultar el cargando después de 1.5 segundos
        }, 1500); // 1500 milisegundos = 1.5 segundos
    };
    
    return (
        <div className="size-[30px]  rounded-full flex items-center justify-center relative p-1">
            {/*{isLoadingBookmark && (
                <BookmarkLoader className="m-[4px] transition-opacity duration-300 ease-in-out opacity-100" />
            )}
            <FilledIcon
                onClick={toggleState}
                alt="Favorite Filled"
                className={`${transitionClasses} ${state ? 'opacity-100' : 'opacity-0'} absolute w-6 h-6`}
            />
            <EmptyIcon
                onClick={toggleState}
                alt="Favorite"
                className={`${transitionClasses} ${!state ? 'opacity-100' : 'opacity-0'} absolute w-6 h-6`}
            />*/}
            
            {isLoadingBookmark ? (
                <BookmarkLoader className="m-[4px] transition-opacity duration-300 ease-in-out opacity-100" />
            ) : isBookmarked ? (
                <FilledIcon onClick={toggleBookmark} className="w-6 h-6 transition-opacity duration-300 ease-in-out opacity-100" />
            ) : (
                <EmptyIcon onClick={toggleBookmark} className="w-6 h-6 transition-opacity duration-300 ease-in-out opacity-100" />
            )}
        </div>
    );
};

export default CustomFavoriteButton;