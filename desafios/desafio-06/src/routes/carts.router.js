import { Router } from "express";
import * as controllers from '../controllers/carts.controllers.js';

const router = Router();

router.post('/', controllers.addCart);

router.post('/:cid/product/:pid', controllers.addProductToCart);

router.get('/', controllers.getCarts);

router.get('/:cid', controllers.getCartById);

router.delete('/:cid/products/:pid', controllers.deleteProductToCart);

router.put('/:cid', controllers.updateCart);

router.put('/:cid/products/:pid', controllers.updateProductToCart);

router.delete('/:cid', controllers.deleteCart)

export default router;