import { __dirname } from "../utils.js";
import ProductsManagerFS from "../daos/filesystem/managers/products.manager.js";
// const productsDao = new ProductsManagerFS(`${__dirname}/daos/filesystem/data/products.json`);

import ProductsManagerMongo from "../daos/mongodb/products.manager.js";
const productsDao = new ProductsManagerMongo();

export const getProducts = async (req) => {
    try {
        const {limit} = req.query;
        const products = await productsDao.getProducts();
        if (limit) {
            return products.slice(0,limit);
        } else return products;
    } catch (error) {
        throw new Error(error);
    }
}

export const getProductById = async (req) => {
    try {
        const {pid} = req.params;
        const product = await productsDao.getProductById(pid);
        if (product) return product;
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

export const addProduct = async (product) => {
    try {
        const newProduct = await productsDao.addProduct(product);
        return newProduct;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProduct = async (req) => {
    try {
        const product = req.body;
        const {pid} = req.params;
        const updateProduct = await productsDao.updateProduct(pid, product);
        if (updateProduct) return updateProduct;
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProduct = async (req) => {
    try {
        const {pid} = req.params;
        const deleteProduct = await productsDao.deleteProduct(pid);
        if (deleteProduct) return deleteProduct;
        return null;
    } catch (error) {
        throw new Error(error);
    }
}