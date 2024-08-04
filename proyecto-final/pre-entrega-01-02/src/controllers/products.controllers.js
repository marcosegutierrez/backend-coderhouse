import * as services from '../services/products.services.js';

export const getProducts = async (req, res, next) => {
    try {
        const { page, limit, query, sort } = req.query;
        const products = await services.getProducts(page, limit, query, sort);
        const next = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null;
        const prev = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null;
        res.json({
            payload: products.docs,
            info: {
              count: products.totalDocs,
              totalPages: products.totalPages,
              nextLink: next,
              prevLink: prev,
              hasPrevPage: products.hasPrevPage,
              hasNextPage: products.hasNextPage
            }
          });
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const product = await services.getProductById(req);
        if (product) return res.status(200).json(product);
        return res.status(404).json({msg: 'Product not found'});
    } catch (error) {
        next(error);
    }
}

export const addProduct = async (req, res, next) => {
    try {
        const newProduct = await services.addProduct(req.body);
        res.status(200).json(newProduct);
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const updateProduct = await services.updateProduct(req);
        if (updateProduct) return res.status(200).json(updateProduct);
        res.status(404).json({msg: 'Product not found'});
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const deleteProduct = await services.deleteProduct(req);
        if (deleteProduct) return res.status(200).json({msg: 'Product successfully removed'});
        res.status(404).json({msg: 'Product not found'});
    } catch (error) {
        next(error);
    }
}