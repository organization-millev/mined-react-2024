import React, { useState , useEffect } from 'react';
import Input from '../Input/Input';
import InputArea from '../InputArea/InputArea';
import Select from '../Select/Select';
import CustomSaberMas from '../CustomSaberMas/CustomSaberMas';
import { useContactanos } from '../../../hooks/help/useContactanos'; 
import Selecionado from '../../iconos/radio_button_checked.js';
import SelecionadoDark from '../../iconos/radio_button_checked_blanco.js';
import NoSelecionadoDark from '../../iconos/radio_button_unchecked_blanco.js';
import { useAcademia } from '../../../providers/AcademiaContext';
import { validarEnBlanco,validarEmail ,validarNumeroTelefono} from '../../../utils/validaciones';
import NoSelecionado from '../../iconos/radio_button_unchecked.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';


const Contactanos = () => {
  
  const { t } = useTranslation();

  const TITULOS = "text-medium font-semibold mb-2 dark:text-blanco";
  const { actualizarCampos } = useContactanos();
  const [simpleMessage, setSimpleMessage] = useState('');
  
  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    academiaComprada: '',
    tipoConsulta: '',
    mensaje: '',
  });
  
  const [formErrors, setFormErrors] = useState({});


  const handleSubmit = () => {
    
    let hayError = false;
    
    if (!validarEnBlanco(formValues.nombre).valido) {
      toast.error(t('Por favor complete el campo nombre'));
      hayError = true;
    }
    if (!validarEnBlanco(formValues.apellido).valido) {
      toast.error(t('Por favor complete el campo apellido'));
      hayError = true;
    }
     if (!validarEnBlanco(formValues.email).valido) {
      toast.error(t('Por favor complete el campo correo'));
      hayError = true;
    } else if (!validarEmail(formValues.email)) {
      toast.error(t('Por favor ingrese un correo válido'));
      hayError = true;
    }
    
    if (!validarEnBlanco(formValues.telefono).valido) {
      toast.error(t('Por favor complete el campo teléfono'));
      hayError = true;
    } else if (!validarNumeroTelefono(formValues.telefono)) {
      toast.error(t('Por favor ingrese un teléfono válido'));
      hayError = true;
    }
    
    
    if (!validarEnBlanco(formValues.academiaComprada).valido) {
      toast.error(t('Por favor seleccione una academia'));
      hayError = true;
    }
    if (!validarEnBlanco(formValues.tipoConsulta).valido) {
      toast.error(t('Por favor seleccione el tipo de consulta'));
      hayError = true;
    }
    if (!validarEnBlanco(simpleMessage).valido) {
      toast.error(t('Por favor escriba su mensaje'));
      hayError = true;
    }

    if (hayError) return;

    actualizarCampos(
      formValues.nombre,
      formValues.apellido,
      formValues.email,
      formValues.telefono,
      formValues.academiaComprada,
      formValues.tipoConsulta,
      simpleMessage,
      isSubscribed,
      true
    );
  };



  
  const { GetAcademias, listaAcademias } = useAcademia();
    
    
  //
  
  /*const handleInputChange = (event) => {
    const target = event.target || event;
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
  };*/
  
  
  const handleCommentChange = (newComment) => {
        setSimpleMessage(newComment);
    };
  
  
  const handleInputChange = (event) => {
      if (event.target) {
          const { name, value } = event.target;
          setFormValues({ ...formValues, [name]: value });
      } else {
          setFormValues({ ...formValues, mensaje: event });
      }
  };

  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscriptionChange = () => {
    setIsSubscribed(!isSubscribed);
  };
  
  return (
    <div className="font-sans md:flex md:flex-row-reverse gap-[20px]">
      <div className="mb-9 md:w-1/2 lg:w-full lg:mb-0">
        <div className="mb-5 flex flex-col gap-[8px]">
          <h1 className="text-largeB lg:text-3extra font-semibold dark:text-blanco">{t('contactanos')} </h1>
          <p className="text-small font-normal lg:text-large dark:text-blanco">{t('cuentanosTuProblema')} </p>
        </div>

        <div>
          <div className="md:flex md:gap-4">
            <div className="mb-4 md:w-1/2">
              <p className={TITULOS}>{t('nombre')}</p>
              <Input
                type="text"
                placeholder={t('texto')}
                name="nombre"
                value={formValues.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 md:w-1/2">
              <p className={TITULOS}>{t('apellido')} </p>
              <Input
                type="text"
                placeholder={t('texto')}
                name="apellido"
                value={formValues.apellido}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <p className={TITULOS}>{t('correo')} </p>
            <Input
              type="text"
              placeholder={t('texto')}
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <p className={TITULOS}>{t('numTelefono')} </p>
            <Input
              type="text"
              placeholder={t('texto')}
              name="telefono"
              value={formValues.telefono}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <p className={TITULOS}>{t('academiaComprada')}</p>
        <Select
          className="rounded-full text-medium"
          onChange={(e) => setFormValues({ ...formValues, academiaComprada: e.target.value })}
          value={formValues.academiaComprada}
        >
          <option value="">Seleccionar</option>
          {listaAcademias
            .filter(academia => academia.is_enabled === 1) 
            .map(academia => (
              <option key={academia.name} value={academia.name}>
                {academia.name}
              </option>
            ))}
        </Select>

          </div>
          {/*
          <div className="mb-4">
            <p className={TITULOS}>{t('tipoConsulta')} </p>
            <Select
              className="rounded-full text-medium"
              name="tipoConsulta"
              onChange={(e) => setFormValues({ ...formValues, tipoConsulta: e.target.value })}
              value={formValues.tipoConsulta}
            >
              <option value="">Seleccionar</option>
              <option value="consulta1">Consulta 1</option>
              <option value="consulta2">Consulta 2</option>
              <option value="consulta3">Consulta 3</option>
            </Select>
          </div>
          */}
          <div className="mb-4">
            <p className={TITULOS}>{t('dejaMensaje')}</p>
            <InputArea
              /*type="text"
              placeholder={t('escribeConsulta')}
              name="mensaje"
              value={formValues.mensaje}
              onChange={handleInputChange}*/
              
              type="text"
              placeholder={t('escribeConsulta')}
              value={simpleMessage}
              onChange={handleCommentChange}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center text-small cursor-pointer dark:text-blanco">
            <input
              type="checkbox"
              checked={isSubscribed}
              onChange={handleSubscriptionChange}
              className="hidden"
            />
            {isSubscribed ?
            <>
            <Selecionado className="mr-2 block dark:hidden" /> 
            <SelecionadoDark className="mr-2 hidden dark:block" /> 
              
            </>
            
            : 
            <>
              <NoSelecionado className="mr-2  dark:hidden" />
              <NoSelecionadoDark className="mr-2 !p-0 hidden dark:block" />
            </>
              
            }
            
           {t('aceptarCondicion')}
          </label>
        </div>

        <div className="flex justify-end mt-4 font-sans">
          <button className="boton-primario dark:boton-secundario  text-small font-bold h-[36px] lg:text-medium" onClick={handleSubmit}>{t('enviarbtn')}</button>
        </div>
      </div>

      <div className="md:w-3/5">
        <img src="../assets/images/VERTICAL_contactanos.png" alt="img" className="w-full h-[247px] rounded-[20px] md:h-full object-cover lg:w-[500px]" />
      </div>
    </div>
  );
};

export default Contactanos;