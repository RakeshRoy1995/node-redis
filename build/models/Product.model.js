"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        // unique: true,
    },
    status: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
        // unique: true,
    },
}, { timestamps: true });
const Product = (0, mongoose_1.model)('products', ProductSchema);
exports.default = Product;
