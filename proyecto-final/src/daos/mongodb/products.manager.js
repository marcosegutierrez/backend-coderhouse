import { ProductModel } from "./schema.js";

export default class ProductsManagerMongo {

    async addProduct(obj) {
        const product = await ProductModel.create(obj);
        return product;
    }

    async getProducts() {
        try {
            const products = await ProductModel.find({});
            if (products) return products;
            else return [];
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductById(id) {
        try {
            let product = await ProductModel.findById(id);
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(id, obj) {
       try {
            const product = await ProductModel.findByIdAndUpdate(id, obj, {new: true});
            return product;
       } catch (error) {
            throw new Error(error);
       }
    }

    async deleteProduct(id) {
        try {
            const product = await ProductModel.findByIdAndDelete(id);
            return product;
        } catch (error) {
            throw new Error(error)
        }
    }
}