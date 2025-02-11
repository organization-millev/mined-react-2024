import React, { useState, useEffect } from 'react';
import Close from '../../iconos/close.js';
import CloseDark from '../../iconos/closeWhite.js';
import Input from '../Input/Input';
import Seleccionado from '../../iconos/radio_button_checked.js';

import AmarilloSeleccionado from '../../iconos/AmarilloSeleccionado.js';
import AmarilloNoSeleccionado from '../../iconos/AmarilloNoSeleccionado.js';

import RojoSeleccionado from '../../iconos/RojoSeleccionado.js';
import RojoNoSeleccionado from '../../iconos/RojoNoSeleccionado.js';

import VerdeSeleccionado from '../../iconos/VerdeSeleccionado.js';
import VerdeNoSeleccionado from '../../iconos/VerdeNoSeleccionado.js';

import SeleccionadoDark from '../../iconos/radio_button_checked_blanco.js';
import NoSeleccionado from '../../iconos/radio_button_unchecked.js';
import Edit from '../../iconos/edit_lapiz_blanco.js'; 
import SelectLista from '../../common/SelectLista/SelectLista';

import { useEditVideoEducator } from '../../../hooks/sync/useEditVideoEducator';
import { useAlert } from '../../../providers/AlertContext';
import { useTranslation } from 'react-i18next';

