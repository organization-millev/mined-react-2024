import React, { useState,useEffect } from 'react';
import Iconos from '../../iconos/iconos';
import { useTranslation } from 'react-i18next';
import Modal from '../../common/Modal/Modal'


const CarritoEliminarModal = ({mostrarModalFinal,cerrarModal,accionEliminar}) => {
    
    const { t } = useTranslation();
    
    
    return (
    <>    
    { (mostrarModalFinal)   ?
    <>
        <Modal show={mostrarModalFinal} className="modal-size-xl" showClose={true} center={false} onClose={cerrarModal}>
            <div className="flex flex-col w-full p-4 items-center h-fit">
                <div className="">
                    
                    <Iconos icono="info" className="!p-0 w-[150px] h-[150px]" />
                    
                </div>
                <div className="max-w-[500px] flex flex-col items-center">
                    <span className="text-extra font-semibold mb-4">{t("eliminarTitle")}</span>
                    <p className="text-medium max-w-[400px] text-center">{t("eliminarSubtitle")}</p>
                </div>
            </div>
            <Modal.Header onClose={cerrarModal}></Modal.Header>
            <Modal.Footer classNamefoot=" lg:flex lg:gap-2 ">
                <button className="rounded-full boton-secundario text-medium lg:ms-auto lg:me-0 me-1" > {t("eliminarCerrar")} </button>
                <button className="rounded-full boton-warning text-medium lg:ms-0 ms-1" onClick={accionEliminar}> {t("eliminarEliminar")} </button>
            </Modal.Footer>
        </Modal>
    </> : 
    <>
    
    </>
    }
    </>)
    
    
}

export default CarritoEliminarModal