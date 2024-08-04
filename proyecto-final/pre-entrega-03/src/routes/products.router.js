import { Router } from "express";
import { productValidator } from "../middlewares/productValidator.js";
import * as controllers from '../controllers/products.controllers.js';
import { checkAdmin } from "../middlewares/checkAdmin.js";

const router = Router();

router
    .get('/', controllers.getProducts)
    .post('/', [checkAdmin, productValidator], controllers.addProduct);

router.route('/:pid')
    .get(controllers.getProductById)
    .put(checkAdmin, controllers.updateProduct)
    .delete(checkAdmin, controllers.deleteProduct);

export default router;