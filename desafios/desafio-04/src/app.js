import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ProductsManager from './manager/products.manager.js';
import { productValidator } from './middlewares/productValidator.js';

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

const httpServer = app.listen(8080, () => console.log('Server Ok on port 8080'));
const socketServer = new Server(httpServer);

const productsManager = new ProductsManager(`${__dirname}/data/products.json`);

socketServer.on('connection', (socket) => {
    console.log(`usuario conectado: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`usuario desconectado`);
    })

    app.get('/realtimeproducts', async (req, res, next) => {
        try {
            const products = await productsManager.getProducts();
            res.render('realTimeProducts');
        } catch (error) {
            next(error);
        }
    })

    app.post('/realtimeproducts', async (req, res) => {
        const product = req.body;
        const newProduct = await productsManager.addProduct(product);
        const products = await productsManager.getProducts();
        socketServer.emit('productos', products);
        res.send('Productos enviados al socket del cliente');
    })
});