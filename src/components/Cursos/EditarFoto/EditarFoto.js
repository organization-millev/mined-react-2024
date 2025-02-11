import React, { useState,useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import UploadControl from '../../common/UploadControl/UploadControl'



const EditarFoto = ({onSubmit }) => {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);
    const funcionCarga = (objeto) =>{
        
    }
    
    const handleImageSelect = (image) => {
        setSelectedImage(image);
        onSubmit(image);
    };
    
  
    return (
        <>
            <div className="flex flex-col mb-3">
                <span className="text-xl font-semibold mb-2 font-sans">{t('editaPerfil')} </span>
                <span className="text-sm font-sans font-normal">{t('subirFotoElegirAvatar')}  </span>
                <div className="min-w-[250px] min-h-[150px] lg:w-[350px] ">
                    <UploadControl funcionCarga={funcionCarga} imgSeleccionada={handleImageSelect} soloImagenes={true}/>
                </div>
            </div>
            
        </>
        
        )
}

export default EditarFoto