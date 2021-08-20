import express from 'express';
import path from 'path';
import routerProductos from './routes/productos.js';
import handlebars from 'express-handlebars';
import * as http from 'http';
import { initWSServer } from './services/socket.js';


const puerto = 8080;

const app = express();

const myServer = http.Server(app);
initWSServer(myServer);
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




