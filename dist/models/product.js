"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//productSchema
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true
    },
    category: {
        type: String,
        required: true
    }
});
const productModel = (0, mongoose_1.model)('Product', productSchema);
exports.default = productModel;
