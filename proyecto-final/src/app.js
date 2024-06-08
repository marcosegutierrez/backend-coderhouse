import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js'
import { errorHandler } from './middlewares/errorHandler.js';
import 'dotenv/config';
import { initMongoDB } from './daos/mongodb/connection.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use(errorHandler);

initMongoDB();

app.listen(8080, () => console.log('Server Ok on port 8080'));