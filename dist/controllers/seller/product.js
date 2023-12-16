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
const product_1 = __importDefault(require("../../models/product"));
const verifyJwt_1 = require("../../middlewares/verifyJwt");
const sellerProductRouter = (0, express_1.Router)();
sellerProductRouter.post('/add', verifyJwt_1.verifyJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.decodedToken);
    const product = new product_1.default({
        name: req.body.name,
        price: req.body.price,
        inStock: req.body.inStock,
        seller: (_a = req.decodedToken) === null || _a === void 0 ? void 0 : _a.id,
        category: req.body.category
    });
    try {
        const newProduct = yield product.save();
        res.status(201)
            .json({ message: "product added successfully" });
    }
    catch (err) {
        res.status(400)
            .json({ error: err });
    }
}));
// @desc Gets Sellers Product 
sellerProductRouter.get('/personal', verifyJwt_1.verifyJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const products = yield product_1.default.find({ seller: (_b = req.decodedToken) === null || _b === void 0 ? void 0 : _b.id });
    if (!products) {
        res.status(404)
            .json({ message: "No products found" });
    }
    try {
        res.status(200)
            .json(products);
    }
    catch (err) {
        console.log(err);
    }
}));
// @desc Adds Product to cart ( )
exports.default = sellerProductRouter;
