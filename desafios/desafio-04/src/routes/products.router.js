import { Router } from "express";
import ProductsManager from "../manager/products.manager.js";
import { __dirname } from "../utils.js";
import { productValidator } from "../middlewares/productValidator.js";

const router = Router();
const productsManager = new ProductsManager(`${__dirname}/data/products.json`);

router.get('/', async (req, res, next) => {
    try {
        const {limit} = req.query;
        const products = await productsManager.getProducts();
        if (limit) {
            res.json(products.slice(0,limit));
        } else res.json(products);
    } catch (error) {
        next(error);
    }
})

router.get('/:pid', async (req, res, next) => {
    try {
        const {pid} = req.params;
        const product = await productsManager.getProductById(parseInt(pid));
        if (product) return res.status(200).json(product);
        return res.status(404).json({msg: 'Product not found'});
    } catch (error) {
        next(error);
    }
})

router.post('/', productValidator, async (req, res, next) => {
    try {
        const product = req.body;
        const newProduct = await productsManager.addProduct(product);
        res.status(200).json(newProduct);
    } catch (error) {
        next(error);
    }
})

router.put('/:pid', async (req, res, next) => {
    try {
        const product = req.body;
        const {pid} = req.params;
        const updateProduct = await productsManager.updateProduct(parseInt(pid), product);
        if (updateProduct) return res.status(200).json(updateProduct);
        res.status(404).json({msg: 'Product not found'});
    } catch (error) {
        next(error);
    }
})

router.delete('/:pid', async (req, res, next) => {
    try {
        const {pid} = req.params;
        const deleteProduct = await productsManager.deleteProduct(parseInt(pid));
        if (deleteProduct) return res.status(200).json({msg: 'Product successfully removed'});
        res.status(404).json({msg: 'Product not found'});
    } catch (error) {
        next(error);
    }
})

export default router;