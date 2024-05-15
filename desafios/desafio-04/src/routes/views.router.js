import { Router } from "express";
import ProductsManager from "../manager/products.manager.js";
import { __dirname } from "../utils.js";

const router = Router();
const productsManager = new ProductsManager(`${__dirname}/data/products.json`);

router.get('/home', async (req, res, next) => {
    try {
        const {limit} = req.query;
        let products = await productsManager.getProducts();
        if (limit) {
            products = products.slice(0,limit)
        }
        res.render('home', {products});
    } catch (error) {
        next(error);
    }
})

// router.get('/realtimeproducts', async (req, res, next) => {
//     try {
//         const products = await productsManager.getProducts();
//         res.render('realTimeProducts', {products});
//     } catch (error) {
//         next(error);
//     }
// })

export default router;