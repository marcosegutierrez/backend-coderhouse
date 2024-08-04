import factory from '../persistence/daos/factory.js'
const { prodDao } = factory;

export const getProducts = async () => {
    try {
        return await prodDao.getProducts();
    } catch (error) {
        throw new Error(error);
    }
}

export const getProductById = async (pid) => {
    try {
        return await prodDao.getProductById(pid);
    } catch (error) {
        throw new Error(error);
    }
}

export const addProduct = async (product) => {
    try {
        return await prodDao.addProduct(product);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProduct = async (pid, product) => {
    try {
        return await prodDao.updateProduct(pid, product);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProduct = async (pid) => {
    try {
        return await prodDao.deleteProduct(pid);
    } catch (error) {
        throw new Error(error);
    }
}