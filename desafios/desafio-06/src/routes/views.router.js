import { Router } from "express";
import ProductsManagerFS from "../daos/filesystem/manager/products.manager.js";
import { __dirname } from "../utils.js";

const router = Router();
const productsManager = new ProductsManagerFS(`${__dirname}/daos/filesystem/data/products.json`);

// router.get('/', async (req, res, next) => {
//     try {
//         const { limit } = req.query;
//         let products = await productsManager.getProducts();
//         if (limit) {
//             products = products.slice(0, limit)
//         }
//         res.render('home', { products });
//     } catch (error) {
//         next(error);
//     }
// })

router.get('/', async (req, res, next) => {
    try {
        res.render('login');
    } catch (error) {
        next(error);
    }
})

router.get('/realtimeproducts', async (req, res, next) => {
    try {
        const products = await productsManager.getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        next(error);
    }
})

router.get('/chat', (req, res) => {
    res.render('chat')
});

router.get("/login", (req, res) => {
    res.render('login');
});

router.get("/register", (req, res) => {
    res.render('register');
});

router.get("/profile", (req, res) => {
    console.log(req.session)
    res.render('profile');
});

export default router;