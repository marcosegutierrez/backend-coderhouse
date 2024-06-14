import { ProductModel } from "./models/product.model.js";

export default class ProductsManagerMongo {

    async addProduct(obj) {
        const product = await ProductModel.create(obj);
        return product;
    }

    async getProducts(page = 1, limit = 10, query, sort) {
        try {
            const filter = query ? { 'query': query } : {};
            let sortOrder = {};
            if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
            const products = await ProductModel.paginate(filter, { page, limit, sort: sortOrder }); //sort: { price: 1 } 
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