import React,{ useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import Iconos from '../../iconos/iconos'

const Modal = ({ show, className, children, onClose,center=true }) => {
  
    useEffect(()=>{
    
    return () => {
      if(!show){
        let bodyElement = document.body
    
        bodyElement.classList.remove("overflow-y-hidden")
      }
      else{
        
      }
    }
    
  },[])
  
  if (!show) {
    let bodyElement = document.body
    bodyElement.classList.remove("overflow-y-hidden")
    return null;
  }
  
  let header = null;
  let body = null;
  let footer = null;
  let otherChildren = [];

  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === Modal.Header) {
        header = React.cloneElement(child , { onClose });
      } else if (child.type === Modal.Body) {
        body = child;
      } else if (child.type === Modal.Footer) {
        footer = child;
      } else {
        otherChildren.push(child);
      }
    }
  });
  
  if(show){
    
    let bodyElement = document.body
    
    bodyElement.classList.add("overflow-y-hidden")
    
  }

  return ReactDOM.createPortal (
    <div className={"fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center z-[50000] overflow-auto " + ((center) ? "items-center":"")}>
      <div className={"bg-white px-6 py-3 rounded-lg shadow-lg h-fit "+className}>
        {header}
        {body}
        {otherChildren}
        {footer}
      </div>
    </div>
  ,document.body);
  
  
};

Modal.Header = ({ children , onClose}) => (
  <div className="w-full flex">
    {children}
    <button className="ms-auto" onClick={onClose}>
      <Iconos icono="Cerrar" className={"icono-sm"} />
    </button>
  </div>
);

Modal.Body = ({ children }) => (
  <div className="">{children}</div>
);

Modal.Footer = ({ children,classNamefoot }) => (
  <div className={"w-full pt-2 mt-4 mb-3 text-center " + classNamefoot }>{children}</div>
);

export default Modal;