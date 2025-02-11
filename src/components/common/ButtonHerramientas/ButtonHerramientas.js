import React, { useState } from 'react';
import FlechaDer from '../../iconos/arrow_forward.js';
import FlechaDerDark from '../../iconos/FlechaDerBlanco.js';
import FlechaColor from '../../iconos/arrow_right_green.js';

import Deshabilitado from '../../iconos/candado_blanco.js';
import DeshabilitadoDark from '../../iconos/candado_negro_dark.js';

// Constant for repeated CSS classes

const IconWrapper = ({ IconComponent, isEnabled, isHovered, colorTool, onHoverChange, ...props }) => {
  
  // Aplicar bgColor dependiendo de si está habilitado y la pantalla
  const bgColor = isEnabled 
    ? `bg-[${colorTool}] lg:bg-[#939299] dark:bg-blanco`  // Mobile: colorTool, Desktop: #939299
    : "dark:bg-gris-claro bg-[#656472] w-[29px] h-[29px]";

  return (
    <div 
      className={`${bgColor} rounded-full w-[23px] h-[23px] lg:w-[39px] lg:h-[39px] flex items-center justify-center 
      ${isEnabled ? 'lg:hover:bg-[${colorTool}]' : ''}`} // Hover sólo en desktop
      // Usar el estilo de hover manualmente solo en desktop
      style={{ background: !isHovered && window.innerWidth >= 1024 ? undefined : colorTool }}
    >
      <IconComponent {...props} className="!p-[0px] w-[15px] h-[15px] lg:w-[24px] lg:h-[24px]" />
    </div>
  );
};

