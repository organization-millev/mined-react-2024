export const obtenerInfoDispositivo = () => {
  const ua = navigator.userAgent;
  let sistemaOperativo = "Desconocido";
  let versionSO = "N/A";
  let navegador = "Desconocido";
  let versionNavegador = "N/A";
  let tipoDispositivo = "desktop";

  /*if (/windows/i.test(ua)) {
    sistemaOperativo = "Windows";
  } else if (/android/i.test(ua)) {
    sistemaOperativo = "Android";
    tipoDispositivo = "mobile";
  } else if (/linux/i.test(ua)) {
    sistemaOperativo = "Linux";
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    sistemaOperativo = "iOS";
    tipoDispositivo = "mobile";
  } else if (/mac os/i.test(ua)) {
    sistemaOperativo = "macOS";
  }*/
  
  // Detectar Sistema Operativo y su versión
  if (/windows nt 10.0/i.test(ua)) {
    sistemaOperativo = "Windows";
    versionSO = "10";
  } else if (/windows nt 6.3/i.test(ua)) {
    sistemaOperativo = "Windows";
    versionSO = "8.1";
  } else if (/windows nt 6.2/i.test(ua)) {
    sistemaOperativo = "Windows";
    versionSO = "8";
  } else if (/windows nt 6.1/i.test(ua)) {
    sistemaOperativo = "Windows";
    versionSO = "7";
  } else if (/android/i.test(ua)) {
    sistemaOperativo = "Android";
    tipoDispositivo = "mobile";
    const match = ua.match(/Android\s([0-9.]*)/);
    if (match) {
      versionSO = match[1];
    }
  } else if (/linux/i.test(ua)) {
    sistemaOperativo = "Linux";
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    sistemaOperativo = "iOS";
    tipoDispositivo = "mobile";
    const match = ua.match(/OS\s([0-9_]*)/);
    if (match) {
      versionSO = match[1].replace(/_/g, '.');
    }
  } else if (/mac os x/i.test(ua)) {
    sistemaOperativo = "macOS";
    const match = ua.match(/Mac OS X\s([0-9_.]*)/);
    if (match) {
      versionSO = match[1].replace(/_/g, '.');
    }
  } else if (/crOS/i.test(ua)) {
    sistemaOperativo = "Chrome OS";
  }
  
  // Detectar Navegador y su versión
  if (/chrome|crios|crmo/i.test(ua) && !/edge|edg|opr|opera/i.test(ua)) {
    navegador = "Chrome";
    versionNavegador = ua.match(/(?:chrome|crios|crmo)\/([0-9.]+)/i)?.[1] || "N/A";
  } else if (/firefox|fxios/i.test(ua)) {
    navegador = "Firefox";
    versionNavegador = ua.match(/(?:firefox|fxios)\/([0-9.]+)/i)?.[1] || "N/A";
  } else if (/safari/i.test(ua) && !/chrome|crios|crmo|opr|opera|edg/i.test(ua)) {
    navegador = "Safari";
    versionNavegador = ua.match(/version\/([0-9.]+)/i)?.[1] || "N/A";
  } else if (/edg/i.test(ua)) {
    navegador = "Edge";
    versionNavegador = ua.match(/edg\/([0-9.]+)/i)?.[1] || "N/A";
  } else if (/opr|opera/i.test(ua)) {
    navegador = "Opera";
    versionNavegador = ua.match(/(?:opr|opera)\/([0-9.]+)/i)?.[1] || "N/A";
  } else if (/msie|trident/i.test(ua)) {
    navegador = "Internet Explorer";
    versionNavegador = ua.match(/(?:msie |rv:)([0-9.]+)/i)?.[1] || "N/A";
  }
  
  // Combinar los detalles del sistema operativo y el navegador
  const detallesSistemaOperativo = `${sistemaOperativo} ${versionSO} / ${navegador} ${versionNavegador}`;

  // Detectar tipo de dispositivo: mobile, tablet, desktop
  if (/mobile/i.test(ua)) {
    tipoDispositivo = "mobile";
  } else if (/tablet/i.test(ua)) {
    tipoDispositivo = "tablet";
  }

  return {
    tipoDispositivo,             // mobile, tablet, desktop
    sistemaOperativo: detallesSistemaOperativo // Ejemplo: "Windows 10 / Chrome 92.0.4515.159"
  };
  // Otra lógica para determinar el tipo de dispositivo, si es necesario

  //return { sistemaOperativo, tipoDispositivo };
};

export const tipodocumento_a_descripcion = (tipo) =>{
  
  switch(tipo){
    case "1":
      return {"desc": "D.N.I.", "izidesc":"DNI" }
      break;
    case "2":
      return {"desc": "C.I.", "izidesc":"CI" }
      break;
    case "3":
      return {"desc": "C.E.", "izidesc":"CE" }
      break;
    case "4":
      return {"desc": "PASAPORTE", "izidesc":"PASAPORTE" }
      break;
    case "5":
      return {"desc": "R.U.C.", "izidesc":"RUC" }
      break;
    case "9":
      return {"desc": "SIN DOCUMENTO", "izidesc":"SIN DOCUMENTO" }
      break;
    case "6":
      return {"desc": "PTP", "izidesc":"PTP" }
      break;
    default:
      return {"desc":null, izidesc:null}
  }

};

export const formatearFechaIziPay = (dia,hora) => {
        
        try{
            var year = dia.slice(0, 4);
            var month = dia.slice(4, 6);
            var day = dia.slice(6, 8);
            
            var hour = hora.slice(0,2)
            var minute = hora.slice(2,4)
            var sec = hora.slice(4,6)
            
            return (year+"/"+month+"/"+day+" "+hour+":"+minute+":"+sec)
        }catch(ex){
            return ("")
        }
    }

export const convertirMonedas = (monedas) => {
  
  switch(monedas){
    case "USD":
      return "$"
    case "PEN":
      return "S/."
    default:
      return "$"
      
  }
  
}

export const mapeoArrayItems = (objeto,items_key_map) => {
      
      if (objeto === undefined ) return [] 
      
      return objeto.map(item => Object.keys(item).reduce((acc, key) => {
          const newKey = items_key_map[key] || key;
          acc[newKey] = item[key];
          return acc;
      },{}))
  }
  
  
  
export function convertToUtf8(input) {
  if (typeof input === 'string') {
    try {
      return input
        .replace(/\\u([\dA-F]{4})/gi, function (match, grp) {
          return String.fromCharCode(parseInt(grp, 16)); // Convierte de Unicode a UTF-8
        })
        .replace(/%u([\dA-F]{4})/gi, function (match, grp) {
          return String.fromCharCode(parseInt(grp, 16)); // Convierte de Unicode a UTF-8
        });
    } catch (error) {
      console.error('Error al convertir a UTF-8:', error);
      return input;
    }
  }
  return input;
}