import path from 'path';
const fs = require('fs');
const publicPathFolder = path.resolve(__dirname, './../../public/');
const publicPathFileName = path.resolve(
  __dirname,
  './../../public/mensajes.txt'
);


//Función para generar un numero aleatorio.
const random = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

//Generando el contenido
const contenido = () => {
  let obj = {
    producto: `Producto ${Math.floor(random(1, 10))}`,
    precio: `${random(0.0, 9999.99).toFixed(2)}`,
    url: `https://picsum.photos/id/${Math.floor(random(1, 200))}/200/200`,
    id: ``,
  };
  return obj;
};

//stringify el contenido para el Item.
const objToJSON = (contenido) => {
  return JSON.stringify(contenido, undefined, 2);
};

//Leer y devolver los mensajes en caso de que exista archivo de Mensaje.
function leerMessages() {
  let filenames = fs.readdirSync(publicPathFolder);
  const found = filenames.find((element) => 'mensajes.txt' === element);
  if (found === 'mensajes.txt') {
    const data = fs.readFileSync(publicPathFileName, 'utf-8');
    return data;
  } else {
    return -1;
  }
};

// Archivo a guardar con formato JSON
function guardarMessages(msn) {
  fs.writeFileSync(publicPathFileName, objToJSON(msn), 'utf-8');
};


export { random, contenido, objToJSON, leerMessages, guardarMessages };
