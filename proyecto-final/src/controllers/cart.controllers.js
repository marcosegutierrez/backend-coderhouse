import * as services from '../services/cart.services.js';

export const addCart = async (req, res, next) => {
    try {
        const cart = await services.addCart();
        if(cart) return res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}

export const getCarts = async (req, res, next) => {
    try {
        const carts = await services.getCarts();
        if(carts) return res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
}

export const getCartById = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const cart = await services.getCartById(parseInt(cid));
        if(cart) return res.status(200).json(cart.products);
        return res.status(404).json({msg: "Cart not found"});
    } catch (error) {
        next(error);
    }
}
    
export const addProductToCart = async (req, res, next) => {
    try {
        const {cid, pid} = req.params;
        const cart = await services.addProductToCart(parseInt(pid), parseInt(cid));
        if(cart) return res.status(200).json(cart);
        return res.status(404).json({msg: 'Product or cart not exist'});
    } catch (error) {
        next(error);
    }
}