const ModalClase = ({ isOpen, onClose, videoId, portadaVideo, playlistId, videoTitle, videoDescription,
                  playlist, selectedPlaylist, tags,tagVideo, GetLiveSessionArchive, setArchivo,fecha}) => {
  
  const { warn,success } = useAlert();
  const onSuccess = () => {
      onClose();
  };
  
  const { editarVideo, cargado, isSuccess } = useEditVideoEducator(onSuccess);
  
  const fetchAndSetArchivo = async () => {
    try {
      await GetLiveSessionArchive();
      const updatedData = await GetLiveSessionArchive();
      setArchivo(updatedData);
    } catch (error) {
      warn('Error al actualizar los archivos después de la edición.');
    }
  };
  
  useEffect(() => {
    if(isSuccess === true){
      //alert('termino');
      fetchAndSetArchivo();
    }
  },[isSuccess])
  
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [imageBase64, setImageBase64] = useState(null);

  const [formValues, setFormValues] = useState({
    tituloClase: videoTitle || '',
    descripcionClase: videoDescription || '',
    listaReproduccion: selectedPlaylist || '',
    dateClase: '',
    playlistId: playlistId || ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormValues(prevValues => ({
        ...prevValues,
        tituloClase: videoTitle || '',
        descripcionClase: videoDescription || '',
        //listaReproduccion: selectedPlaylist || '', // Aquí se asigna la playlist seleccionada
        dateClase: fecha ? formatDateForInput(fecha) : '',
        //playlistId: playlistId || ''
      }));
    }
  }, [isOpen, videoTitle, videoDescription, fecha]);

  
  const formatDateForInput = (dateString) => {
    if (!dateString) return ''; // Manejo de fechas nulas o vacías
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };
  
  const formatDateForSubmission = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };
  
  useEffect(() => {
    // Asigna la fecha formateada al campo de entrada en el formato dd/mm/yyyy
    setFormValues((prevValues) => ({
      ...prevValues,
      dateClase: formatDateForInput(fecha)
    }));
  }, [fecha]);
  /*useEffect(() => {
    if (selectedPlaylist && playlistId) {
        setFormValues((prevValues) => ({
            ...prevValues,
            listaReproduccion: selectedPlaylist,
            playlistId: playlistId 
        }));
    }
  }, [selectedPlaylist, playlistId]);*/
  
  /*useEffect(() => {
    if (playlistId && playlist.length > 0) {
      const matchingPlaylist = playlist.find(p => p.id === playlistId);
      if (matchingPlaylist) {
        //
        setFormValues(prevValues => ({
          ...prevValues,
          listaReproduccion: matchingPlaylist.label,
          playlistId: matchingPlaylist.id,
        }));
      }
    }
  }, [playlistId, playlist]);*/
  
  useEffect(() => {
    if (playlistId && playlist.length > 0) {
      const matchingPlaylist = playlist.find(p => p.id === parseInt(playlistId, 10));
      if (matchingPlaylist) {
        setFormValues(prevValues => ({
          ...prevValues,
          listaReproduccion: matchingPlaylist.label,
          playlistId: matchingPlaylist.id.toString(),
        }));
      }
    }
  }, [playlistId, playlist]);


  
  const [selectedTag, setSelectedTag] = useState(null);
  
  const filteredTags = tags.filter(tag => tag.tag_language === currentLanguage.toUpperCase());
  
  useEffect(() => {
    if (isOpen && filteredTags.length > 0 && tagVideo && selectedTag === null) {
      const matchingTag = filteredTags.find(tag => tag.tag_id === tagVideo);
      if (matchingTag) {
        setSelectedTag(matchingTag.tag_id);
      }
    }
  }, [isOpen, filteredTags, tagVideo]);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };
  
  const handleTagChange = (tagId) => {
    setSelectedTag(tagId);
  };
  
  
  /*const handlePlaylistChange = (label) => {
    const selectedPlaylist = playlist.find(p => p.label === label);
    if (selectedPlaylist) {
      setFormValues({
        ...formValues,
        listaReproduccion: selectedPlaylist.label,
        playlistId: selectedPlaylist.id,
      });
    }
  };*/
  
  const handlePlaylistChange = (playlistIdString) => {
    const playlistId = parseInt(playlistIdString, 10);
    const selectedPlaylist = playlist.find(p => p.id === playlistId);
    if (selectedPlaylist) {
      setFormValues({
        ...formValues,
        listaReproduccion: selectedPlaylist.label,
        playlistId: selectedPlaylist.id.toString(),
      });
    }
  };

  
  // Método para convertir la imagen subida a base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'image/png') {
        warn('Solo se permiten imágenes en formato PNG');
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileExplorer = () => {
    document.getElementById('fileInput').click();
  };
  
  const handleClick =  () => {
    const formattedDate = formatDateForSubmission(formValues.dateClase);
    editarVideo(videoId, imageBase64, selectedTag, formValues.playlistId, formValues.tituloClase, formValues.descripcionClase, formattedDate);
  };
  
  
  const [openSelectId, setOpenSelectId] = useState(null);
  const toggleDropdown = (id) => {
    //setOpenSelectId(prevId => prevId === id ? null : id);
    setOpenSelectId((prevId) => (prevId === id ? null : id));
  };
  
  if (!isOpen) return null;
  
  const previewImage = imageBase64 ? `data:image/png;base64,${imageBase64}` : portadaVideo;
    
  return (
    <>
      
      <div className="fixed inset-0 overflow-y-auto z-[3000]">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-negro opacity-50"></div>
            </div>
            
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div className="inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-[580px] sm:w-full">
            <div className="relative rounded-[20px] dark:bg-color-dark bg-white px-2 py-4">
              <div className="flex justify-end">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <Close className="dark:hidden" />
                  <CloseDark className="hidden dark:block !p-[5px]" />
                </button>
              </div>
              <div className="pl-2 pr-4">
                <div className="mb-4 grid grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1">
                    <div className="relative group hover:cursor-pointer" onClick={openFileExplorer}>
                      <img
                        src={previewImage}
                        className="aspect-video object-cover w-[100%] lg:w-[264px] lg:h-[149px]"
                        alt="portada-video"
                      />
                    
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 ease-in-out ">
                            <div className="relative bg-black bg-opacity-80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <Edit  className="icono-sm group-hover:!text-white" />
                            </div>
                      </div>
                    </div>
                    {/* Input de archivo oculto */}
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />

                  <div>
                    <p className="font-sans text-sm font-semibold mb-2 dark:text-blanco">{t('dificultadClase')}</p>
                    {filteredTags.map((tag) => (
                      <label key={tag.tag_id} className="flex items-center font-medium text-sm cursor-pointer dark:text-blanco">
                        <input
                          type="radio"
                          name="dificultad"
                          checked={selectedTag === tag.tag_id}
                          onChange={() => handleTagChange(tag.tag_id)}
                          className="hidden"
                        />
                        {selectedTag === tag.tag_id ? (
                          tag.tag_name === 'Básico' ? (
                            <VerdeSeleccionado />
                          ) : tag.tag_name === 'Intermedio' ? (
                            <AmarilloSeleccionado />
                          ) : tag.tag_name === 'Avanzado' ? (
                            <RojoSeleccionado />
                          ) : null
                        ) : (
                          tag.tag_name === 'Básico' ? (
                            <VerdeNoSeleccionado />
                          ) : tag.tag_name === 'Intermedio' ? (
                            <AmarilloNoSeleccionado />
                          ) : tag.tag_name === 'Avanzado' ? (
                            <RojoNoSeleccionado />
                          ) : null
                        )}
                        {tag.tag_name}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="dark:text-blanco">{t('nombreClase')}</p>
                   <Input
                    type="text"
                    placeholder="Título de la clase"
                    name="tituloClase"
                    value={formValues.tituloClase}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <p className="dark:text-blanco">{t('descripcionClase')}</p>
                  <Input
                    type="text"
                    placeholder="Descripción de la clase"
                    name="descripcionClase"
                    value={formValues.descripcionClase}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <p className="dark:text-blanco">{t('fecha')}</p>
                  <Input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    name="dateClase"
                    value={formValues.dateClase}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4" style={{ zIndex: 50 }}>
                  <p className="dark:text-blanco">{t('listaReproduccion')}</p>
                  {/*<SelectLista
                    opciones={playlist}
                    name="listaReproduccion"
                    value={formValues.listaReproduccion}
                    isOpen={openSelectId === 'listaReproduccion'}
                    defaultValue={formValues.listaReproduccion}
                    onChange={(value) => handleInputChange({ target: { name: 'listaReproduccion', value } })}
                    //onChange={handlePlaylistChange}
                    onToggle={toggleDropdown}
                    id="listaReproduccion"
                  />*/}
                  <SelectLista
                    opciones={playlist}
                    name="listaReproduccion"
                    value={formValues.playlistId}
                    defaultValue={formValues.playlistId}
                    onChange={handlePlaylistChange}
                    onToggle={toggleDropdown}
                    id="listaReproduccionModal" // Changed id here
                    isOpen={openSelectId === 'listaReproduccionModal'}
                  />

                </div>

                <div className="flex justify-end">
                  <button onClick={handleClick} className="boton-primario dark:boton-secundario bg-[#292735] text-xs font-bold !py-[10px]">
                  {t('btnGuardarCambios')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalClase;