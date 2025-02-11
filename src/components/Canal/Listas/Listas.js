import React, { useState, useEffect } from 'react';
import IconosCanal from '../../iconos/iconos';
import SelectLista from '../../common/SelectLista/SelectLista';
import ModalClase from '../../common/ModalClase/ModalClase';
import SeccionDocumentosEducador from '../../common/SeccionDocumentosEducador/SeccionDocumentosEducador';
import IconosProgramacion from '../../iconos/iconos';
import SeccionDescarga from '../../SeccionDescarga/SeccionDescarga.js';
import CarpetaAbiertaDark from '../../iconos/folder_open_dark.js';
import Edit from '../../iconos/edit_lapiz_blanco';
import EditLista from '../../iconos/edit.js';
import Iconos from '../../iconos/iconos';
import CrearLista from '../../iconos/crear_listas';
import Input from '../../common/Input/Input';
import FlechaAbajo from '../../iconos/expand_more'; 
import FlechaAbajoWhite from '../../iconos/expand_more_white.js';
import FlechaArriba from '../../iconos/keyboard_arrow_up';
import FlechaArribaWhite from '../../iconos/keyboard_arrow_up_white.js';


import FlechaIzPag from '../../iconos/FlechaIzPag.js';
import FlechaIzPagDark from '../../iconos/FlechaIzPagDark.js';

import { useAlert } from '../../../providers/AlertContext';
import { useTranslation } from 'react-i18next';
import { useLiveSessionArchive } from '../../../hooks/canal/useLiveSessionArchive';
import { useLiveMaterials } from '../../../hooks/canal/useLiveMaterials';
import { useDisableVideo } from '../../../hooks/sync/useDisableVideo';
import { useEditarPlaylist } from '../../../hooks/sync/useEditarPlaylist';
import { useCrearPlaylist } from '../../../hooks/sync/useCrearPlaylist';

const CUADRICULA = "grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-[20px]";
const LISTA = "flex flex-wrap  w-[100%]";
const ELEMENTOS_POR_PAGINA = 12;

