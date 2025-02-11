import {
    validarEnBlanco,
    validarEmail,
    validarNumeroTelefono,
    validarTelefonoPeruano,
    validarFecha,
    validarDocumento,
    validarDNI,
    validarCI,
    validarCE,
    validarPASAPORTE,
    validarRUC,
    validarPTP,
    tieneDigitosIguales,
    esCapicua,
    esConsecutivo,
    validarClave,
    validarEntrada,
    validarCodigo,
    validarNumeroEntero,
    validarDocumentoMaxLength,
  } from './validaciones';
  
  describe('Funciones de validación', () => {
    test('validarEnBlanco debe retornar falso si el valor está vacío', () => {
      const result = validarEnBlanco('', 'El campo no puede estar vacío');
      expect(result.valido).toBe(false);
      expect(result.mensaje).toBe('El campo no puede estar vacío');
    });
  
    test('validarEnBlanco debe retornar verdadero si el valor no está vacío', () => {
      const result = validarEnBlanco('texto', 'El campo no puede estar vacío');
      expect(result.valido).toBe(true);
      expect(result.mensaje).toBe('');
    });
  
    test('validarEmail debe validar un correo correctamente', () => {
      expect(validarEmail('test@example.com')).toBe(true);
      expect(validarEmail('invalid-email')).toBe(false);
    });
  
    test('validarNumeroTelefono debe validar un número de teléfono correcto', () => {
      expect(validarNumeroTelefono('9876543210')).toBe(true);
    });
  
    test('validarTelefonoPeruano debe validar un teléfono peruano', () => {
      expect(validarTelefonoPeruano('987654321')).toBe(true);
      expect(validarTelefonoPeruano('123456789')).toBe(false);
    });
  
    test('validarFecha debe validar una fecha de nacimiento correcta', () => {
      expect(validarFecha('15/08/2000')).toBe(true); // 18 años cumplidos
      expect(validarFecha('15-08-2000')).toBe(false); // Formato incorrecto
    });
  
    test('validarDocumento debe validar el documento correctamente según el tipo', () => {
      expect(validarDocumento(1, '12345678')).toBe(true); // DNI válido
      expect(validarDocumento(3, '123456789')).toBe(true); // CE válido
      expect(validarDocumento(6, '123456789')).toBe(true); // PTP válido
    });
  
    test('validarDNI debe validar un DNI peruano de 8 dígitos', () => {
      expect(validarDNI('12345678')).toBe(true);
      expect(validarDNI('1234')).toBe(false);
      expect(validarDNI('123456789')).toBe(false);
    });
  
    test('validarCI debe validar el CI correctamente', () => {
      expect(validarCI('1234567890')).toBe(true);
    });
  
    test('validarCE debe validar un CE correctamente (9 alfanuméricos)', () => {
      expect(validarCE('A12345678')).toBe(true);
      expect(validarCE('1234567')).toBe(false);
    });
  
    test('validarPASAPORTE debe validar un pasaporte correctamente (5-12 caracteres alfanuméricos)', () => {
      expect(validarPASAPORTE('A12345')).toBe(true);
      expect(validarPASAPORTE('1234')).toBe(false);
      expect(validarPASAPORTE('A123456789012')).toBe(false);
    });
  
    test('validarPTP debe validar un PTP correctamente (9 dígitos numéricos)', () => {
      expect(validarPTP('123456789')).toBe(true);
      expect(validarPTP('12345')).toBe(false);
      expect(validarPTP('1234567890')).toBe(false);
    });
  
    test('tieneDigitosIguales debe retornar true si todos los dígitos son iguales', () => {
      expect(tieneDigitosIguales('111111')).toBe(true);
      expect(tieneDigitosIguales('123456')).toBe(false);
    });
  
    test('esCapicua debe retornar true si la clave es capicúa', () => {
      expect(esCapicua('12321')).toBe(true);
      expect(esCapicua('12345')).toBe(false);
    });
  
    test('esConsecutivo debe retornar true si la clave contiene números consecutivos', () => {
      expect(esConsecutivo('1234')).toBe(true); // Ascendente
      expect(esConsecutivo('4321')).toBe(true); // Descendente
      expect(esConsecutivo('1357')).toBe(false); // No consecutivos
    });
  
    test('validarClave debe retornar un mensaje adecuado si la clave es capicúa', () => {
      const mensajes = { capicua: 'La clave no puede ser capicúa' };
      const result = validarClave('12321', {}, mensajes);
      expect(result.esValida).toBe(false);
      expect(result.mensaje).toBe(mensajes.capicua);
    });
  
    test('validarEntrada debe validar si el texto contiene caracteres peligrosos', () => {
      const result = validarEntrada("SELECT * FROM users");
      expect(result.valido).toBe(false);
      expect(result.mensaje).toBe('Instrucción SELECT no permitida');
    });
  
    test('validarCodigo debe validar un código con formato correcto', () => {
      expect(validarCodigo('ABC1234567')).toBe(true);
    });
  
    test('validarNumeroEntero debe validar si el valor es un número entero', () => {
      expect(validarNumeroEntero('123', 'Debe ser un número entero')).toEqual({ valido: true, mensaje: '' });
      expect(validarNumeroEntero('123.45', 'Debe ser un número entero')).toEqual({ valido: false, mensaje: 'Debe ser un número entero' });
    });
  
    test('validarDocumentoMaxLength debe devolver la longitud máxima según el tipo de documento', () => {
      expect(validarDocumentoMaxLength(1, '12345678')).toBe(8);
      expect(validarDocumentoMaxLength(2, '123456789012')).toBe(12);
      expect(validarDocumentoMaxLength(3, '123456789')).toBe(9);
    });
  
  });
  