import * as services from '../services/products.services.js';

export const getProducts = async (req, res, next) => {
    try {
        const products = await services.getProducts();
        if (req.session.email) {
            const docs = products.docs
            res.render('home2', {docs: docs, req: req})
        } else res.json(products);
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const {pid} = req.params;
        const product = await services.getProductById(pid);
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
        const product = req.body;
        const {pid} = req.params;
        const updateProduct = await services.updateProduct(pid, product);
        if (updateProduct) return res.status(200).json(updateProduct);
        res.status(404).json({msg: 'Product not found'});
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const {pid} = req.params;
        const deleteProduct = await services.deleteProduct(pid);
        if (deleteProduct) return res.status(200).json({msg: 'Product successfully removed'});
        res.status(404).json({msg: 'Product not found'});
    } catch (error) {
        next(error);
    }
}