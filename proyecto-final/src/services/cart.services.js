import { __dirname } from '../utils.js';
import CartsManagerFS from '../daos/filesystem/managers/carts.manager.js';
const cartsDao = new CartsManagerFS(`${__dirname}/daos/filesystem/data/carts.json`);

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