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

app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);

app.use('/api/productos', routerProductos);

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

