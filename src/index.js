import express from 'express';
import path from 'path';
import routerProductos from './routes/productos.js';
import handlebars from 'express-handlebars';


const puerto = 8080;

const app = express();

const server = app.listen(puerto, () =>
  console.log('Server Up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR =>', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// app.get('/vista', (request, response) => {
//   let products = [];
//   response.render('main', products);
// });   

