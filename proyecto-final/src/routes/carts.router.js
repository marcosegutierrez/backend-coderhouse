import { Router } from "express";
import CartsManager from "../manager/carts.manager.js";
import { __dirname } from "../utils.js";

const router = Router();
const cartsManager = new CartsManager(`${__dirname}/data/carts.json`);

router.post('/', async (req, res, next) => {
    try {
        const cart = await cartsManager.addCart();
        if(cart) return res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
})

router.post('/:cid/product/:pid', async (req, res, next) => {
    try {
        const {cid, pid} = req.params;
        const cart = await cartsManager.addProductToCart(parseInt(pid), parseInt(cid));
        if(cart) return res.status(200).json(cart);
        return res.status(404).json({msg: 'Product or cart not exist'});
    } catch (error) {
        next(error);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const carts = await cartsManager.getCarts();
        if(carts) return res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
})

router.get('/:cid', async (req, res, next) => {
    try {
        const {cid} = req.params;
        const cart = await cartsManager.getCartById(parseInt(cid));
        if(cart) return res.status(200).json(cart.products);
        return res.status(404).json({msg: "Cart not found"});
    } catch (error) {
        next(error);
    }
})

export default router;