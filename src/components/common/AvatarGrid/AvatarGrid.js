import React, { useState, useEffect } from 'react';
import AvatarItem from './AvatarItem';

const AvatarGrid = ({ avatarIcon = [], onSubmitAvatar, idAvatar,selected, currectAvatarId}) => {
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null);
    const [selectedButton, setSelectedButton] = useState('none');
    

    useEffect(() => {
        setAvatars(avatarIcon);
        const initialIndex = avatarIcon.findIndex(avatar => avatar.idAvatar == currectAvatarId);
        
        
        if (initialIndex !== -1) {
            setSelectedAvatarIndex(initialIndex);
            setSelectedButton(avatarIcon[initialIndex].idAvatar);
        } else {
            setSelectedButton('none');
        }
    }, [avatarIcon, currectAvatarId]);

   
    
    const handleAvatarClick = (index) => {
        if (avatars[index].estado !== 'inactivo') {
            setSelectedAvatarIndex(index);
            setSelectedButton(null);
            onSubmitAvatar(avatars[index].idAvatar); 
        }
    };

    const handleNoAvatarClick = () => {
        setSelectedAvatarIndex(null);
        setSelectedButton('none');
        onSubmitAvatar(0);
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-[10px] p-2">
            <div id="no-avatar-option" className={`relative bg-plata-suave w-32 h-32 rounded-[20px] overflow-hidden cursor-pointer ${selectedButton === 'none' ? 'border-[5px] border-gris-oscuro' : ''}`}
                onClick={() => {
                    handleNoAvatarClick(); 
                }} 
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-24 h-24 rounded-full border-4 border-red-600 flex items-center justify-center">
                        <div className="absolute w-full h-[5px] bg-red-600 transform rotate-45 border-none"></div>
                    </div>
                </div>
            </div>

            {avatars.map((avatar, index) => (
                <AvatarItem
                    key={avatar.idAvatar}
                    src={avatar.iconoUrl}
                    alt={avatar.nombre}
                    state={avatar.estado}
                    isSelected={selectedAvatarIndex === index}
                    selected={selectedButton === avatar.idAvatar}
                    onClick={() => handleAvatarClick(index)}
                />
            ))}
        </div>
    );
};

export default AvatarGrid;