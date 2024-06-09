import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    products: {
        type: Array,
        default: []
    }
});

export const CartModel = model('carts', CartSchema);