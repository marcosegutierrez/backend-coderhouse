import { Router } from "express";
// import ProductsManagerFS from "../daos/filesystem/manager/products.manager.js";
import { 
    realTimeProducts, 
    viewChat, 
    viewLogin, 
    viewProfile, 
    viewRegister, 
    viewUpdatePass} from "../controllers/views.controller.js";

const router = Router();

// const productsManager = new ProductsManagerFS(`${__dirname}/daos/filesystem/data/products.json`);

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

router.get('/', viewLogin);

router.get("/login", viewLogin);

router.get("/register", viewRegister);

router.get("/profile", viewProfile);

router.get('/realtimeproducts', realTimeProducts)

router.get('/chat', viewChat);

router.get('/updatepass', viewUpdatePass);

export default router;