import { __dirname } from '../utils.js';
import CartsManagerFS from '../daos/filesystem/managers/carts.manager.js';
// const cartsDao = new CartsManagerFS(`${__dirname}/daos/filesystem/data/carts.json`);

import CartsManagerMongo from '../daos/mongodb/carts.manager.js';
const cartsDao = new CartsManagerMongo();

export const addCart = async () => {
    try {
        return await cartsDao.addCart();
    } catch (error) {
        throw new Error(error);
    }
}

export const getCarts = async () => {
    try {
        return await cartsDao.getCarts();
    } catch (error) {
        throw new Error(error);
    }
}

export const getCartById = async (id) => {
    try {
        return await cartsDao.getCartById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const addProductToCart = async (idProduct, idCart) => {
    try {
        return await cartsDao.addProductToCart(idProduct, idCart);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProductToCart = async (idProduct, idCart) => {
    try {
        return await cartsDao.deleteProductToCart(idProduct, idCart);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateCart = async (id, productsUpdate) => {
    try {
        return await cartsDao.updateCart(id, productsUpdate);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProductToCart = async (idProduct, idCart, quantity) => {
    try {
        return await cartsDao.updateProductToCart(idProduct, idCart, quantity);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteCart = async (idCart) => {
    try {
        return await cartsDao.deleteCart(idCart);
    } catch (error) {
        throw new Error(error);
    }
}