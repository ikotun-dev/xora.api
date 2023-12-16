"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    products: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Product',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    settled: {
        type: Boolean,
        default: false
    }
});
const cartModel = (0, mongoose_1.model)('Cart', cartSchema);
exports.default = cartModel;
