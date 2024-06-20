import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { productValidator } from './middlewares/productValidator.js';
import { initMongoDB } from './daos/mongodb/connection.js';
import { deleteRealTimeProducts, postRealTimeProducts } from './controllers/realtime.ctrl.js';

import MessageManager from './daos/filesystem/manager/messages.manager.js';
// const messageManager = new MessageManager(`${__dirname}/daos/filesystem/data/messages.json`); // Va a tener que ir con Mongo...
import MessageManagerMongo from './daos/mongodb/messages.manager.js';
const messageManager = new MessageManagerMongo();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.use(errorHandler);

initMongoDB();

const httpServer = app.listen(8080, () => console.log('Server Ok on port 8080'));
const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
    socketServer.emit('messages', await messageManager.getAll());
    
    socket.on('disconnect', () => console.log(`Cliente desconectado: ${socket.id}`));

    socket.on('newUser', (user)=>{
        console.log(`> ${user} ha iniciado sesión`);
        socket.emit('newUser', user);
    })

    socket.on('chat:message', async(msg)=>{
        await messageManager.createMsg(msg);
        socketServer.emit('messages', await messageManager.getAll());
    })

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data)
    })

});

app.post('/realtimeproducts', productValidator, postRealTimeProducts(socketServer));
app.delete('/realtimeproducts/:pid', deleteRealTimeProducts(socketServer));
