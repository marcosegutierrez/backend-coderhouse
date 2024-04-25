import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const john = new ProductManager('./john-pm.json');


app.get('/products', async (req, res) => {
    try {
        const {limit} = req.query;
        const products = await john.getProducts();
        if (limit) {
            res.json(products.slice(0,limit));
        } else res.json(products);
    } catch (error) {
        console.log(error);
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        const product = await john.getProductById(parseInt(pid));
        if (typeof product === 'object')  {
            res.json(product);
        } else res.json({"Error": product});
    } catch (error) {
        console.log(error);
    }
})

app.listen(8080, () => console.log('Server OK corriendo en puerto 8080'));
