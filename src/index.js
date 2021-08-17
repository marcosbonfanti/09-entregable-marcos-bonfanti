import express from 'express';
import path from 'path';
import routerProductos from './routes/productos.js';
import handlebars from 'express-handlebars';
import * as http from 'http';
import io from 'socket.io';


const puerto = 8080;

const app = express();

const myServer = http.Server(app);

myServer.listen(puerto, () => console.log('Server up en puerto', puerto));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));


const products = [];
const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPath = path.resolve(__dirname, '../views/layouts/index.hbs');
const partialFolderPath = path.resolve(__dirname, '../views/partial');
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutFolderPath,
    partialsDir: partialFolderPath,
    defaultLayout: defaultLayerPath,
    extname: 'hbs',
  })
);

app.use('/api/productos', routerProductos);

app.get('/', (req, res) => {
  const datosDinamicos = { 
    productos: products
  }
  res.render('main', datosDinamicos);
});

const myWSServer = io(myServer);

myWSServer.on('connection', function (socket) {
  console.log('\n\nUn cliente se ha conectado');
  console.log(`ID DEL SOCKET DEL CLIENTE => ${socket.client.id}`);
  console.log(`ID DEL SOCKET DEL SERVER => ${socket.id}`);

  socket.on('new-message', function (data) {
    console.log(data); 
    products.push(data); 

    //PARA ENVIARLE EL MENSAJE A TODOS
    myWSServer.emit('products', products);

  });

  socket.on('askData', (data) => {
    console.log('ME LLEGO DATA');
    socket.emit('products', products);
  });  
});


