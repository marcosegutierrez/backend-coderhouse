import factory from '../persistence/daos/factory.js'
import { ProductModel } from '../persistence/daos/mongodb/models/product.model.js';
import { generateProducts } from '../utils/products.utils.js';
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

export const addProduct = async (product, role, email) => {
    try {
        return await prodDao.addProduct(product, role, email);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProduct = async (pid, product, role, email) => {
    try {
        return await prodDao.updateProduct(pid, product, role, email);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProduct = async (pid, role, email) => {
    try {
        return await prodDao.deleteProduct(pid, role, email);
    } catch (error) {
        throw new Error(error);
    }
}

export const mockingProducts = async () => {
    try {
      for (let i = 0; i < 100; i++) {
        const product = generateProducts();
        await prodDao.addProduct(product)
      }
            
      return await ProductModel.find({});
      
    } catch (error) {
      throw new Error(error);
    }
  };