const Listas = ({ obj, idCanal, sessionId, imgStreamingEspera,instructor,permisoInstructor,idCurso}) => {
    const { warn,success } = useAlert();
    const { t } = useTranslation();
    const { GetLiveSessionArchive, archivos, setArchivo , generateTagList } = useLiveSessionArchive(idCanal);
    const { GetLiveMaterials, liveMaterials, setLiveMaterials, error } = useLiveMaterials(idCanal);
    const { deshabilitarVideo, isDisableVideoSuccess } = useDisableVideo();
    const { editarPlaylist, isSuccessPlayList } = useEditarPlaylist();
    const { crearPlaylist, isCrearPlayList } = useCrearPlaylist();
    const [ dificultad , setDificultad] = useState([]); 
    
    
    
    useEffect(() => {
        if (idCanal) {
            GetLiveSessionArchive();
            GetLiveMaterials();
        }
    }, [idCanal]);
    
    useEffect(() => {
        if (isDisableVideoSuccess || isCrearPlayList || isSuccessPlayList){
            GetLiveSessionArchive();
        }
    },[isDisableVideoSuccess, isSuccessPlayList, isCrearPlayList])


    const [filtros, setFiltros] = useState({
        texto: null,
        orden: "-",
        lista_seleccionada: "-",
        dificultad: "-",
        pagina: 1
    });

    
    
    
    
    const [totalPaginas, setTotalPaginas] = useState(1); // Estado para el número total de páginas
    
    const [isCuadricula, setIsCuadricula] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalArchivosVisible, setModalArchivosVisible] = useState(false);
    const [isCrearListaModalOpen, setIsCrearListaModalOpen] = useState(false);
    const [isEditarListaModalOpen, setIsEditarListaModalOpen] = useState(false);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [selectedPlaylistForEdit, setSelectedPlaylistForEdit] = useState(null);

    const [isDropdownPagOpen, setIsDropdownPagOpen] = useState(false);

    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videosFiltrados, setVideosFiltrados] = useState([]);
    const [listaReproduccionOptions, setListaReproduccionOptions] = useState([]);
    const [listaTagOptions, setListaTagOptions] = useState([]);
    const [mostrarCheckboxes, setMostrarCheckboxes] = useState(false);

    const [openSelectId, setOpenSelectId] = useState(null); 
    const [openSelectIdModal, setOpenSelectIdModal] = useState(null);

    const toggleDropdown = (id) => {
        setOpenSelectId(prevId => prevId === id ? null : id);
    };
    
    const toggleDropdownModal = (id) => {
        setOpenSelectIdModal(prevId => prevId === id ? null : id);
    };
    //para pasar la info a modalclase
    useEffect(() => {
        if (Array.isArray(archivos) && archivos.length > 0) {
            /*const opcionesReproduccion = archivos.flatMap((session) =>
                session.playlists.map((playlist) => ({
                    value: playlist.playlistName,
                    label: playlist.playlistName || t("sinNombre"),
                    id: playlist.playlistId,
                }))
            );*/
            const opcionesReproduccion = archivos.flatMap((session) =>
                (session.playlists || []).map((playlist) => ({
                    value: playlist.playlistId.toString(),
                    label: playlist.playlistName || t("sinNombre"),
                    id: playlist.playlistId,
                }))
            );

            setListaReproduccionOptions(opcionesReproduccion);
        }
    }, [archivos]);
    useEffect(() => {
        if (Array.isArray(archivos) && archivos.length > 0) {
            const tagsSesion = archivos.flatMap(session => session.tags || []);
            setListaTagOptions(tagsSesion);
            
            const tags = archivos.flatMap(session =>
                session.playlists.flatMap(playlist =>
                    playlist.videos.flatMap(video =>
                        video.tags.map(tag => ({
                            value: tag.tagId,
                            label: tag.tagName,
                        }))
                    )
                )
            );
    
            // Filtrar los tags únicos
            const uniqueTags = Array.from(new Set(tags.map(tag => tag.label))).map(tagName => {
                return tags.find(tag => tag.label === tagName);
            });
    
            // Función para normalizar los strings y eliminar acentos
            /*const normalizeTag = (tagLabel) => {
                return tagLabel.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            };*/
            
            const normalizeTag = (tagLabel) => {
              if (typeof tagLabel === 'string') {
                return tagLabel.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
              }
              return ''; // Devuelve una cadena vacía si el valor no es una cadena
            };

    
            // Ordenar los tags: Basico primero, Intermedio segundo, Avanzado tercero
            const sortedTags = uniqueTags.sort((a, b) => {
                // Definir el orden deseado
                const order = ["basico", "intermedio", "avanzado"];
    
                const normalizedA = normalizeTag(a.label);
                const normalizedB = normalizeTag(b.label);
    
                const indexA = order.indexOf(normalizedA);
                const indexB = order.indexOf(normalizedB);
    
                // Si ambos tags están en el array 'order', compararlos por su posición
                if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                }
    
                // Si solo uno de los tags está en 'order', ese se coloca primero
                if (indexA !== -1) return -1;
                if (indexB !== -1) return 1;
    
                // Si ninguno está en 'order', se ordenan alfabéticamente
                return normalizedA.localeCompare(normalizedB);
            });
    
            setDificultad(sortedTags);
        }
    }, [archivos]);

    const [formValues, setFormValues] = useState({
        tituloPlaylist: '',
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    
    
    // Función para ordenar videos
    const ordenarVideos = (videos, orden) => {
        return videos.sort((a, b) => {
            const dateA = new Date(a.videoCreatedDateComplete);
            const dateB = new Date(b.videoCreatedDateComplete);
            return orden === "fecha_asc" ? dateA - dateB : dateB - dateA;
        });
    };

    // Filtrar videos según lista seleccionada y dificultad
    /*useEffect(() => {
        const filtrarVideos = () => {
            let videosFiltrados = archivos.flatMap(session => session.playlists.flatMap(playlist => playlist.videos));

            // Filtrar por lista de reproducción si hay una seleccionada
            if (filtros.lista_seleccionada !== "-") {
                videosFiltrados = archivos
                    .flatMap(session => session.playlists)
                    .filter(playlist => playlist.playlistName === filtros.lista_seleccionada)
                    .flatMap(playlist => playlist.videos);
            }

            // Filtrar por dificultad si hay una seleccionada
            if (filtros.dificultad !== "-") {
                videosFiltrados = videosFiltrados.filter(video =>
                    video.tags.some(tag => tag.tagId === filtros.dificultad)
                );
            }

            // Ordenar videos según el filtro de orden
            if (filtros.orden !== "-") {
                videosFiltrados = ordenarVideos(videosFiltrados, filtros.orden);
            }
            
             // Total de páginas basado en la cantidad de videos
            const totalPaginasCalculadas = Math.ceil(videosFiltrados.length / ELEMENTOS_POR_PAGINA);
            setTotalPaginas(totalPaginasCalculadas);
    
            // Aplicar paginación
            const inicio = (filtros.pagina - 1) * ELEMENTOS_POR_PAGINA;
            const fin = inicio + ELEMENTOS_POR_PAGINA;
            videosFiltrados = videosFiltrados.slice(inicio, fin);

            setVideosFiltrados(videosFiltrados);
        };

        if (Array.isArray(archivos) && archivos.length > 0) {
            filtrarVideos();
        }
    }, [filtros, archivos]);*/
    
    useEffect(() => {
        const filtrarVideos = () => {
            // Recolectar todos los videos, incluyendo los videos a nivel de sesión
            let todosLosVideos = archivos.flatMap(session =>
                [
                    ...(session.videos || []),
                    ...(session.playlists || []).flatMap(playlist => playlist.videos || [])
                ]
            );

            // Eliminar duplicados basados en videoId
            let videosUnicos = Array.from(
                new Map(todosLosVideos.map(video => [video.videoId, video])).values()
            );

            // Aplicar filtros según los criterios seleccionados
            let videosFiltrados = videosUnicos;

            // Filtrar por lista de reproducción si hay una seleccionada
            if (filtros.lista_seleccionada !== "-") {
                const playlistsSeleccionadas = archivos
                    .flatMap(session => session.playlists || [])
                    .filter(playlist => playlist.playlistName === filtros.lista_seleccionada);

                videosFiltrados = playlistsSeleccionadas.flatMap(playlist => playlist.videos || []);
            }

            // Filtrar por dificultad si hay una seleccionada
            if (filtros.dificultad !== "-") {
                videosFiltrados = videosFiltrados.filter(video =>
                    video.tags.some(tag => tag.tagId === filtros.dificultad)
                );
            }

            // Ordenar videos según el filtro de orden
            if (filtros.orden !== "-") {
                videosFiltrados = ordenarVideos(videosFiltrados, filtros.orden);
            }

            // Eliminar duplicados nuevamente después de filtrar
            /*videosFiltrados = Array.from(
                new Map(videosFiltrados.map(video => [video.videoId, video])).values()
            );*/
            videosFiltrados = videosFiltrados.sort((a, b) => {
                const dateA = new Date(a.videoCreatedDateComplete);
                const dateB = new Date(b.videoCreatedDateComplete);
                return filtros.orden === "fecha_asc" ? dateA - dateB : dateB - dateA;
            });
            
            // Total de páginas basado en la cantidad de videos
            const totalPaginasCalculadas = Math.ceil(videosFiltrados.length / ELEMENTOS_POR_PAGINA);
            setTotalPaginas(totalPaginasCalculadas);

            // Aplicar paginación
            const inicio = (filtros.pagina - 1) * ELEMENTOS_POR_PAGINA;
            const fin = inicio + ELEMENTOS_POR_PAGINA;
            videosFiltrados = videosFiltrados.slice(inicio, fin);

            setVideosFiltrados(videosFiltrados);
        };

        if (Array.isArray(archivos) && archivos.length > 0) {
            filtrarVideos();
        }
    }, [filtros, archivos]);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    
    // Efecto para manejar el scroll del body
    useEffect(() => {
        if (isModalOpen) {
          // Cuando el modal esté abierto, ocultar el scroll del body
          document.body.style.overflow = 'hidden';
        } else {
          // Restaurar el scroll del body cuando el modal esté cerrado
          document.body.style.overflow = '';
        }
    
        // Limpiar el efecto al desmontar el componente
        return () => {
          document.body.style.overflow = '';
        };
      }, [isModalOpen]);
        
    const seleccionarPagina = (pagina) => {
    setFiltros({ ...filtros, pagina });
    setIsDropdownPagOpen(false); // Cierra el dropdown después de seleccionar una página
    };
    
    
    const handleClose = () => {
        setIsModalOpen(false);
    };
    
    const handleLista = () => {
        setIsCuadricula(!isCuadricula);
    };

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setModalVisible(true);
        document.body.style.overflow = 'hidden';
        
        const videos = document.querySelectorAll("video")
        //console.log(videos)
        
        videos.forEach(video=>{
            video.pause()
        })
        
    };
    //cerrar la visualizacion de videos con rol estudiante
    const closeModal = () => {
        setModalVisible(false);
        setSelectedVideo(null);
        document.body.style.overflow = 'auto';
        
        const videos = document.querySelectorAll("video")
        
        videos.forEach(video=>{
            video.pause()
        })
    };
    
    const openModalArchivos = () => {
        setModalArchivosVisible(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModalArchivos = () => {
        setModalArchivosVisible(false);
        document.body.style.overflow = 'auto';
    };
    
    const openCrearListaModal = () => {
        setIsCrearListaModalOpen(true);
        document.body.style.overflow = 'hidden';
    };
    
    const closeCrearListaModal = () => {
        setIsCrearListaModalOpen(false);
        document.body.style.overflow = 'auto';
        setSelectedVideos([]);
    };
    
    const openEditarListaModal = () => {
      setIsEditarListaModalOpen(true);
      document.body.style.overflow = 'hidden';
      setSelectedVideos([]); // Limpiar selección de videos
      setSelectedPlaylistForEdit(null); // Limpiar playlist seleccionada
    };
    
    const closeEditarListaModal = () => {
      setIsEditarListaModalOpen(false);
      document.body.style.overflow = 'auto';
      setSelectedVideos([]); // Limpiar selección de videos
      setSelectedPlaylistForEdit(null); // Limpiar playlist seleccionada
    };

    const handleDeshabilitarVideo = (videoId,e) => {
        e.stopPropagation();  
        e.preventDefault();
        deshabilitarVideo(videoId);
    }
    
    //const allVideos = Array.isArray(archivos) ? archivos.flatMap(session => session.playlists.flatMap(playlist => playlist.videos)) : [];
    const allVideos = Array.isArray(archivos)
    ? Array.from(
        new Map(
            archivos.flatMap(session =>
                [
                    ...(session.videos || []),
                    ...(session.playlists || []).flatMap(playlist =>
                        (playlist.videos || [])
                    )
                ]
            ).map(video => [video.videoId, video])).values()): [];

    const handleVideoSelect = (videoId) => {
        setSelectedVideos(prevSelectedVideos => {
            if (prevSelectedVideos.includes(videoId)) {
                // Si el video ya está seleccionado, lo removemos
                return prevSelectedVideos.filter(id => id !== videoId);
            } else {
                // Si no está seleccionado, lo agregamos
                return [...prevSelectedVideos, videoId];
            }
        });
    };
    
    const handleCrearLista = async () => {
        if (formValues.tituloPlaylist.trim() === '') {
            warn('Por favor, ingresa un nombre para la lista.');
            return;
        }
        try {
            const videoIdsString = selectedVideos.join(',');
            await crearPlaylist(idCanal, videoIdsString, '',formValues.tituloPlaylist);
            // Opcional: puedes resetear el formulario si lo deseas
            setFormValues({ tituloPlaylist: '' });
            
            closeCrearListaModal();
            
            await GetLiveSessionArchive();
        } catch (error) {
            console.error('Error al crear la lista:', error);
            
        }
    };

    const handlePlaylistSelection = (playlistId) => {
      setSelectedPlaylistForEdit(playlistId);
    
      // Encontrar la playlist seleccionada en 'archivos'
      const selectedPlaylist = archivos
        .flatMap(session => session.playlists || [])
        .find(playlist => playlist.playlistId === playlistId);
    
      if (selectedPlaylist) {
        // Obtener los IDs de los videos en la playlist
        const videoIds = (selectedPlaylist.videos || []).map(video => video.videoId);
        setSelectedVideos(videoIds);
      } else {
        // Si no se encuentra la playlist, limpiar la selección
        setSelectedVideos([]);
      }
    };

    /*const handleEditarLista = async () => {
      if (!selectedPlaylistForEdit) {
        warn('Por favor, selecciona una lista de reproducción.');
        return;
      }
    
      try {
        const videoIdsString = selectedVideos.join(',');
        // Llamar a la función para editar la playlist con los videos seleccionados
        await editarPlaylist(idCanal, videoIdsString, selectedPlaylistForEdit,'');
    
        // Limpiar el formulario y la selección
        setSelectedVideos([]);
        setSelectedPlaylistForEdit(null);
        closeEditarListaModal();
    
        // Actualizar los datos
        //await GetLiveSessionArchive();
      } catch (error) {
        console.error('Error al editar la lista:', error);
      }
    };*/

    const handleSelectPlaylist = () => {
        if (!selectedPlaylistForEdit) {
            warn('Por favor, selecciona una lista de reproducción.');
            return;
        }
    
        // Obtener los videos de la lista seleccionada
        const selectedPlaylist = archivos
            .flatMap(session => session.playlists || [])
            .find(playlist => playlist.playlistId === selectedPlaylistForEdit);
    
        if (selectedPlaylist) {
            const videoIds = (selectedPlaylist.videos || []).map(video => video.videoId);
            setSelectedVideos(videoIds);
            setMostrarCheckboxes(true); // Mostrar los checkboxes
        } else {
            setSelectedVideos([]);
            setMostrarCheckboxes(false);
        }
    };
    
    const handleGuardarCambios = async () => {
        if (!selectedPlaylistForEdit) {
            warn('Por favor, selecciona una lista de reproducción.');
            return;
        }
    
        try {
            const videoIdsString = selectedVideos.join(',');
            await editarPlaylist(idCanal, videoIdsString, selectedPlaylistForEdit, '');
    
            // Limpiar la selección y cerrar el modal
            setSelectedVideos([]);
            setSelectedPlaylistForEdit(null);
            setMostrarCheckboxes(false);
            closeEditarListaModal();
    
            // Actualizar los datos
            //await GetLiveSessionArchive();
            //success('Lista de reproducción actualizada exitosamente.');
        } catch (error) {
            console.error('Error al editar la lista:', error);
            warn('Hubo un error al actualizar la lista de reproducción.');
        }
    };

     const zIndexValue = openSelectId ? "10" : "0";

    
    const cambiarPagina = (nuevaPagina) => {
        setFiltros({ ...filtros, pagina: nuevaPagina });
    };

    
    return (
        <>
            <div className="grid grid-row-2 gap-4 w-full">
                <div className="grid grid-row-2" id="filtros">
                    <span className="text-extra font-semibold text-gris-azulado-profundo flex flex-col lg:flex-row lg:text-left dark:text-blanco ">
                        {t('listaContenido')}
                        <div className="hidden lg:ms-auto lg:flex lg:items-end gap-[5px]">
                            <IconosCanal icono={isCuadricula ? "vistaLista" : "vistaGrid"} className="dark:!hidden icono-semi-md cursor-pointer" onClick={handleLista} />
                            <IconosCanal icono={isCuadricula ? "vistaListaDark" : "vistaGridDark"} className="!hidden dark:!block icono-semi-md cursor-pointer" onClick={handleLista} />

                        </div>
                    </span>
                    <div className="relative my-[20px] lg:h-[50px] ">
                        
                    {/*<div className={`flex flex-col gap-[12px] lg:absolute lg:z-[${zIndexValue}] lg:flex-wrap lg:flex-row md:justify-center lg:justify-start lg:mb-[27px]`}>*/}
                    
                    <div className="flex flex-col gap-[12px] lg:absolute lg:z-[10] lg:flex-wrap lg:flex-row md:justify-center lg:justify-start lg:mb-[27px]" style={{ zIndex: 10 }}>   
                        <SelectLista
                            id="listareproduccion"
                            isOpen={openSelectId === "listareproduccion"}
                            onToggle={toggleDropdown}
                            defaultValue="-"
                            opciones={[
                                ...(archivos && archivos.length > 0
                                ? archivos.flatMap((session) =>
                                      (session.playlists || []).map((playlist) => ({
                                          value: playlist.playlistName,
                                          label: playlist.playlistName || t("sinNombre"),
                                      }))
                                  )
                                : []),
                                { value: "-", label: t("listaReproduccion") },
                            ]}
                            onChange={(value) => setFiltros({ ...filtros, lista_seleccionada: value, pagina: 1 })}
                        />

                        <SelectLista
                            id="orden"
                            isOpen={openSelectId === "orden"}
                            onToggle={toggleDropdown}
                            defaultValue="-"
                            opciones={[
                                { value: "fecha_asc", label: t("fechaAscendente") },
                                { value: "fecha_desc", label: t("fechaDescendente") },
                                { value: "-", label: t("ordenarPor") },
                            ]}
                            onChange={(value) => setFiltros({ ...filtros, orden: value, pagina: 1})}
                        />

                        <SelectLista
                            id="dificultad"
                            isOpen={openSelectId === "dificultad"}
                            onToggle={toggleDropdown}
                            defaultValue="-"
                            opciones={[
                                ...dificultad.map(tag => ({
                                    value: tag.value,
                                    label: tag.label,
                                })),
                                { value: "-", label: t("dificultad") },
                            ]}
                            onChange={(value) => setFiltros({ ...filtros, dificultad: value, pagina: 1 })}
                        />
                        
                        <div className="md:min-w-[230px] lg:min-w-[230px] flex items-start gap-[16px]">
                            
                            <div className="flex mt-3 gap-[5px]" onClick={openModalArchivos}>
                                <IconosCanal icono="folder_abierto" className="dark:hidden w-[20px] h-[20px] !p-0" />
                                <CarpetaAbiertaDark className="!hidden dark:!block"/>
                                <button className="text-medium font-medium dark:text-blanco " >{t('archivos')}</button>
                            </div>
                                
                                {permisoInstructor &&  (
                                    <>
                                        <div className="flex mt-3 gap-[5px]" onClick={openCrearListaModal}>
                                            <CrearLista  className="dark:hidden w-[20px] h-[20px] !p-0" />
                                            <CarpetaAbiertaDark className="!hidden dark:!block"/>
                                            <button className="text-medium font-medium dark:text-blanco " >{t('crearLista')} </button>
                                        </div>
                                        
                                        <div className="flex mt-3 gap-[5px]" onClick={openEditarListaModal}>
                                            <CrearLista  className="dark:hidden w-[20px] h-[20px] !p-0" />
                                            <CarpetaAbiertaDark className="!hidden dark:!block"/>
                                            <button className="text-medium font-medium dark:text-blanco " >{t('editarLista')} </button>
                                        </div>
                                    </>
                            
                                )} 
                                
                                {isCrearListaModalOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center z-[200] dark:text-white">
                                        <div 
                                            className="fixed inset-0 bg-gray-900 opacity-90 z-[190]" 
                                            onClick={closeCrearListaModal}
                                        ></div>
                                        <div className="relative bg-white dark:bg-color-dark2 p-4 z-[200] w-full max-w-4xl 2xl:max-w-[75em] overflow-y-auto max-h-[80vh] rounded-[20px]">
                                            <button 
                                                className="absolute top-4 right-4 text-black"
                                                onClick={closeCrearListaModal}
                                            >
                                                <IconosProgramacion icono="Cerrar" className="icono-semi-md"/>
                                            </button>
                                            <h2 className="text-extra font-semibold text-color-gris-azulado-profundo">{t('crearLista')}</h2>
                                            
                                            <div className="flex flex-row justify-start items-center pt-3 pr-3 gap-3 mb-[20px]">
                                                <p className="">Nombre de la lista:</p>
                                                <div className="w-[550px]">
                                                    <Input
                                                        type="text"
                                                        placeholder=""
                                                        name="tituloPlaylist"
                                                        value={formValues.tituloPlaylist}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <button className="boton-primario" onClick={handleCrearLista}>{t('Aceptar')}</button>
                                            </div>
                                            
                                            <div className={`${isCuadricula ? CUADRICULA : LISTA} px-6`}>
                                                {/*{allVideos.map(video => {*/}
                                                {ordenarVideos(allVideos, filtros.orden).map((video) => {
                                                    const associatedPlaylist = Array.isArray(archivos) ? archivos.flatMap(session => Array.isArray(session.playlists)
                                                        ? session.playlists : []
                                                    ).find(playlist => Array.isArray(playlist.videos) ? playlist.videos.some(v => v.videoId === video.videoId)
                                                        : false)
                                                    : null;
                                                    const selectedPlaylistId = associatedPlaylist ? associatedPlaylist.playlistId : null;
                                                    const selectedTag = video.tags?.length ? video.tags[0].tagId : null;
                                                    const isSelected = selectedVideos.includes(video.videoId);
                                                    const isCuadriculaModal = true; // Forzamos el modo cuadrícula en el modal
                    
                                                    return (
                                                        <div
                                                            className={"min-width[300px] w-[100%] cursor-pointer group relative " + (isCuadriculaModal ? "" : " lg:flex lg:gap-[26px] p-[16px]  border-b border-b-solid")}
                                                            key={`video-${video.videoId}`}
                                                            onClick={() => handleVideoSelect(video.videoId)}
                                                        >
                                                            {/* Checkbox de selección */}
                                                            <input
                                                                type="checkbox"
                                                                checked={isSelected}
                                                                onChange={(e) => {
                                                                    e.stopPropagation();
                                                                    handleVideoSelect(video.videoId);
                                                                }}
                                                                className="absolute top-2 left-2 z-10 w-5 h-5"
                                                            />
                    
                                                            {/* Tu estructura de video */}
                                                            <div className="relative group">
                                                                <img
                                                                    src={`${video.videoPortada || imgStreamingEspera}`}
                                                                    className={
                                                                        "aspect-video object-cover rounded-[20px] " +
                                                                        (isCuadriculaModal
                                                                            ? "w-[100%] "  // Estilo para cuadrícula
                                                                            : "w-[100%] lg:w-[210px] lg:h-[118px] ")  // Estilo para lista
                                                                    }
                                                                    alt={video.videoTitle}
                                                                />
                                                            </div>
                    
                                                            <div className={"flex flex-col" + (isCuadriculaModal ? "" : " w-full justify-center gap-[5px]")}>
                                                                <div className="flex gap-[5px] items-center">
                                                                    <IconosCanal icono="circulo_naranja" className="w-[10px] h-[10px] !p-0" />
                                                                    <span className={"text-ellipsis overflow-hidden whitespace-nowrap font-bold dark:text-blanco " + (isCuadriculaModal ? "text-medium" : "text-largeB")}>
                                                                        {video.videoTitle}
                                                                    </span>
                                                                </div>
                                                                <div className={"flex " + (isCuadriculaModal ? "pb-[10px] justify-between" : "flex-row gap-[65px] items-center")}>
                                                                    <span className={"text-ellipsis overflow-hidden lg:w-[90px] xl:w-auto whitespace-nowrap text-medium dark:text-blanco " + (isCuadriculaModal ? "me-auto" : "text-gris-oscuro")}>
                                                                        {instructor?.instructorName}
                                                                    </span>
                                                                    <span className={"text-end flex gap-[9px] lg:gap-[5px] 2xl:gap-[9px] items-center dark:text-blanco  " + (isCuadriculaModal ? "text-small" : "text-medium text-gris-oscuro")}>
                                                                        <IconosCanal icono="calendario_hoy" className={"dark:!hidden !p-0 ms-auto " + (isCuadriculaModal ? "w-[15px] h-[15px]" : "icono-semi-md")} />
                                                                        <IconosCanal icono="calendario_hoy_dark" className={"!hidden dark:!block !p-0 ms-auto " + (isCuadriculaModal ? "w-[15px] h-[15px]" : "icono-semi-md")} />
                                                                        {video.videoCreatedDate}
                                                                    </span>
                                                                </div>
                                                                <div className={isCuadriculaModal ? "hidden" : "flex text-small dark:text-blanco"}>
                                                                    {video.videoDescription}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                )}
                
                                {/* Modal para editar lista */}
                                {isEditarListaModalOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center z-[3000] dark:text-white">
                                        {/* Fondo Oscuro del Modal */}
                                        <div 
                                            className="fixed inset-0 bg-gray-900 opacity-90" 
                                            onClick={closeEditarListaModal}
                                        ></div>
                                        
                                        {/* Contenido del Modal */}
                                        <div className="relative bg-white dark:bg-color-dark2 p-4 z-50 w-full max-w-4xl 2xl:max-w-[75em] overflow-y-auto max-h-[80vh] rounded-[20px]">
                                            {/* Botón de Cerrar Modal */}
                                            <button 
                                                className="absolute top-4 right-4 text-black"
                                                onClick={closeEditarListaModal}
                                            >
                                                <IconosProgramacion icono="Cerrar" className="icono-semi-md"/>
                                            </button>
                                            
                                            {/* Título del Modal */}
                                            <h2 className="mb-2 text-extra font-semibold text-color-gris-azulado-profundo dark:text-white">
                                                {t('Editar lista de videos')}
                                            </h2>
                                            
                                            {/* Selección de Lista de Reproducción y Botón "Seleccionar" */}
                                            <div className="flex flex-row gap-3 pt-3 mb-[20px] items-start z-[10]" style={{ zIndex: 10 }}>
                                                <div className="relative w-[300px]">
                                                    <SelectLista
                                                            id="listareproduccionModal"
                                                            isOpen={openSelectIdModal === 'listareproduccionModal'}
                                                            onToggle={toggleDropdownModal}
                                                            defaultValue="-"
                                                            opciones={[
                                                                ...(archivos && archivos.length > 0
                                                                    ? archivos.flatMap((session) =>
                                                                        (session.playlists || []).map((playlist) => ({
                                                                            value: playlist.playlistId.toString(),
                                                                            label: playlist.playlistName || t('sinNombre'),
                                                                        }))
                                                                    )
                                                                    : []),
                                                                { value: '-', label: t('listaReproduccion') },
                                                            ]}
                                                            onChange={(value) => {
                                                                if (value === '-') {
                                                                    setSelectedPlaylistForEdit(null);
                                                                    setSelectedVideos([]);
                                                                    setMostrarCheckboxes(false);
                                                                } else {
                                                                    setSelectedPlaylistForEdit(parseInt(value));
                                                                }
                                                            }}
                                                        />
                                                </div>
                                                
                                                {/* Botón "Seleccionar" */}
                                                <button
                                                    className="boton-primario"
                                                    onClick={handleSelectPlaylist}
                                                    disabled={!selectedPlaylistForEdit}
                                                >
                                                    {t('seleccionar')}
                                                </button>
                                            </div>
                                            
                                            {/* Mostrar Checkboxes y Botón "Guardar" si se ha seleccionado una lista */}
                                            {selectedPlaylistForEdit && mostrarCheckboxes && (
                                                <>
                                                <div className={`${isCuadricula ? CUADRICULA : LISTA} px-6`}>
                                                    {/*{allVideos.map(video => {*/}
                                                    {ordenarVideos(allVideos, filtros.orden).map((video) => {
                                                        const isSelected = selectedVideos.includes(video.videoId);
                                                        const isCuadriculaModal = true; // Forzamos el modo cuadrícula en el modal
                                                        
                                                        return (
                                                            <div
                                                                className={"min-width[300px] w-[100%] cursor-pointer group relative " + (isCuadriculaModal ? "" : " lg:flex lg:gap-[26px] p-[16px]  border-b border-b-solid")}
                                                                key={`video-${video.videoId}`}
                                                                onClick={() => handleVideoSelect(video.videoId)}
                                                            >
                                                                {/* Checkbox de selección */}
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isSelected}
                                                                    onChange={(e) => {
                                                                        e.stopPropagation();
                                                                        handleVideoSelect(video.videoId);
                                                                    }}
                                                                    className="absolute top-2 left-2 z-10 w-5 h-5"
                                                                />
                                
                                                                {/* Imagen del Video */}
                                                                <div className="relative group">
                                                                    <img
                                                                        src={`${video.videoPortada || imgStreamingEspera}`}
                                                                        className={
                                                                            "aspect-video object-cover rounded-[20px] " +
                                                                            (isCuadriculaModal
                                                                                ? "w-[100%] "
                                                                                : "w-[100%] lg:w-[210px] lg:h-[118px] ")
                                                                        }
                                                                        alt={video.videoTitle}
                                                                    />
                                                                </div>
                                
                                                                {/* Información del Video */}
                                                                <div className={"flex flex-col" + (isCuadriculaModal ? "" : " w-full justify-center gap-[5px]")}>
                                                                    <div className="flex gap-[5px] items-center">
                                                                        <IconosCanal icono="circulo_naranja" className="w-[10px] h-[10px] !p-0" />
                                                                        <span className={"text-ellipsis overflow-hidden whitespace-nowrap font-bold dark:text-blanco " + (isCuadriculaModal ? "text-medium" : "text-largeB")}>
                                                                            {video.videoTitle}
                                                                        </span>
                                                                    </div>
                                                                    <div className={"flex " + (isCuadriculaModal ? "pb-[10px] justify-between" : "flex-row gap-[65px] items-center")}>
                                                                        <span className={"text-ellipsis overflow-hidden lg:w-[90px] xl:w-auto whitespace-nowrap text-medium dark:text-blanco " + (isCuadriculaModal ? "me-auto" : "text-gris-oscuro")}>
                                                                            {instructor?.instructorName}
                                                                        </span>
                                                                        <span className={"text-end flex gap-[9px] lg:gap-[5px] 2xl:gap-[9px] items-center dark:text-blanco " + (isCuadriculaModal ? "text-small" : "text-medium text-gris-oscuro")}>
                                                                            <IconosCanal icono="calendario_hoy" className={"dark:!hidden !p-0 ms-auto " + (isCuadriculaModal ? "w-[15px] h-[15px]" : "icono-semi-md")} />
                                                                            <IconosCanal icono="calendario_hoy_dark" className={"!hidden dark:!block !p-0 ms-auto " + (isCuadriculaModal ? "w-[15px] h-[15px]" : "icono-semi-md")} />
                                                                            {video.videoCreatedDate}
                                                                        </span>
                                                                    </div>
                                                                    <div className={isCuadriculaModal ? "hidden" : "flex text-small dark:text-blanco"}>
                                                                        {video.videoDescription}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                
                                                </div>
                                                {/* Botón "Guardar" */}
                                                <div className="flex justify-end mt-4">
                                                    <button
                                                        className="boton-primario"
                                                        onClick={handleGuardarCambios}
                                                        disabled={!selectedPlaylistForEdit}
                                                    >
                                                        {t('btnSave')}
                                                    </button>
                                                </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}


                            </div>
                        </div>
                    </div>
                </div>
                <div className={isCuadricula ? CUADRICULA : LISTA}>
                        {Array.isArray(videosFiltrados) && videosFiltrados.map(video => {
                            const associatedPlaylists = Array.isArray(archivos)
                            ? archivos.flatMap(session =>
                                (session.playlists || []).filter(playlist =>
                                  (playlist.videos || []).some(v => v.videoId === video.videoId)
                                )
                              )
                            : [];
            
                            //const selectedPlaylistId = associatedPlaylists.map(playlist => playlist.playlistId);
                            const selectedPlaylistId = associatedPlaylists.length > 0 ? associatedPlaylists[0].playlistId : null;

                            const selectedTag = video.tags?.length ? video.tags[0].tagId : null;
                            const handleClick = () => {
                                setSelectedVideo(video);
                                setIsModalOpen(true);
                            };

                        return (
                        <>
                        
                        
                            
                        <div className={ "min-width[300px] w-[100%] cursor-pointer group relative " + (isCuadricula ? ""  // No aplicar hover opacity en modo cuadrícula
                        : " lg:flex lg:gap-[26px] p-[16px]  border-b border-b-solid" + (permisoInstructor ? " hover:bg-[#cfcfd161] hover:opacity-70" : "") )} 
                        key={`video-${video.videoId}`}
                         onClick={() => handleVideoClick(video)}>
                                <div className="relative group">
                                    <img
                                        src={`${video.videoPortada || imgStreamingEspera}`}
                                        className={
                                            "aspect-video object-cover rounded-[20px] " + 
                                            (isCuadricula 
                                                ? "w-[100%] "  // Estilo para cuadrícula
                                                : "w-[100%] lg:w-[210px] lg:h-[118px] ")  // Estilo para lista
                                        }
                                        alt={video.videoTitle}
                                    />
                            
                                    
                                    {permisoInstructor && isCuadricula && (
                                    
                                            <div className={"absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 ease-in-out rounded-[20px]"}>
                                              <div className="relative bg-black bg-opacity-80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                                <Edit  className="icono-sm group-hover:!text-white" onClick={(e) => {e.stopPropagation(); handleClick(); }} />
                                              </div>
                                            </div>
                                     )}
                                </div>

                                <div className={"flex flex-col" + (isCuadricula ? "" : " w-full justify-center gap-[5px]")}>
                                    <div className="flex gap-[5px] items-center">
                                        <IconosCanal icono="circulo_naranja" className="w-[10px] h-[10px] !p-0" />
                                        <span className={"text-ellipsis overflow-hidden whitespace-nowrap font-bold dark:text-blanco " + (isCuadricula ? "text-medium" : "text-largeB")}>
                                            {video.videoTitle}
                                        </span>
                                    </div>
                                    <div className={"flex " + (isCuadricula ? "pb-[10px] justify-between" : "flex-row gap-[65px] items-center")}>
                                        <span className={"text-ellipsis overflow-hidden lg:w-[90px] xl:w-auto whitespace-nowrap text-medium dark:text-blanco " + (isCuadricula ? "me-auto" : "text-gris-oscuro")}>
                                            {instructor?.instructorName}
                                        </span>
                                        <span className={"text-end flex gap-[9px] lg:gap-[5px] 2xl:gap-[9px] items-center dark:text-blanco  " + (isCuadricula ? "text-small" : "text-medium text-gris-oscuro")}>
                                            {permisoInstructor && isCuadricula && (
                                                <div className="absolute right-[5rem] " onClick={(e) => handleDeshabilitarVideo(video.videoId,e)}>
                                                    <Iconos icono="eliminar"  className="dark:hidden w-[15px] h-[15px] !p-0 z-9"/>
                                                    <Iconos icono="Eliminar_white" className="hidden dark:block  w-[15px] h-[15px] !p-0"/>
                                                </div>
                                            )}
                                            
                                            <IconosCanal icono="calendario_hoy" className={"dark:!hidden !p-0 ms-auto " + (isCuadricula ? "dark:!hidden w-[15px] h-[15px]" : "icono-semi-md")} />
                                            <IconosCanal icono="calendario_hoy_dark" className={"!hidden dark:!block !p-0 ms-auto " + (isCuadricula ? "!hidden dark:!block w-[15px] h-[15px]" : "icono-semi-md")} />
                                            {video.videoCreatedDate}
                                        </span>
                                    </div>
                                    <div className={isCuadricula ? "hidden" : "flex text-small dark:text-blanco"}>
                                        {video.videoDescription}
                                    </div>
                                </div>

    
                                {!isCuadricula && permisoInstructor && (
                                    <>
                                        <div className="flex flex-col justify-center">
                                            <EditLista className="dark:hidden mr-[20px] opacity-0 group-hover:!text-white  group-hover:opacity-100 transition-opacity duration-300 ease-in-out" onClick={(e) => { e.stopPropagation(); handleClick(); }} />
                                            <Edit className="hidden dark:block mr-[20px] opacity-0 group-hover:!text-white  group-hover:opacity-100 transition-opacity duration-300 ease-in-out" onClick={(e) => { e.stopPropagation(); handleClick(); }} />
                                            
                                            <Iconos icono="eliminar"  className="dark:hidden mr-[20px] opacity-0 group-hover:!text-white  group-hover:opacity-100 transition-opacity duration-300 ease-in-out"  />
                                            <Iconos icono="Eliminar_white" className="hidden dark:block mr-[20px] opacity-0 group-hover:!text-white  group-hover:opacity-100 transition-opacity duration-300 ease-in-out"  />
                                        </div>
                                    </>
                                )}
                        </div>



                            
                        <ModalClase 
                            isOpen={isModalOpen && selectedVideo?.videoId === video.videoId} 
                            onClose={handleClose}
                            videoId={video.videoId}
                            playlistId={selectedPlaylistId}
                            portadaVideo={`${video.videoPortada || imgStreamingEspera }`} 
                            videoTitle={video.videoTitle}
                            videoDescription={video.videoDescription}
                            playlist={listaReproduccionOptions}
                            tags={listaTagOptions}
                            tagVideo={selectedTag}
                            selectedPlaylist={selectedPlaylistId}
                            setArchivo={setArchivo}
                            fecha={video.videoCreatedDateComplete}
                            GetLiveSessionArchive={GetLiveSessionArchive}
                        />
                        </>
                        );
                    })}
                    
                </div>
                
                {/* Paginación */}
                {totalPaginas > 1 && (
                    <div className="pagination items-center flex gap-3 justify-center">
                        <div onClick={() => cambiarPagina(filtros.pagina > 1 ? filtros.pagina - 1 : 1)} className={`cursor-pointer flex gap-1 ${filtros.pagina === 1 ? 'text-gray-400' : 'text-black dark:text-blanco '}`}>
                            <FlechaIzPag className="w-[24px] h-[24px] !p-0 dark:!hidden" />
                            <FlechaIzPagDark className="w-[24px] h-[24px] !p-0 transform rotate-180 !hidden dark:!block"  />
                            
                            <p>{t('btnAtras')} </p>
                        </div>
                        
                        <div className="flex items-center border-[1px] border-[#EDECEE] rounded-[4px] p-1">
                            <span className="pagination-number flex cursor-pointer gap-2 dark:text-blanco">
                                {filtros.pagina}
                                {isDropdownPagOpen ? (
                                        <>
                                            <FlechaArriba 
                                                className="w-[24px] h-[24px] !p-0 dark:!hidden" 
                                                onClick={() => setIsDropdownPagOpen(false)} 
                                            />
                                            
                                            <FlechaArribaWhite className="w-[24px] h-[24px] !p-0 !hidden dark:!block" 
                                                onClick={() => setIsDropdownPagOpen(false)}  />
                                        </>
                                    ) : (
                                    <>
                                        <FlechaAbajo 
                                            className="w-[24px] h-[24px] !p-0 dark:!hidden" 
                                            onClick={() => setIsDropdownPagOpen(true)} 
                                        />
                                        
                                        <FlechaAbajoWhite className="w-[24px] h-[24px] !p-0 !hidden dark:!block" 
                                                onClick={() => setIsDropdownPagOpen(true)} />
                                    </>
                                    )}
                            </span>
                        </div>
                        
                        {isDropdownPagOpen && (
                                <div className="absolute mt-[13em] w-32 bg-white dark:bg-color-dark2 border border-[#EDECEE]  rounded shadow-lg  z-10">
                                    <ul className="list-none p-2 max-h-40 overflow-y-auto">
                                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                                            <li 
                                                key={pagina} 
                                                className={`p-2 flex justify-center cursor-pointer dark:text-blanco hover:bg-gray-200 dark:hover:bg-[#e5e7eb26]  ${pagina === filtros.pagina ? 'font-bold dark:text-blanco' : ''}`}
                                                onClick={() => seleccionarPagina(pagina)}
                                            >
                                                <p className="dark:text-blanco">{pagina}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        
                        
                        <div onClick={() => cambiarPagina(filtros.pagina < totalPaginas ? filtros.pagina + 1 : totalPaginas)} className={`flex gap-1 cursor-pointer ${filtros.pagina === totalPaginas ? 'text-gray-400 dark:text-blanco' : 'text-black dark:text-blanco'}`}>
                            <p>{t('btnSig')}</p>
                            <FlechaIzPag className="w-[24px] h-[24px] !p-0 transform rotate-180 dark:!hidden  " />
                            <FlechaIzPagDark className="w-[24px] h-[24px] !p-0 !hidden dark:!block"  />
                        </div>
                    </div>
                )}

                
            </div>
            
            {modalVisible &&  (
                <div className="fixed inset-0 flex items-center justify-center z-[5000]">
                    <div 
                        className="fixed inset-0 bg-gray-900 opacity-90" 
                        onClick={closeModal}
                    ></div>
                    <div className="relative shadow-lg z-50 w-full max-w-4xl overflow-hidden ">
                        <div className="relative w-full h-0 pb-[56.25%]">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`${selectedVideo.videoUrl}?controls=1`}
                                title={selectedVideo.videoTitle}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <button 
                                className="absolute top-4 right-4 text-black"
                                onClick={closeModal}
                            >
                                <IconosProgramacion icono="Cerrar" className="icono-semi-md"/>
                            </button>
                        </div>
                        
                        
                    </div>
                </div>
            )}
            
            {modalArchivosVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-[4000] ">
                    <div 
                        className="fixed inset-0 bg-gray-900 opacity-90 " 
                        onClick={closeModalArchivos}
                    ></div>
                    
                    <div className="relative bg-white dark:bg-color-dark2  z-50 w-full max-w-4xl 2xl:max-w-[75em] overflow-y-auto max-h-[80vh] rounded-[20px]">
                        
                        <button 
                            className="absolute top-4 right-4 text-black"
                            onClick={closeModalArchivos}
                        >
                            <IconosProgramacion icono="Cerrar" className="dark:hidden icono-semi-md"/>
                            <IconosProgramacion icono="Cerrar_blanco" className="hidden dark:block icono-semi-sm"/>
                        </button>
                        
                        {permisoInstructor ? (
                            <SeccionDocumentosEducador materials={liveMaterials} errorMaterials={error} titleMaterials={t('Archivos de la clase')} channelId={idCanal} sessionId={sessionId} GetLiveMaterials={GetLiveMaterials} setLiveMaterials={setLiveMaterials}/>
                        ) : (
                            <SeccionDescarga materials={liveMaterials} errorMaterials={error} titleMaterials={t('archivosClase')} permisoInstructor={permisoInstructor} xlGridCols="9" idCurso={idCurso} defaultExpanded="true"  showIconsWhenNoDocuments={false} />
                        )}
                        
                    </div>
                </div>
            )}
        </>
    );
}

export default Listas;

