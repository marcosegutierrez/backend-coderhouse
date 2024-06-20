import { Router } from "express";
import { productValidator } from "../middlewares/productValidator.js";
import * as controllers from '../controllers/products.controllers.js';

const router = Router();

router.get('/', controllers.getProducts);

router.get('/:pid', controllers.getProductById);

router.post('/', productValidator, controllers.addProduct);

router.put('/:pid', controllers.updateProduct);

router.delete('/:pid', controllers.deleteProduct);

export default router;