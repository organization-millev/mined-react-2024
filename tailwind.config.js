/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './src/components/**/*.{jsx,js}','./src/components/**/**/*.{jsx,js}'
  ],
  
  darkMode: 'class',
  
  theme: {
    fontSize:{
      'h2':'1.5em',
      'small':["12px","16px"], 
      'medium':["14px","20px"],
      'large':["16px","24px"],
      'largeB':["20px","24px"],
      'extra':["24px","28px"],
      '2extra':["32px","40px"],
      '3extra':["40px","48px"],
      'xs': ["12px", "16px"],
      'sm': ["14px", "20px"],
      'modalBase': ["16px", "20px"],
      'base': ["16px", "24px"],
      'lg': ["18px", "28px"],
      'xl': ["20px", "28px"],
      '2xl': ["24px", "32px"],
      '3xl': ["30px", "36px"],
      '4xl': ["36px", "40px"],
      '5xl': ["48px", "1"],
      '6xl': ["60px", "1"],
      '7xl': ["72px", "1"],
      '8xl': ["96px", "1"],
      '9xl': ["128px", "1"]
    },
    fontFamily: {
      'sans': ['Montserrat', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
    },
    extend: {
        colors: {
          'plata-suave': 'var(--color-plata-suave)',
          'gris-claro': 'var(--color-gris-claro)',
          'gris-medio': 'var(--color-gris-medio)',
          'gris-oscuro': 'var(--color-gris-oscuro)',
          'plata-pálido': 'var(--color-plata-pálido)',
          'púrpura-grisáceo': 'var(--color-púrpura-grisáceo)',
          'gris-carbón': 'var(--color-gris-carbón)',
          'azul-oscuro-grisáceo': 'var(--color-azul-oscuro-grisáceo)',
          'gris-azulado-profundo': 'var(--color-gris-azulado-profundo)',
          'blanco': 'var(--color-blanco)',
          'negro': 'var(--color-negro)',
          'verde-esmeralda': 'var(--color-verde-esmeralda)',
          'naranja-cremoso': 'var(--color-naranja-cremoso)',
          'naranja-cremoso-claro': 'var(--color-naranja-cremoso-claro)',
          'rojo-coral': 'var(--color-rojo-coral)',
          'azul-pálido': 'var(--color-azul-pálido)',
          'azul-celeste': 'var(--color-azul-celeste)', 
          'azul-intenso': 'var(--color-azul-intenso)',
          'azul-marino': 'var(--color-azul-marino)',
          'azul-noche': 'var(--color-azul-noche)',
          'rosa-pálido': 'var(--color-rosa-pálido)',
          'rojo-suave': 'var(--color-rojo-suave)',
          'rojo-intenso': 'var(--color-rojo-intenso)',
          'rojo-oscuro': 'var(--color-rojo-oscuro)',
          'marrón-rojizo': 'var(--color-marrón-rojizo)',
          'azul-medio': 'var(--color-azul-medio)',
          'azul-brillante': 'var(--color-azul-brillante)',
          'verde-azulado': 'var(--color-verde-azulado)',
          'naranja-oscuro': 'var(--color-naranja-oscuro)',
          'carmesí': 'var(--color-carmesí)',
          'rosa-coral': 'var(--color-rosa-coral)',
          'fucsia-intenso': 'var(--color-fucsia-intenso)',
          'rosa-palido-suave': 'var(--color-rosa-palido-suave)',
          'verde-agua': 'var(--color-verde-agua)',
          'turquesa-claro': 'var(--color-turquesa-claro)',
          'ocre': 'var(--color-ocre)',
          'amarillo-suave': 'var(--color-amarillo-suave)',
          'naranja-rojizo': 'var(--color-naranja-rojizo)',
          'naranja-intenso': 'var(--color-naranja-intenso)',
          'verde-lima': 'var(--color-verde-lima)',
          'verde-lima-oscuro': 'var(--color-verde-lima-oscuro)',
          'naranja-vivo': 'var(--color-naranja-vivo)',
          'púrpura-oscuro': 'var(--color-púrpura-oscuro)',
          'blanco-nieve': 'var(--color-blanco-nieve)',
          'gris-pálido': 'var(--color-gris-pálido)',
          'gris-antracita': 'var(--color-gris-antracita)',
          'negro-carbón': 'var(--color-negro-carbón)',
          'rosa-fucsia': 'var(--color-rosa-fucsia)',
          'marron-grisaceo':'var(--color-marron-grisaceo)',
          'gris-intenso':'var(--color-gris-intenso)',
          'gris-valoracion':'var(--color-gris-valoracion)',
          'verde-claro':'var(--color-verde-claro)',
          'rojo-notificacion':'var(--color-rojo-notificacion)',
          'gris-divisor':'var(--color-gris-divisor)',
          'gris-progressBar':'var(--color-gris-progressBar)',
          'gris-favorito':'var(--color-gris-favorito)',
          'gris-herramientas':'var(--color-gris-herramientas)',
          'gris-grafito':'var(--color-gris-grafito)',
          'gris-grafito-claro':'var(--color-gris-grafito-claro)',
          'color-dark':'var(--color-dark)',
          'color-dark2':'var(--color-dark2)',
          'color-dark-texto':'var(--color-dark-text)',
          'contenedor-plomo':'var(--color-contenedor-plomo)',
          'color-dark2-texto':'var(--color-dark2-text)',
          'color-wsp':'var(--color-wsp)',
        },
        boxShadow: {
          'custom-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'custom-strong': '0 0 10px rgba(0, 0, 0, 0.2)',
        },
        screens: {
          '4xl':'2560px',
        },
        
    }
  },
  variants: {
    extend: {
      borderRadius: ['before', 'after'],
      grayscale: ['hover', 'group-hover'],
      opacity: ['hover', 'group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities,theme  }) {
      const colors = theme('colors');
      
      const iconClasses = {
        '.icono-mini':{
          width:'12px',
          height:'12px',
          padding:'0 !important'
        },
        '.icono-mini-sm':{
          width:'14px',
          height:'14px',
          padding:'0 !important'
        },
        '.icono-semi-sm': {
          width: '17px',
          height: '17px',
          padding: '0 !important',
        },
        '.icono-sm': {
          width: '20px',
          height: '20px',
          padding: '0 !important',
        },
        '.icono-semi-md': {
          width: '24px',
          height: '24px',
          padding: '0 !important',
        },
        '.icono-md': {
          width: '28px',
          height: '28px',
          padding: '0 !important',
        },
        '.icono-lg': {
          width: '40px',
          height: '40px',
          padding: '0 !important',
        },
        '.icono-semi-xl':{
          width:'32px',
          height:'32px',
          padding: '0 !important'
        },
        '.icono-xl': {
          width: '48px',
          height: '48px',
          padding: '0 !important',
        },
        '.icono-2xl':{
          width:'64px',
          height:'64px',
          padding: '0 !important'
        }
      };
      
      const botones = {
        '.boton-secundario': {
          backgroundColor: 'white', // bg-[var(--color-gris-azulado-profundo)]
          color: 'var(--color-gris-azulado-profundo)', // text-white
          paddingLeft: '1.25rem', // px-[0.75rem]
          paddingRight: '1.25rem', // px-[0.75rem]
          paddingTop: '0.25rem', // py-[0.5rem]
          paddingBottom: '0.25rem', // py-[0.5rem]
          borderRadius: '20px', // rounded-[20px]
          // width: '100%', // w-[100%]
          borderColor:'var(--color-gris-azulado-profundo)',
          borderWidth:'1px',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'var(--color-plata-suave)',
          },
          '&:disabled': {
            backgroundColor: 'white',
            cursor: 'not-allowed',
            opacity: '0.5',
          },
        },
        '.boton-primario':{
          backgroundColor: 'var(--color-gris-grafito)', // bg-[var(--color-gris-azulado-profundo)]
          color: 'white', // text-white
          paddingLeft: '1.25rem', // px-[0.75rem]
          paddingRight: '1.25rem', // px-[0.75rem]
          paddingTop: '0.25rem', // py-[0.5rem]
          paddingBottom: '0.25rem', // py-[0.5rem]
          borderRadius: '20px', // rounded-[20px]
          fontFamily:'Montserrat',
          // width: '100%', // w-[100%]
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#656472',
          },
          '&:disabled': {
            backgroundColor: 'var(--color-gris-azulado-profundo)',
            cursor: 'not-allowed',
            opacity: '0.5',
          },
        },
        '.dark .boton-primario':{
          backgroundColor: 'var(--color-gris-medio)', // bg-[var(--color-gris-azulado-profundo)]
          color: 'white', // text-white
          paddingLeft: '1.25rem', // px-[0.75rem]
          paddingRight: '1.25rem', // px-[0.75rem]
          paddingTop: '0.25rem', // py-[0.5rem]
          paddingBottom: '0.25rem', // py-[0.5rem]
          borderRadius: '20px', // rounded-[20px]
          fontFamily:'Montserrat',
          // width: '100%', // w-[100%]
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#656472',
          },
          '&:disabled': {
            backgroundColor: 'var(--color-gris-medio)',
            cursor: 'not-allowed',
            opacity: '0.5',
          },
        },
        '.boton-warning':{
          backgroundColor: 'var(--color-rojo-coral)', // bg-[var(--color-gris-azulado-profundo)]
          color: 'white', // text-white
          paddingLeft: '1.25rem', // px-[0.75rem]
          paddingRight: '1.25rem', // px-[0.75rem]
          paddingTop: '0.25rem', // py-[0.5rem]
          paddingBottom: '0.25rem', // py-[0.5rem]
          borderRadius: '20px', // rounded-[20px]
          fontFamily:'Montserrat',
          // width: '100%', // w-[100%]
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'var(--color-rojo-coral)',
            filter: "brightness(1.75)"
          },
          '&:disabled': {
            backgroundColor: 'var(--color-rojo-coral)',
            cursor: 'not-allowed',
            opacity: '0.5', 
          },
        }, 
        '.boton-tercero':{
          backgroundColor: 'var(--color-azul-medio)', // bg-[var(--color-gris-azulado-profundo)]
          color: 'white', // text-white
          paddingLeft: '1.25rem', // px-[0.75rem]
          paddingRight: '1.25rem', // px-[0.75rem]
          paddingTop: '0.25rem', // py-[0.5rem]
          paddingBottom: '0.25rem', // py-[0.5rem]
          borderRadius: '20px', // rounded-[20px]
          fontFamily:'Montserrat',
          fontSize:'12px',
          fontWeight:'600',
        },
        '.boton-cuarto':{
          backgroundColor: 'var(--color-gris-azulado-profundo)', // bg-[var(--color-gris-azulado-profundo)]
          color: 'white', // text-white
          paddingLeft: '1.25rem', // px-[0.75rem]
          paddingRight: '1.25rem', // px-[0.75rem]
          paddingTop: '0.25rem', // py-[0.5rem]
          paddingBottom: '0.25rem', // py-[0.5rem]
          borderRadius: '20px', // rounded-[20px]
          fontFamily:'Montserrat',
        },
        '.boton-primario-dark':{
          backgroundColor: 'var(--color-blanco)', // bg-[var(--color-gris-azulado-profundo)]
          color: 'var(--color-negro)', // text-white
          paddingLeft: '1.25rem', // px-[0.75rem]
          paddingRight: '1.25rem', // px-[0.75rem]
          paddingTop: '0.25rem', // py-[0.5rem]
          paddingBottom: '0.25rem', // py-[0.5rem]
          borderRadius: '20px', // rounded-[20px]
          fontFamily:'Montserrat',
          // width: '100%', // w-[100%]
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'var(--color-dark-text)',
          },
          '&:disabled': {
            backgroundColor: 'var(--color-dark2)',
            cursor: 'not-allowed',
            opacity: '0.5',
          },
        },
        
      }
      
      const contenedores = {
        '.full-container': {
          display: 'flex', // Utiliza flex
          flexWrap: 'wrap', // flex-wrap
          width: '100%', // w-[100%]
          height: 'auto', // h-[auto]
        },
        '.semi-full-container':{
          display: 'flex', // Utiliza flex
          flexWrap: 'wrap', // flex-wrap
          width: '100%', // w-[100%]
          height: 'auto', // h-[auto]
          paddingLeft: '5%',
          paddingRight: '5%',
          paddingTop: '',
          paddingBottom: '',
          fontFamily:'Montserrat',
          marginLeft:'auto',
          marginRight:'auto'
        },
        '.container-extraLarge':{
          display: 'flex', // Utiliza flex
          maxWidth: '1152px', // w-[100%]
          height: 'auto', // h-[auto]
          paddingRight:'0',
          paddingLeft:'0',
          paddingTop:'',
          paddingBottom:'',
          margin:'0 auto',
          justifyContent:'center'
        },
        '@screen 2xl':{
          '.semi-full-container':{
            maxWidth: '1152px',
            paddingRight:'0 !important',
            paddingLeft:'0 !important',
          }
        },
        '@screen lg': {
          '.full-container': {
            flexWrap: 'nowrap', // lg:flex-no-wrap
          },
          '.semi-full-container':{
            paddingLeft: '10%',
            paddingRight: '10%',
          }
        },
      }
      
      const cards = {
        ".card.item":{
          boxShadow:"0px 0px 16px -5px rgba(0,0,0,0.54)",
          "-webkit-box-shadow":"0px 0px 16px -5px rgba(0,0,0,0.54)",
          borderRadius:"20px",
          
        },
        ".card .card-body":{
          padding:"1rem",
          height:"100%",
          width:"100%"
        }
        
      }
      
      const badges = {
        ".badge-primario":{
          backgroundColor: 'var(--color-gris-azulado-profundo)', // bg-[var(--color-gris-azulado-profundo)]
          color: 'white', // text-white
          paddingLeft: '1.25rem', // px-[0.75rem]
          paddingRight: '1.25rem', // px-[0.75rem]
          paddingTop: '0.25rem', // py-[0.5rem]
          paddingBottom: '0.25rem', // py-[0.5rem]
          borderRadius: '20px', // rounded-[20px]
          width: 'fit-content', // w-[100%]
        },
        ".badge":{
          paddingLeft: '0.75rem', // px-[0.75rem]
          paddingRight: '0.75rem', // px-[0.75rem]
          paddingTop: '0.1rem', // py-[0.5rem]
          paddingBottom: '0.1rem', // py-[0.5rem]
          borderRadius: '20px', // rounded-[20px]
          width: 'fit-content', // w-[100%]
          fontSize:'16px',
          lineHeight:'24px',
          color:'white',
          backgroundColor:'gray',
          cursor:"pointer"
        },
        ".badge.selected":{
          border:"2px solid",
          borderColor:"var(--color-gris-azulado-profundo)"
        },
        ".badge-secundario-dark":{
          backgroundColor: 'white ', // bg-[var(--color-gris-azulado-profundo)]
          color: 'var(--color-gris-azulado-profundo)', // text-white
          paddingLeft: '1.25rem', // px-[0.75rem]
          paddingRight: '1.25rem', // px-[0.75rem]
          paddingTop: '0.25rem', // py-[0.5rem]
          paddingBottom: '0.25rem', // py-[0.5rem]
          borderRadius: '20px', // rounded-[20px]
          width: 'fit-content', // w-[100%]
        }
      }
      
      const multilineTruncate = {
        '.line-clamp-1': {
          display: '-webkit-box',
          '-webkit-line-clamp': '1',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
        },
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
        },
        '.line-clamp-3': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
        }
      }
      
      const modal = {
        '.modal-size-xl':{
          width:'100%',
          margin: '15px'
        },
        '.modal-size-l':{
          width:'100%',
          margin: '15px'
        },
        '.modal-size-md':{
          width:'100%',
          margin: '15px'
        },
        '@screen lg':{
          '.modal-size-xl':{
            width:'60%',
            maxWidth:'1000px'
          },
          '.modal-size-l':{
            width:'40%',
            maxWidth:'600px'
          },
          '.modal-size-md':{
            width:'100%',
            maxWidth:'379px'
          }
        }
      }
      
      const customStyles = {
        '.border-dashed-custom::after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23CBCBCB' stroke-width='4' stroke-dasharray='10, 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
          borderRadius: '20px',
          pointerEvents: 'none', // Evita que el pseudo-elemento interfiera con la interacción del usuario
          margin:'-2px'
        },
        '.border-dashed-custom': {
          position: 'relative',
          margin:'10px',
          backgroundColor:'var(--color-plata-suave)'
        },
      
        '.loading-bar-mini':{
          width: 0,
          transition: "width 3s ease-in-out"
        },
        '.loading-bar-mini.loading':{
          width:"95%"
        },
        '.loading-bar-mini.full_loading':{
          width:"100%"
        },
        '.hidden-boxes':{
            opacity: 0,
            visibility: "hidden",
            transition: "opacity 0.3s ease, visibility 0.3s ease"
        },
        '.hidden-boxes.show':{
            opacity: 1,
            visibility: "visible",
        },
        '.hover_to_dark:hover img.affected':{
            filter: "brightness(0) invert(1)"
        },
        
        '.dark .hover_to_dark img.affected':{
            filter: "brightness(0) invert(1)"
        },
        '.animate-tw-pulse': {
          animation: 'pulse-tw 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        '@keyframes pulse-tw': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': { 
            opacity: '.5',
          },
        },
      }
      
      const placeholderSize = {
        '.placeholder-text-xs::placeholder':{
          fontSize: '12px',
        }
      }
      
      
      const transiciones = {
        '.transicion-up-down':{
          maxHeight: 0,
          opacity: 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease-out, margin-top 0.3s ease-out, opacity 0.3s ease-out"
        }
      }
      const yunoCustom = {

        ".dark .yuno-payment-list__radiogroup":{
          backgroundColor:"var(--color-dark2)!important"
        },
        ".dark .yuno-payment-list__radio-card":{
          backgroundColor:"var(--color-dark2)!important",
          
        },
        ".dark .yuno-payment-list__payment-method":{
          color: "white !important"
        }
      }
      
      
      
      
      
      addUtilities(multilineTruncate, ['responsive', 'hover']);
      addUtilities(badges, ['responsive', 'hover']);
      addUtilities(cards, ['responsive', 'hover']);
      addUtilities(botones, ['responsive', 'hover','disabled']);
      addUtilities(contenedores, ['responsive', 'hover']);
      addUtilities(iconClasses, ['responsive', 'hover']);
      addUtilities(modal, ['responsive', 'hover']);
      addUtilities(customStyles,['responsive','hover','before','after','animate']);
      addUtilities(placeholderSize,['responsive','hover','focus'])
      addUtilities(transiciones,['responsive','hover','focus'])
      addUtilities(yunoCustom,['responsive','hover','focus'])
    }
  ],
}

  