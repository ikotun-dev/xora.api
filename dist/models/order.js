"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
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
    }
});
const orderModel = (0, mongoose_1.model)('Order', orderSchema);
exports.default = orderModel;
