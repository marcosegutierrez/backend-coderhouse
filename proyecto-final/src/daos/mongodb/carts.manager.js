import {CartModel} from './models/cart.model.js';
import ProductsManagerMongo from "./products.manager.js";

const productsManager = new ProductsManagerMongo();

export default class CartsManagerMongo {

    async addCart () {
        const cart = await CartModel.create({ products: []});
        return cart;
    }

    async getCarts() {
        let carts = await CartModel.find({});
        if (carts) return carts;
        else return [];
    }

    async getCartById(id) {
        const cartFound = await CartModel.findById(id);
        if (cartFound) return cartFound;
        else return null;
    }

    async addProductToCart(idProduct, idCart) {
        const cart = await CartModel.findById(idCart);
        if (!cart) return null;
        const existProdIndex = cart.products.findIndex(p => p.product.toString() === idProduct);
        if(existProdIndex !== -1) {
          cart.products[existProdIndex].quantity++;
        } else cart.products.push({ product: idProduct});
        await cart.save();  
        return cart;
    }
    
}