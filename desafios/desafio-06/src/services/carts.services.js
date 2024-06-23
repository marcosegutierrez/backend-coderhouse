import CartsManagerFS from "../daos/filesystem/manager/carts.manager.js";
import { __dirname } from "../utils.js";
import CartsManagerMongo from "../daos/mongodb/carts.manager.js";

// const cartsManager = new CartsManagerFS(`${__dirname}/daos/filesystem/data/carts.json`);
const cartsManager = new CartsManagerMongo()

export const addCart = async () => {
    try {
        return await cartsManager.addCart();
    } catch (error) {
        throw new Error(error);
    }
}

export const addProductToCart = async (cid, pid) => {
    try {
        return await cartsManager.addProductToCart(pid, cid);
    } catch (error) {
        throw new Error(error);
    }
}

export const getCarts = async () => {
    try {
        return await cartsManager.getCarts();
    } catch (error) {
        throw new Error(error);
    }
}

export const getCartById = async (cid) => {
    try {
        return await cartsManager.getCartById(cid);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProductToCart = async (idProduct, idCart) => {
    try {
        return await cartsManager.deleteProductToCart(idProduct, idCart);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateCart = async (id, productsUpdate) => {
    try {
        return await cartsManager.updateCart(id, productsUpdate);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProductToCart = async (idProduct, idCart, quantity) => {
    try {
        return await cartsManager.updateProductToCart(idProduct, idCart, quantity);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteCart = async (idCart) => {
    try {
        return await cartsManager.deleteCart(idCart);
    } catch (error) {
        throw new Error(error);
    }
}