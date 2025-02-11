import React, { useState,useEffect } from 'react';
import Iconos from '../../iconos/iconos';
import { useTranslation } from 'react-i18next';

const ProductosCarrito = ({nombre,nombreAcademia,descripcion,accionEliminar,id_prod,prod_txt_status,tag,isTool,isValid}) => {

const [hide,setHide] = useState(false)
const { t,i18n } = useTranslation();
const currentLanguage = (localStorage.getItem('language') || 'es').toUpperCase();
const handleEliminar = (event) => {
    // setHide(true)
    accionEliminar(event)
}


return(
    <>
        <div className={"flex bg-gris-claro dark:bg-color-dark2 dark:text-blanco w-full rounded-2xl items-center min-h-[60px] p-4 mb-3 gap-4 " + ((hide) ? "hidden" : "")}>
            <div className="flex flex-col flex-1 break-words overflow-auto">
                <span className="text-largeB font-semibold">{nombre}</span>
                <span className="text-medium font-medium text-gris-oscuro">{isTool ? `${t('nombreHerramienta')} ${nombreAcademia}` : t("academia")}</span>
                <span className="text-medium font-medium text-gris-oscuro">{(descripcion ? JSON.parse(descripcion)[currentLanguage.toUpperCase()] : "")}</span>
                {(prod_txt_status == "inactive" ||  tag == 0 || !isValid )  ?
                <span className="text-large me-auto text-red"> {t('productoNoDisponible')} </span>
                : ""}
            </div>
            <button className="rounded-full boton-primario !p-0 ms-auto dark:boton-secundario " onClick={handleEliminar} id_prod={id_prod}>
                <div className="h-[30px] w-[30px] flex items-center justify-center" ><Iconos icono={"Eliminar_white"} className={"icono-semi-sm dark:!hidden"}/><Iconos icono={"eliminar"} className={"icono-semi-sm !hidden dark:!block"}/></div>
            </button>
        </div>
    </>
    
    )
}

export default ProductosCarrito