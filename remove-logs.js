const fs = require('fs');
const path = require('path');

// Directorio donde están tus archivos fuente (src por defecto en React)
const directory = path.join(__dirname, 'src');

// Función para eliminar console.log de los archivos
const removeLogs = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Si es un directorio, busca en su interior
      removeLogs(filePath);
    } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      // Si es un archivo .js o .jsx
      let content = fs.readFileSync(filePath, 'utf-8');
      const newContent = content.replace(/console\.log\(.*\);?/g, '');
      fs.writeFileSync(filePath, newContent, 'utf-8');
    }
  });
};

// Ejecuta la función para eliminar los console.log
removeLogs(directory);

console.log('Todos los console.log han sido eliminados.');