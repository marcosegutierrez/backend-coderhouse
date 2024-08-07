import * as services from '../services/carts.services.js'

export const addCart = async (req, res, next) => {
    try {
        const cart = services.addCart();
        if(cart) return res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}

export const addProductToCart = async (req, res, next) => {
    try {
        const cid = req.session.cartId;
        const {pid} = req.params;
        const cart = await services.addProductToCart(cid, pid);
        if(cart) return res.status(200).json(cart);
        return res.status(404).json({msg: 'Product or cart not exist'});
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
        const cart = await services.getCartById(cid);
        if(cart) return res.status(200).json(cart.products);
        return res.status(404).json({msg: "Cart not found"});
    } catch (error) {
        next(error);
    }
}

export const deleteProductToCart = async (req, res, next) => {
    try {
        const {cid, pid} = req.params;
        const cart = await services.deleteProductToCart(pid, cid);
        if(cart) return res.status(200).json(cart);
        return res.status(404).json({msg: 'Product or cart not exist'});
    } catch (error) {
        next(error);
    }
}

export const updateCart = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const productsUpdate = req.body.products;
        const cart = await services.updateCart(cid, productsUpdate);
        if(cart) return res.status(200).json(cart);
        return res.status(404).json({msg: "Cart not found"});
    } catch (error) {
        next(error);
    }
}

export const updateProductToCart = async (req, res, next) => {
    try {
        const {cid, pid} = req.params;
        const quantity = req.body.quantity;
        const cart = await services.updateProductToCart(pid, cid, quantity);
        if(cart) return res.status(200).json(cart);
        return res.status(404).json({msg: "Product or cart not found"});
    } catch (error) {
        next(error);
    }
}

export const deleteCart = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const cart = await services.deleteCart(cid);
        if(cart) return res.status(200).json(cart);
        return res.status(404).json({msg: "Cart not found"});
    } catch (error) {
        next(error);
    }
}