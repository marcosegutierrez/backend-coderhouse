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
    console.log(`cliente conectado: ${socket.id}`);

    socket.on('disconnect', () => console.log(`cliente desconectado`));
  
    app.post('/realtimeproducts', productValidator, async (req, res) => {
        const product = req.body;
        const newProduct = await productsManager.addProduct(product);
        //const products = await productsManager.getProducts();
        socketServer.emit('newProduct', newProduct);
        res.send('Producto enviado al socket del cliente');
    })

    app.delete('/realtimeproducts/:pid', async (req, res) => {
        try {
            const {pid} = req.params;
            await productsManager.deleteProduct(parseInt(pid));
            const products = await productsManager.getProducts();
            socketServer.emit('deleteProduct', products);
            res.send('Productos enviados al socket del cliente');
        } catch (error) {
            next(error);
        }
    })
});