const ButtonHerramientas = ({ IconComponent, buttonLabel, isEnabled,id,urlRoute,logoMedia,logoMediaDark,colorTool,colorToolFondo,colorToolBorde,colorFlecha}) => {
  
  /*
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkModeIcon, setIsDarkModeIcon] = useState(false);

  const handleHoverChange = (hovering) => {
    setIsHovered(hovering);
  };

  React.useEffect(() => {
    // Detect if the current icon is the dark mode icon
    if (IconComponent && IconComponent.name === 'logoMediaDark') {
      setIsDarkModeIcon(true);
    } else {
      setIsDarkModeIcon(false);
    }
  }, [IconComponent]);*/
  
  
   const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    
    
  const FinalIconComponent = isEnabled
    ? IconComponent
    : Deshabilitado;

  
const buttonBaseClasses = `group inline-flex items-center dark:bg-color-dark2  bg-blanco w-full h-[59px] lg:h-[93px] justify-between 2xl:w-[270px] 2xl:h-[93px] text-gris-azulado-profundo text-zinc-700 font-semibold py-2 px-2 2xl:px-4 lg:rounded-[20px] rounded-[10px] shadow-custom-strong transition-all duration-300  hover:text-verde-azulado cursor-pointer`;
  const buttonDisabledClasses = "group inline-flex items-center dark:bg-color-dark2 w-full h-[59px] lg:h-[93px] bg-blanco justify-between 2xl:w-[270px] 2xl:h-[93px] text-gray-500 font-semibold py-2 px-2 2xl:px-4 lg:rounded-[20px] rounded-[10px] shadow-custom-lg cursor-pointer";

  const convertGradientToColor = (gradient) => {
    // Crear un canvas temporal
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 1;
    const context = canvas.getContext('2d');
  
    // Aplicar el degradado al canvas
    const gradientStyle = context.createLinearGradient(0, 0, 100, 0);
    
    // Asumiendo que el degradado tiene colores separados por comas
    const colors = gradient.match(/#[a-fA-F0-9]{6}|rgb\([^)]*\)|rgba\([^)]*\)/g); 
    
    if (!colors) {
        // Si no es un degradado válido, retornar un color por defecto (por ejemplo, negro)
        return '#000000';
    }

    // Añadir los colores al gradiente
    colors.forEach((color, index) => {
        gradientStyle.addColorStop(index / (colors.length - 1), color);
    });

    // Pintar el gradiente en el canvas
    context.fillStyle = gradientStyle;
    context.fillRect(0, 0, 100, 1);

    // Obtener el color del píxel del medio
    const imageData = context.getImageData(50, 0, 1, 1).data;
    const solidColor = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
  
    return solidColor;
};
  
  const solidColor = convertGradientToColor(colorTool);
  
  if (!isEnabled) {
    return (
      <div className={`group relative ${buttonDisabledClasses}`} disabled>
        <div className="opacity-40 flex items-center ">
          <div className="bg-gris-claro dark:bg-[#B2B2B8] w-[29px] h-[29px] lg:w-[51px] lg:h-[51px] rounded-full flex items-center justify-center">
            <IconWrapper IconComponent={IconComponent} isEnabled={isEnabled} className="min-w-[23px] max-w-[23px]" />
          </div>
        </div>
        <span className="font-sans font-bold text-[19px] 2xl:min-w-[140px] text-[#bababe] dark:text-blanco text-center text-xs lg:text-lg text-center">{buttonLabel}</span>
        
        <IconWrapper IconComponent={FinalIconComponent} isEnabled={isEnabled} className="min-w-[23px] max-w-[23px]" />
        
        <a className="boton-primario absolute !py-2 !px-2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 !text-xs lg:text-medium" 
           href={`/herramienta_no_comprada/${id}`} style={{ top: '50%', left: '50%' }}>
          Saber más
        </a>
      </div>
    );
  }

  return (
    
    <a className={buttonBaseClasses} onMouseEnter={handleMouseEnter}  onMouseLeave={handleMouseLeave} href={urlRoute} target="_blank" rel="noopener noreferrer"
     style={{ backgroundColor: isHovered ? colorToolFondo : undefined }} > {/*onMouseEnter={() => handleHoverChange(true)} onMouseLeave={() => handleHoverChange(false)}*/}
      
      <div className="  lg:bg-gris-claro dark:bg-[#B2B2B8] w-[29px] h-[29px] lg:w-[51px] lg:h-[51px] rounded-full flex items-center justify-center  "
        style={{ background: !isHovered && window.innerWidth >= 1024 ? undefined : colorToolBorde }} >
        <IconWrapper IconComponent={FinalIconComponent} isEnabled={isEnabled} colorTool={colorTool} isHovered={isHovered} coclassName="min-w-[23px] max-w-[23px]" />
      </div>
      
      <span className="font-sans font-bold dark:text-blanco text-[19px]   2xl:min-w-[140px] text-xs lg:text-lg text-center"
      style={{
      background: isHovered ? colorTool : undefined, // Gradiente solo en hover
      WebkitBackgroundClip: isHovered ? 'text' : undefined,
      WebkitTextFillColor: isHovered ? 'transparent' : undefined,
      backgroundClip: isHovered ? 'text' : undefined, // Para navegadores no Webkit
      textFillColor: isHovered ? 'transparent' : undefined, // Relleno transparente solo en hover
    }}>{buttonLabel}</span>
      
     <div className="hidden lg:block ">
          <FlechaDer 
            className="dark:hidden group-hover:hidden group-hover:fill-verde-azulado group-hover:translate-x-[6px] mr-2 w-[20px] h-[20px] 2xl:w-[24px] 2xl:h-[24px]" 
            padding="0px" 
          />
          <FlechaDerDark 
            className="hidden dark:block dark:group-hover:hidden group-hover:translate-x-[6px] mr-2 w-[20px] h-[20px] 2xl:w-[24px] 2xl:h-[24px]" 
            padding="4px" 
          />
          <FlechaColor 
          color={solidColor}  
          className="hidden group-hover:block  group-hover:translate-x-[6px] mr-2 w-[20px] h-[20px] 2xl:w-[24px] 2xl:h-[24px]" 
        />
    
    </div>

    {/* Para móvil */}
    <FlechaColor 
      color={solidColor}  
      className="mr-2 w-[20px] h-[20px] lg:hidden" 
    />
    
    </a>
  );
};

export default ButtonHerramientas;
