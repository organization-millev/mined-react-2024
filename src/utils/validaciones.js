/**
 * Valida si un valor está en blanco y retorna un objeto con el resultado y un mensaje personalizado.
 * @param {string} valor - El valor a validar.
 * @param {string} mensajeError - El mensaje de error personalizado a retornar si el valor está en blanco.
 * @returns {Object} Un objeto que contiene un booleano indicando si el valor es válido y un mensaje de error si corresponde.
 */
export function validarEnBlanco(valor, mensajeError) {
  // Verifica si el valor está en blanco (null, undefined, o string vacío)
  if (valor === null || valor === undefined || valor.trim() === '') {
    return { valido: false, mensaje: mensajeError };
  } else {
    return { valido: true, mensaje: '' }; // No hay error, valor no está en blanco
  }
}


export const validarEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
};



export const validarNumeroTelefono = (numero) => {
  const re = /^[0-9]+$/; // Solo permite números
  return re.test(numero) && numero.length <= 10; // Permite hasta 10 dígitos
};



// Función para validar un número de teléfono peruano con una expresión regular.
// Asume que el número debe comenzar con 9 y tener 9 dígitos en total.
export const validarTelefonoPeruano = (telefono) => {
  const re = /^9\d{8}$/;
  return re.test(telefono);
};


/**
 * Función para validar una fecha de nacimiento y verificar que la persona tenga entre 18 y 90 años.
 * @param {string} fecha - La fecha de nacimiento en formato dd/mm/yyyy.
 * @returns {boolean} Devuelve true si la fecha es válida y la persona tiene entre 18 y 90 años; de lo contrario, devuelve false.
 */
export function validarFecha(fecha) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(fecha)) {
    
    return false;
  }

  const partesFecha = fecha.split('/');
  const fechaNacimiento = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);
  const fechaActual = new Date();

  let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  const mesActual = fechaActual.getMonth();
  const diaActual = fechaActual.getDate();

  // Ajuste si el mes actual es menor que el mes de nacimiento
  // o si estamos en el mismo mes pero el día actual es menor que el día de nacimiento
  if (mesActual < fechaNacimiento.getMonth() || 
     (mesActual === fechaNacimiento.getMonth() && diaActual < fechaNacimiento.getDate())) {
    edad--;
  }

  
  if (edad >= 18 && edad <= 90) {
    return true;
  } else {
    
    return false;
  }
}


export function validarDocumento(tipoDoc, valor) {
  if (tipoDoc==1) {
    return validarDNI(valor);
  }else if (tipoDoc==2) {
    return validarCI(valor);
  }else if (tipoDoc==3) {
    return validarCE(valor);
  }else if (tipoDoc==4) {
    return validarPASAPORTE(valor);
  }else if (tipoDoc==5) {
    return validarRUC(valor);
  }else if (tipoDoc==6) {
    return validarPTP(valor);
  }
  return true; // Si no hay regla específica, asume que es válido
}

// Función para validar un número de DNI peruano (8 dígitos).
export function validarDNI(valor) {
  // Suponiendo que D.N.I. tiene 8 dígitos y solo contiene números
  return /^\d{8}$/.test(valor);
}

export function validarCI(valor) {
  // Suponiendo que C.I. tiene una longitud y formato específicos
  return true /* lógica de validación para C.I. */;
}

export function validarCE(valor) {
  // Lógica para validar C.E.
  // 9 dígitos alfanuméricos
  return /^[A-Za-z0-9]{9}$/.test(valor);
}

export function validarPASAPORTE(valor) {
  // Lógica para validar C.E.
  // 12 dígitos numéricos
  // return true; //mayusculas y de 5 a12 caracteres
   return /^[A-Z0-9]{5,12}$/.test(valor);
}


export function validarRUC(valor) {
  // Lógica para validar C.E.
  return true /* lógica de validación para C.E. */;
}

export function validarPTP(valor) {
  // Lógica para validar C.E.
  // 9 dígitos numéricos
  return /^\d{9}$/.test(valor);
}
       
/*** clave ***/

/**
 * Verifica si una clave contiene todos los dígitos iguales.
 * 
 * @param {string} clave - La clave a validar.
 * @returns {boolean} - Verdadero si todos los dígitos son iguales; de lo contrario, falso.
 */
export function tieneDigitosIguales(clave) {
  return /(\d).*\1/.test(clave);
}

function todosDigitosIguales(clave) {
  // Verifica si todos los dígitos son iguales
  if (/^(\d)\1*$/.test(clave)) {
    return true;
  }

  // Verifica si hay más de tres números adyacentes repetidos
  for (let i = 0; i < clave.length - 3; i++) {
    if (clave[i] === clave[i + 1] && clave[i + 1] === clave[i + 2] && clave[i + 2] === clave[i + 3]) {
      return true;
    }
  }
  return false;
}

