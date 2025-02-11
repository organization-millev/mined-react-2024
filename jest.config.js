/*module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};*/

module.exports = {
    
    transform: {
      "^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",  // Utiliza Babel para transformar los archivos JS/TS.
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(axios|react-doc-viewer)/)", // Transforma explícitamente axios si es necesario.
    ],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mapea archivos CSS para evitar errores.
      "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js", // Mock de imágenes.
    }
  };
  
 
