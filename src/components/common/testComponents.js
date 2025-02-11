import React, { useState,useEffect } from 'react';


import Modal from './Modal/Modal'
import CarritoFinalModal from './CarritoFinalModal/CarritoFinalModal'
import EditarFoto from '../Cursos/EditarFoto/EditarFoto'
import EditarEmblema from '../Cursos/EditarEmblema/EditarEmblema'
import CardLogro from './CardLogro/CardLogro'
import YunoPay from './Pasarelas/Yuno/Yuno'
import {useYuno} from '../../hooks/useYuno'

const TestComponents = () => {
    
    
  const [showModalCarrito, setShowModalCarrito] = useState(false);
  
  const {yunoCliente,yunoSesion,obtenerClienteYuno,obtenerSesion} = useYuno()

  const openModal = () => {
    setShowModalCarrito(true);
  };

  const closeModal = () => {
    setShowModalCarrito(false);
  };
  
  const [showModalPerfil,setShowModalPerfil] = useState(false);
  
  const openModalPerfil = () => {
      setShowModalPerfil(true)
  }
  
  const handleCerrarModal = () =>{
      setShowModalPerfil(false)
  }
  
  const carritofinalmodal = {
      tipo:"exito",
      titulo:"¡Listo! Realizaste tu compra con éxito.",
      mensaje:"Hemos recibido tu pago correctamente  ¡Muchos éxitos! <br> Ya puedes comenzar a usar tu producto"
  }
  
  const ListaLogros = [
      
        {
            id_logro:"1",
            medalla:"oro",
            puntos:"100",
            logro:"Trader",
            desafio:"Mira 3 clases seguidas de Trading Pro",
            tipo:"clases",
            logrado:"3",
            total:"3",
            desbloqueo:true,
            titulo:"Nombre de titulo"
        },
        {
            id_logro:"2",
            medalla:"oro",
            puntos:"100",
            logro:"Trader",
            desafio:"Mira 3 clases seguidas de Trading Pro",
            tipo:"clases",
            logrado:"3",
            total:"5",
            desbloqueo:false,
            titulo:"Nombre de titulo"
        }
      
      ]

    const [showYuno, setShowYuno] = useState(false);
    
    const handleClickYuno = () => {
        obtenerClienteYuno(4321)
    }
    const handleClickPayYuno = () => {
        setShowYuno(true)
    }
    
    
    useEffect(()=>{
        
        
        
        if(yunoCliente.data != null && yunoCliente.data != []){
            
            if(yunoCliente.data.id){
                obtenerSesion(yunoCliente.data.id)
            }
            
        }
        
    },[yunoCliente])
    
    useEffect(()=>{
        
        
    },[yunoSesion.data])

  return (
    <div className="App bg-gray-100 h-screen flex flex-col">
        <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openModal}> 
                abrir carrito final modal
            </button>
            <Modal show={showModalCarrito} className="modal-size-xl" showClose={false} >
                <CarritoFinalModal tipo={carritofinalmodal.tipo} titulo={carritofinalmodal.titulo} mensaje={carritofinalmodal.mensaje} />
            </Modal>
        </div>
        <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openModalPerfil}> 
                abrir perfil edicion
            </button>
            <Modal show={showModalPerfil} className="modal-size-xl" onClose={handleCerrarModal}>
                <Modal.Header>
                </Modal.Header>
                // <EditarFoto />
                // <EditarEmblema/>
                <Modal.Footer>
                    <div className="flex">
                        <button className="boton-primario ms-auto" onClick={handleCerrarModal}>Guardar Cambios</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
        <div className="semi-full-container bg-white">
            <div className="grid grid-row-flow-dense gap-4 w-full lg:grid-cols-4">
                {ListaLogros.map((obj,ind)=>(
                    <CardLogro obj={obj} key={ind} />
                ))}
                
            </div>
        </div>
        <div className="semi-full-container bg-white">
            <div className="w-[500px]">
                <button className="boton-primario bg-purple w-full" onClick={handleClickYuno}>Abrir Yuno</button>
                <div className="w-full Yuno-container-medios"></div>
                <button className="boton-primario bg-purple w-full " onClick={handleClickPayYuno}>Pagar Yuno</button>
            </div>
            <YunoPay checkoutsession={yunoSesion.data?.checkout_session} contenedorMedios=".Yuno-container-medios" abrirPasarela={showYuno} /> 
        </div>
    </div>
  );
}

export default TestComponents