/**
 * Determina si la clave coincide con alguna fecha de nacimiento en varios formatos.
 * 
 * @param {string} clave - La clave a validar.
 * @param {string} fechaNacimiento - La fecha de nacimiento del usuario en formato "YYYY-MM-DD".
 * @returns {boolean} - Verdadero si la clave coincide con alguna fecha de nacimiento; de lo contrario, falso.
 */
export function esFechaOAnioNacimiento(clave, fechaNacimiento) {
  // Aquí deberías convertir la fecha de nacimiento a diferentes formatos
  // y verificar si alguno de estos formatos coincide con la clave.
  // Este es un ejemplo simplificado.
  const formatosFecha = generarFormatosFecha(fechaNacimiento);
  
  
  return formatosFecha.includes(clave);
}

/**
 * Verifica si una clave es capicúa.
 * 
 * @param {string} clave - La clave a validar.
 * @returns {boolean} - Verdadero si la clave es capicúa; de lo contrario, falso.
 */
export function esCapicua(clave) {
  return clave === clave.split('').reverse().join('');
}

/**
 * Comprueba si la clave contiene números consecutivos, ya sea en orden ascendente o descendente.
 * 
 * @param {string} clave - La clave a validar.
 * @returns {boolean} - Verdadero si la clave contiene números consecutivos; de lo contrario, falso.
 */
export function esConsecutivo(clave) {
  const ascendente = '01234567890';
  const descendente = '09876543210';
  return ascendente.includes(clave) || descendente.includes(clave);
}

/**
 * Verifica si la clave de 6 dígitos está contenida en el DNI o en su secuencia inversa.
 * 
 * @param {string} clave - La clave de 6 dígitos a validar.
 * @param {number} dni - El DNI del usuario como un número entero.
 * @returns {boolean} - Verdadero si la clave no está contenida en el DNI ni en su secuencia inversa; de lo contrario, falso.
 */
function validarClaveDni(clave, dni) {
  const dniStr = dni

  // Crear la secuencia descendente del DNI
  const dniDescendente = dniStr.split('').reverse().join('');

  // Verificar que la clave no esté contenida en las secuencias ascendente y descendente del DNI
  if (dniStr.includes(clave) || dniDescendente.includes(clave)) {
    return false;
  }
  return true;
}

/**
 * Verifica si la clave de 6 dígitos está contenida en el número de teléfono o en su secuencia inversa.
 * 
 * @param {string} clave - La clave de 6 dígitos a validar.
 * @param {number} telefono - El número de teléfono del usuario como un número entero.
 * @returns {boolean} - Verdadero si la clave no está contenida en el número de teléfono ni en su secuencia inversa; de lo contrario, falso.
 */
function validarClaveTelefono(clave, telefono) {
  const telefonoStr = telefono

  // Crear la secuencia descendente del teléfono
  const telefonoDescendente = telefonoStr.split('').reverse().join('');

  // Verificar que la clave no esté contenida en las secuencias ascendente y descendente del teléfono
  if (telefonoStr.includes(clave) || telefonoDescendente.includes(clave)) {
    return false;
  }
  return true;
}


/**
 * Genera todos los formatos de fecha de nacimiento posibles de una fecha dada.
 * 
 * @param {string} fechaNacimiento - La fecha de nacimiento en formato "YYYY-MM-DD".
 * @returns {Array<string>} - Un arreglo de cadenas con todos los formatos de fecha posibles.
 */
export function generarFormatosFecha(fechaNacimiento) {
  const [dia, mes, ano] = fechaNacimiento.split('/').map(num => parseInt(num, 10));

  const diaStr = dia.toString().padStart(2, '0');
  const mesStr = mes.toString().padStart(2, '0');
  const anoStr = ano.toString();
  const anoInicio = anoStr.slice(0, 2); // Primeros dos dígitos del año
  const anoFin = anoStr.slice(2); // Últimos dos dígitos del año

  // Genera todas las combinaciones posibles de día, mes y año.
  return [
    diaStr + mesStr + anoFin,    // DDMMYY (últimos dos dígitos del año)
    mesStr + diaStr + anoFin,    // MMDDYY
    anoFin + mesStr + diaStr,    // YYMMDD
    anoFin + diaStr + mesStr,    // YYDDMM
    mesStr + anoFin + diaStr,    // MMYYDD
    diaStr + anoFin + mesStr,    // DDYYMM
    diaStr + mesStr + anoInicio, // DDMMYY (primeros dos dígitos del año)
    mesStr + diaStr + anoInicio, // MMDDYY
    anoInicio + mesStr + diaStr, // YYMMDD
    anoInicio + diaStr + mesStr, // YYDDMM
    mesStr + anoInicio + diaStr, // MMYYDD
    diaStr + anoInicio + mesStr, // DDYYMM
    
    diaStr + mesStr + anoFin,    // DDMMAA (últimos dos dígitos del año)
    anoFin + mesStr + diaStr,    // AAMMDD
    mesStr + diaStr + anoFin,    // MMDDAA
    mesStr + anoFin + diaStr,    // MMAADD
    anoInicio + mesStr + anoFin, // AAAAMM
    anoInicio + diaStr + anoFin, // AAAADD
    mesStr + anoInicio + anoFin, // MMAAAA
    diaStr + anoInicio + anoFin, // DDDAAA
  ];
}

