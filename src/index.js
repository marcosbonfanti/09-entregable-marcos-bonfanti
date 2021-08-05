import express from 'express';
import path from 'path';
import routerProductos from './routes/productos.js';


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

app.use('/api/productos', routerProductos);

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
