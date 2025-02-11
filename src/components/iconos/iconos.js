import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  Iconos  = ({icono, className, onClick }) => {
  
  let src = ""
  let alt = ""
  
  switch(icono){
        case "Cerrar":
            src="close.svg"
            alt="Cerrar"
            break;
        case "Cerrar_blanco":
            src="close_white.svg"
            alt="Cerrar"
            break;    
        case "subir_archivo":
            src="upload.svg"
            alt="subir archivo"
            break;
        case "check_verde":
            src="CheckVerde.svg"
            alt="Check Exito"
            break;
        case "circulo_naranja":
            src="circle_orange.svg"
            alt="circulo naranja"
            break;
        case "calendario_hoy":
            src="calendar_today.svg"
            alt="Fecha"
            break;
         case "calendario_hoy_dark":
            src="calendar_today_dark.svg"
            alt="Fecha"
            break;    
        case "folder_abierto":
            src="folder_open.svg"
            alt="Archivos"
            break;
        case "folder_abierto_dark":
            src="folder_open_dark.svg"
            alt="Archivos"
            break;     
        case "estrella":
            src="star.svg"
            alt="Estrella"
            break;
        case "estrella_llena":
            src="star_fill.svg"
            alt="Estrella rellena"
            break;
        case "chevron_izq":
            src="chevron_left.svg"
            alt="Izquierda"
            break;
        case "chevron_der":
            src="chevron_right.svg"
            alt="Derecha";
            break;
        case "EnVivo":
            src="en_vivo.svg"
            alt="En vivo"
            break;
        case "calendarAdd":
            src="calendar_add_on.svg"
            alt="Agendar";
            break;
        case "reloj":
            src="nest_clock_farsight_analog.svg"
            alt="reloj";
            break;
        case "flechaDer":
            src="arrow_forward.svg"
            alt="Izquierda";
            break;
        case "flechaIzq":
            src="arrow_back.svg"
            alt="Derecha";
            break;
        case "likePlata":
            src="like_plata.svg"
            alt="Like Plata";
            break;
        case "flechaDerCircle":
            src="arrow_circle_right.svg"
            alt="Flecha derecha circular";
            break;
        case "flechaIzqCircle":
            src="arrow_circle_left.svg"
            alt="Flecha izquierda circular";
            break;
        case "fuegoNegro":
            src="fuego_negro.svg"
            alt="Fuego Negro";
            break;
        case "fuegoBlanco":
            src="icono_fuego_blanco.svg"
            alt="Fuego Blanco";
            break;
        case "corazonBlanco":
            src="corazon_blanco.svg"
            alt="Corazón Blanco";
            break;
        case "corazonRojo":
            src="corazon_rojo.svg"
            alt="Corazón Rojo";
            break;
        case "eliminar":
            src="delete.svg"
            alt="Eliminar";
            break;
        case "vistaLista":
            src="format_list_bulleted.svg"
            alt="Lista";
            break;
        case "vistaListaDark":
            src="format_list_dark.svg"
            alt="Lista";
            break;
        case "vistaGrid":
            src="grid_view.svg"
            alt="Grid";
            break;
        case "vistaGridDark":
            src="vista_grilla_dark.svg"
            alt="Grid";
            break;    
        case "flechaAbajo":
            src="expand_more.svg"
            alt="Flecha Abajo";
            break;
        case "menu":
            src="menu.svg"
            alt="Logo Menu";
            break;
        case "menuWhite":
            src="menu_white.svg"
            alt="Logo Menu Blanco";
            break;
        case "reloj":
            src="schedule_white.svg"
            alt="Logo Reloj";
            break;
        case "reloj_dark":
            src="reloj_dark.svg"
            alt="Logo Reloj blanco";
            break;    
        case "enVivo":
            src="en_vivo.svg"
            alt="Logo Vivo";
            break;
        case "edit":
            src="edit_pen.svg"
            alt="Lapiz editar";
            break;
        case "Eliminar_white":
            src="delete_white.svg";
            alt="Eliminar";
            break;
        case "FlechaBlanco":
            src="FlechaDerBlanco.svg";
            alt="Flecha derecha";
            break;
        case "ErrorOn":
            src="ErrorOn.svg"
            alt="Error"
            break;
        case "ErrorOff":
            src="ErrorOff.svg"
            alt="Error"
            break;
        case "imagen1":
            src="imagen1.svg"
            alt="imagen"
            break;
        case "imagen2":
            src="imagen2.svg"
            alt="imagen"
            break;
        case "descarga_imagen":
            src="descarga_imagen.svg"
            alt="descarga_imagen"
            break;
        case "descarga_imagen_dark":
            src="descarga_imagen_dark.svg"
            alt="descarga_imagen_dark"
            break;    
        case "descarga_documento":
            src="descarga_documento.svg"
            alt="descarga_documento"
            break;
        case "descarga_documento_dark":
            src="descarga_documento_dark.svg"
            alt="descarga_documento_dark"
            break;    
        case "descarga_pdf":
            src="descarga_pdf.svg"
            alt="descarga_pdf"
            break;
        case "descarga_pdf_dark":
            src="descarga_pdf_dark.svg"
            alt="descarga_pdf_dark"
            break;    
        case "descarga_excel":
            src="descarga_excel.svg"
            alt="descarga_excel"
            break;
        case "descarga_excel_dark":
            src="descarga_excel_dark.svg"
            alt="descarga_excel_dark"
            break;    
        case "descarga_word":
            src="descarga_word.svg"
            alt="descarga_word"
            break;
         case "descarga_word_dark":
            src="descarga_word_dark.svg"
            alt="descarga_word_dark"
            break;    
        case "info":
            src="info.svg"
            alt="info"
            break;
        case "iconCheckLogros":
            src="IconCheckLogros.svg"
            alt="IconCheckLogros"
            break;
  }

  return (
  <SvgIcon 
        src={"/assets/iconos/"+src} 
        alt={alt}
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />)
    
}

export default Iconos