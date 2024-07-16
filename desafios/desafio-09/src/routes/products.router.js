import { Router } from "express";
import { productValidator } from "../middlewares/productValidator.js";
import * as controllers from '../controllers/products.controllers.js';

const router = Router();

router
    .get('/', controllers.getProducts)
    .post('/', productValidator, controllers.addProduct);

router.route('/:pid')
    .get(controllers.getProductById)
    .put(controllers.updateProduct)
    .delete(controllers.deleteProduct);

export default router;