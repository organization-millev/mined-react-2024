import React, { useState,useEffect } from 'react';
import AvatarGrid from '../common/AvatarGrid/AvatarGrid';
import Close from '../iconos/close.js'
import Botones from '../BotonesEmblemas/BotonesEmblemas';
import EditarFoto from '../Cursos/EditarFoto/EditarFoto';

import { useTranslation } from 'react-i18next';
import { useSavePhoto } from '../../hooks/perfil/useSavePhoto';
import { useGetGamificacionTitle } from '../../hooks/gamificacion/useGetGamificacionTitle';
import { useGetGamificacionAvatar } from '../../hooks/gamificacion/useGetGamificacionAvatar';
import { useAlert } from '../../providers/AlertContext';

const ModalPerfil = ({ closeModal, avatar, titulos, currectAvatarId }) => {
    const { t } = useTranslation();
    const { warn, success } = useAlert();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedTitleId, setSelectedTitleId] = useState(null);
    const [selectedAvatarId, setSelectedAvatarId] = useState(null);

    const { actualizarFoto, cargandoFotoPerfil } = useSavePhoto();
    const { actualizarTitle, cargandoTitulo } = useGetGamificacionTitle();
    const { actualizarAvatar, cargandoAvatar } = useGetGamificacionAvatar();
    
    const [fotoPerfilIniciada, setFotoPerfilIniciada] = useState(false);
    const [tituloIniciado, setTituloIniciado] = useState(false);
    const [avatarIniciado, setAvatarIniciado] = useState(false);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async () => {
        try {
            // Manejo de la imagen seleccionada
            if (selectedImage) {
                setFotoPerfilIniciada(true);
                const base64Image = await convertToBase64(selectedImage);
                await actualizarFoto(base64Image, true);
            }

            // Manejo del título seleccionado
            if (selectedTitleId) {
                setTituloIniciado(true);
                await actualizarTitle(selectedTitleId, true);
            }

            // Manejo del avatar seleccionado
            /*if (selectedAvatarId !== null) {
                setAvatarIniciado(true);
               await actualizarAvatar(selectedAvatarId, true);
            }*/
            try {
                setAvatarIniciado(true);
                await actualizarAvatar(selectedAvatarId, true);
            } catch (error) {
                console.error('Error al guardar el avatar:', error);
            }
            
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
            warn('Ocurrió un error al guardar los cambios.');
        }
    };
    
    useEffect(() => {
        if (
            (!fotoPerfilIniciada || (fotoPerfilIniciada && !cargandoFotoPerfil)) &&
            (!tituloIniciado || (tituloIniciado && !cargandoTitulo)) &&
            (!avatarIniciado || (avatarIniciado && !cargandoAvatar))
        ) {
            if (fotoPerfilIniciada || tituloIniciado || avatarIniciado) {
                success('Se guardaron los cambios correctamente.');
                closeModal();
                window.location.reload();
            }
        }
    }, [cargandoFotoPerfil, cargandoTitulo, cargandoAvatar]);


    return (
        <>
            <div className="fixed inset-0 z-[4000] overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
                        <div className="bg-white p-8">
                            <div className="flex justify-end">
                                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                    <Close />
                                </button>
                            </div>
                            <EditarFoto onSubmit={setSelectedImage} />
                            <h1 className="text-xl font-semibold mb-2 font-sans">{t('eligeTuAvatar')}</h1>
                            <AvatarGrid avatarIcon={avatar} onSubmitAvatar={setSelectedAvatarId} onSelect={setSelectedAvatarId} currectAvatarId={currectAvatarId} />
                            <h1 className="text-xl font-semibold mb-2 font-sans">{t('editaEmblema')}</h1>
                            <p className="text-sm font-sans font-normal">{t('editaTituloAvatar')}</p>
                            <div className="flex flex-col mt-5">
                                <Botones titulos={titulos} onSelect={setSelectedTitleId} />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className={`mt-4 bg-gris-azulado-profundo text-white font-bold py-2 px-4 rounded-full font-sans ${cargandoFotoPerfil || cargandoTitulo || cargandoAvatar ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={handleSubmit}
                                    disabled={cargandoFotoPerfil || cargandoTitulo || cargandoAvatar}
                                >
                                    {cargandoFotoPerfil || cargandoTitulo || cargandoAvatar ? 'Guardando...' : t('btnGuardarCambios')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalPerfil;