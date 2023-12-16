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
const cart_1 = __importDefault(require("../../models/cart"));
const customerProduct = (0, express_1.Router)();
// @desc View Products 
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
// @desc set up cart 
// @route /store/add/:id
customerProduct.post('/add/:id', verifyJwt_1.verifyJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield product_1.default.findById(productId);
    if (!product) {
        res.status(404)
            .json({ error: "Product not found" });
    }
    else {
        //check if an unsettled cart exits 
        const cart = yield cart_1.default.findOne({ customer: req.decodedToken.id, settled: false });
        if (!cart) {
            try {
                const newCart = new cart_1.default({
                    totalPrice: product.price,
                    products: [productId],
                    customer: req.decodedToken.id,
                    settled: false
                });
                const savedCart = yield newCart.save();
                res.status(200)
                    .json({ message: "Added new Cart" });
            }
            catch (err) {
                res.status(400)
                    .json({ error: err });
            }
        }
        else {
            try {
                const latestCart = cart.products.push(product.id);
                cart.totalPrice += product.price;
                yield cart.save();
                res.status(200)
                    .json({ message: "Added to Existing Cart" });
            }
            catch (err) {
                res.status(400)
                    .json({ error: err });
            }
        }
    }
}));
exports.default = customerProduct;
