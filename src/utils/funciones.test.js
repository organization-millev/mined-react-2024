import { obtenerInfoDispositivo, tipodocumento_a_descripcion, formatearFechaIziPay, convertirMonedas, mapeoArrayItems, convertToUtf8 } from './funciones';

describe('Funciones', () => {

  test('obtenerInfoDispositivo debería retornar el tipo y sistema operativo correcto', () => {
    // Mock para simular el userAgent de un sistema Windows con Chrome
    global.navigator = {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
    };

    const result = obtenerInfoDispositivo();

    // Verificar que el tipo de dispositivo es 'desktop'
    expect(result.tipoDispositivo).toBe('desktop');
  
  });

  test('tipodocumento_a_descripcion debería devolver la descripción correcta según el tipo de documento', () => {
    expect(tipodocumento_a_descripcion("1")).toEqual({ desc: "D.N.I.", izidesc: "DNI" });
    expect(tipodocumento_a_descripcion("2")).toEqual({ desc: "C.I.", izidesc: "CI" });
    expect(tipodocumento_a_descripcion("9")).toEqual({ desc: "SIN DOCUMENTO", izidesc: "SIN DOCUMENTO" });
    expect(tipodocumento_a_descripcion("100")).toEqual({ desc: null, izidesc: null });
  });

  test('formatearFechaIziPay debería retornar la fecha y hora correctamente formateadas', () => {
    const date = "20230101";
    const time = "123456";
    const result = formatearFechaIziPay(date, time);
    expect(result).toBe('2023/01/01 12:34:56');
  });

  test('convertirMonedas debería devolver el símbolo correcto de la moneda', () => {
    expect(convertirMonedas("USD")).toBe("$");
    expect(convertirMonedas("PEN")).toBe("S/.");
    expect(convertirMonedas("EUR")).toBe("$");
  });

  test('mapeoArrayItems debería mapear las claves correctamente', () => {
    const items = [
      { nombre: "Juan", edad: 25 },
      { nombre: "Maria", edad: 30 }
    ];
    const keyMap = { nombre: "nombre_completo", edad: "edad_anios" };

    const result = mapeoArrayItems(items, keyMap);
    expect(result).toEqual([
      { nombre_completo: "Juan", edad_anios: 25 },
      { nombre_completo: "Maria", edad_anios: 30 }
    ]);
  });

  test('convertToUtf8 debería convertir las cadenas Unicode correctamente', () => {
    const input = '\\u0048\\u0065\\u006C\\u006C\\u006F'; // "Hello" en Unicode
    const result = convertToUtf8(input);
    expect(result).toBe('Hello');
  });
});
