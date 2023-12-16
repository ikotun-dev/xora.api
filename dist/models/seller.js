"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sellerSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true
    }
});
const sellerModel = (0, mongoose_1.model)('Seller', sellerSchema);
exports.default = sellerModel;
