import socketIo from 'socket.io';
import moment from 'moment';

export const initWSServer = (server) => {
    const myWSServer = socketIo(server);
    const products = [];
    let messages = [];
    
    myWSServer.on('connection', (socket) => {
        console.log('Nueva Conexion establecida!');

        socket.on('new-product', function (data) {
            console.log(data); 
            products.push(data); 
        
            //PARA ENVIARLE EL MENSAJE A TODOS
            myWSServer.emit('products', products);
        
        });        

        socket.on('askProducts', (data) => {
            console.log('ME LLEGO DATA');
            socket.emit('products', products);
        });

        socket.on('new-message', (data) => {
            console.log(data)
            const now = new Date();
            let message = [{
                email: data.email,
                date: moment(now).format('DD/MM/YYYY HH:MM:SS'),
                text: data.text
            }]
            messages.push(message)
            myWSServer.emit('updateChat', message);
        });

        socket.on('askMessages', () => {
            console.log('Envie los Messages');
            if (messages.length > 0) {
                socket.emit('updateChat', messages);
              }
        });        
    
    });

    return myWSServer;
};    

