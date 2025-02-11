import React, {  useEffect,useState  } from 'react';
import { apiHelpContactRegister } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';

export const useContactanos = () => {
    const { warn,success } = useAlert();
    const [nombre,setNombre] = useState('');
    const [apellido,setApellido] = useState('');
    const [email,setEmail] = useState('');
    const [telefono,setTelefono] = useState('');
    const [academiaComprada,setAcademiaComprada] = useState('');
    const [consulta,setConsulta] = useState('');
    const [mensaje,setMensaje] = useState('');
    const [terminos,setTerminos] = useState('');
    const [trigger,setTrigger] = useState(false);
    
    const actualizarCampos = (nuevoNombre, nuevoApellido, nuevoEmail, nuevoTelefono, nuevaAcademiaComprada, nuevaConsulta, nuevoMensaje, nuevoTermino, nuevoTrigger) => {
        setNombre(nuevoNombre);
        setApellido(nuevoApellido);
        setEmail(nuevoEmail);
        setTelefono(nuevoTelefono);
        setAcademiaComprada(nuevaAcademiaComprada);
        setConsulta(nuevaConsulta);
        setMensaje(nuevoMensaje);
        setTrigger(nuevoTrigger);
        setTerminos(nuevoTermino)
    };
    
    const { data,error,cargando } = apiHelpContactRegister(trigger,nombre,apellido,email,telefono,academiaComprada,consulta,mensaje,terminos);
    
    useEffect(() => {
        if (error) {
           warn('Ocurrio un error');
        }else if (data.contact_id){
            success('Se registró correctamente');
        }
    }, [data,error]);
    
    return {
        actualizarCampos
    };
}

