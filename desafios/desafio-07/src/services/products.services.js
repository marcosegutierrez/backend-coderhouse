import ProductsManagerFS from "../daos/filesystem/manager/products.manager.js";
import { __dirname } from "../utils.js";
import ProductsManagerMongo from "../daos/mongodb/products.manager.js";

// const productsManager = new ProductsManagerFS(`${__dirname}/daos/filesystem/data/products.json`);
const productsManager = new ProductsManagerMongo();

export const getProducts = async () => {
    try {
        return await productsManager.getProducts();
    } catch (error) {
        throw new Error(error);
    }
}

export const getProductById = async (pid) => {
    try {
        return await productsManager.getProductById(pid);
    } catch (error) {
        throw new Error(error);
    }
}

export const addProduct = async (product) => {
    try {
        return await productsManager.addProduct(product);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProduct = async (pid, product) => {
    try {
        return await productsManager.updateProduct(pid, product);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProduct = async (pid) => {
    try {
        return await productsManager.deleteProduct(pid);
    } catch (error) {
        throw new Error(error);
    }
}