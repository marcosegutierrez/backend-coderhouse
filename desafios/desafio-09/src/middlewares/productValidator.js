import { __dirname } from "../utils.js";
import ProductsManager from "../daos/filesystem/manager/products.manager.js";

const productsManager = new ProductsManager(`${__dirname}/daos/filesystem/data/products.json`);

export const productValidator = async (req, res, next) => {
    const { title, description, code, price, stock, category } = req.body;
    let products = await productsManager.getProducts();
    if (!title || !description || !code || !price || !stock || !category) 
        res.status(404).json({msg: 'Product with missing fields'});
    else if (products.find(p => p.code === code))
        res.status(404).json({msg: 'Product with existing code'});
    else next();
}