import { Router } from "express";
import * as controllers from '../controllers/cart.controllers.js';

const router = Router();

router.post('/', controllers.addCart);

router.post('/:cid/product/:pid', controllers.addProductToCart);

router.get('/', controllers.getCarts);

router.get('/:cid', controllers.getCartById);

export default router;