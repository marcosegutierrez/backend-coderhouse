import ProductsManagerFS from "../daos/filesystem/manager/products.manager.js";
import { __dirname } from "../utils.js";

const productsManager = new ProductsManagerFS(`${__dirname}/daos/filesystem/data/products.json`);

export const viewLogin = async (req, res, next) => {
    try {
        if (req.session.email) {
            res.redirect('/api/products')
        } else res.render('login');
    } catch (error) {
        next(error);
    }
}

export const viewRegister = (req, res, next) => {
    try {
        res.render('register');   
    } catch (error) {
        next(error);
    }
}

export const viewProfile = (req, res, next) => {
    try {
        console.log(req.session);
        res.render('profile');
    } catch (error) {
        next(error);
    }
}

export const realTimeProducts = async (req, res, next) => {
    try {
        const products = await productsManager.getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        next(error);
    }
}

export const viewChat = (req, res, next) => {
    try {
        res.render('chat')
    } catch (error) {
        next(error);
    }
}