"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyJwt_1 = require("../../middlewares/verifyJwt");
const product_1 = __importDefault(require("../../models/product"));
const customerProduct = (0, express_1.Router)();
customerProduct.get('/products', verifyJwt_1.verifyJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1; //skip
    const pageSize = parseInt(req.query.pageSize) || 2; //limit
    const products = yield product_1.default.find().skip((page - 1) * pageSize).limit(pageSize);
    console.log(page);
    try {
        res.status(200)
            .json(products);
    }
    catch (err) {
        res.status(400)
            .json({ error: err });
    }
}));
exports.default = customerProduct;