/**
 * Valida una clave contra una serie de criterios específicos y devuelve si es válida y un mensaje de validación.
 * 
 * @param {string} clave - La clave a validar.
 * @param {Object} datosUsuario - Información del usuario para la validación, incluyendo fecha de nacimiento, DNI y celular.
 * @param {Object} mensajesValidacion - Mensajes personalizados para cada tipo de validación fallida.
 * @returns {Object} - Un objeto que contiene un booleano `esValida` y un `mensaje` de validación.
 */

export function validarClave(clave, datosUsuario, mensajesValidacion) {
  

  // Verificar si datosUsuario tiene datos antes de realizar validaciones específicas
  if (datosUsuario && datosUsuario.fechaNacimiento) {
    if (esFechaOAnioNacimiento(clave, datosUsuario.fechaNacimiento)) {
      return { esValida: false, mensaje: mensajesValidacion.fechaNacimiento };
    }
  }

  if (esCapicua(clave)) {
    return { esValida: false, mensaje: mensajesValidacion.capicua };
  }
  
  

  if (datosUsuario && datosUsuario.dni) {
    if (!validarClaveDni(clave, datosUsuario.dni)) {
      return { esValida: false, mensaje: mensajesValidacion.dniInvalido };
    }
  }
  
  if (datosUsuario && datosUsuario.numeroCelular) {
    if (!validarClaveTelefono(clave, datosUsuario.numeroCelular)) {
      return { esValida: false, mensaje: mensajesValidacion.telefonoInvalido };
    }
  }
  
  if (esConsecutivo(clave)) {
    return { esValida: false, mensaje: mensajesValidacion.consecutivo };
  }
   
  if (todosDigitosIguales(clave)) {
    return { esValida: false, mensaje: mensajesValidacion.digitosIguales };
  }

  return { esValida: true, mensaje: "La clave es válida." };
}



export function validarEntrada (texto) {
  // Define una lista de patrones peligrosos y sus mensajes asociados
  const patronesPeligrosos = [
    { patron: /--/, mensaje: 'Comentarios de SQL no permitidos' },
    { patron: /;/, mensaje: 'Punto y coma no permitido' },
    { patron: /'/, mensaje: 'Comillas simples no permitidas' },
    { patron: /"/, mensaje: 'Comillas dobles no permitidas' },
    { patron: /\\/, mensaje: 'Caracteres de escape no permitidos' },
    { patron: /OR/i, mensaje: 'Operador lógico OR no permitido' },
    { patron: /AND/i, mensaje: 'Operador lógico AND no permitido' },
    { patron: /SELECT/i, mensaje: 'Instrucción SELECT no permitida' },
    { patron: /INSERT/i, mensaje: 'Instrucción INSERT no permitida' },
    { patron: /UPDATE/i, mensaje: 'Instrucción UPDATE no permitida' },
    { patron: /DELETE/i, mensaje: 'Instrucción DELETE no permitida' },
    { patron: /DROP/i, mensaje: 'Instrucción DROP no permitida' },
    { patron: /TRUNCATE/i, mensaje: 'Instrucción TRUNCATE no permitida' },
  ];

  // Verifica si el texto contiene alguno de los patrones peligrosos
  const patronEncontrado = patronesPeligrosos.find((item) => item.patron.test(texto));
  if (patronEncontrado) {
    return { valido: false, mensaje: patronEncontrado.mensaje };
  }

  return { valido: true, mensaje: '' }; // Retorna verdadero y una cadena vacía si no se encuentra ningún patrón peligroso
};


export function validarCodigo(codigo) {
  // Expresión regular para validar el formato
  const regex = /^[0-9A-Z]{10}$/;
  return regex.test(codigo);
};


/**
 * Valida si un valor es un número entero.
 * @param {string} valor - El valor a validar.
 * @param {string} mensajeError - El mensaje de error personalizado a retornar si el valor no es un número entero.
 * @returns {Object} Un objeto que contiene un booleano indicando si el valor es válido y un mensaje de error si corresponde.
 */
export function validarNumeroEntero(valor, mensajeError) {
  // Verifica si el valor es un número entero
  if (!Number.isInteger(Number(valor))) {
    return { valido: false, mensaje: mensajeError };
  } else {
    return { valido: true, mensaje: '' }; // No hay error, valor es un número entero
  }
}

export function validarDocumentoMaxLength(tipoDoc, valor) {
  if (tipoDoc==1) {
    return 8;
  }else if (tipoDoc==2) {
    return 12;
  }else if (tipoDoc==3) {
    return 9;
  }else if (tipoDoc==4) {
    return 12;
  }else if (tipoDoc==5) {
    return 12;
  }else if (tipoDoc==6) {
    return 12;
  }
  return true; // Si no hay regla específica, asume que es válido
}

