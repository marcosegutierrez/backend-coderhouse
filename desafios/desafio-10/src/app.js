import express from 'express';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { productValidator } from './middlewares/productValidator.js';
import { initMongoDB } from './persistence/daos/mongodb/connection.js';

import { deleteRealTimeProducts, postRealTimeProducts } from './controllers/realtime.ctrl.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import passport from 'passport';
import './passport/local-strategy.js';
import './passport/github-strategy.js';
import config from './config.js';

import MessageManager from './persistence/daos/filesystem/manager/messages.manager.js';
// const messageManager = new MessageManager(`${__dirname}/persistence/daos/filesystem/data/messages.json`);
import MessageManagerMongo from './persistence/daos/mongodb/messages.manager.js';
const messageManager = new MessageManagerMongo();

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        crypto: { secret: config.SECRET_KEY },
        ttl: 180,
    }),
    secret: config.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};

const app = express();

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
});

app
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(cookieParser())
    .use(session(storeConfig))
    .use(express.static(__dirname + '/public'));

app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app
    .use(passport.initialize())
    .use(passport.session())
    .use('/', router)
    .use(errorHandler);

initMongoDB();

const httpServer = app.listen(config.PORT, () => console.log(`Server Ok on port ${config.PORT}`));
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
