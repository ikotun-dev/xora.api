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
const seller_1 = __importDefault(require("../../models/seller"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createJwt_1 = require("../../middlewares/createJwt");
const sellerRouter = (0, express_1.Router)();
// @desc Create a new Seller 
sellerRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
    const seller = new seller_1.default({
        username: req.body.username,
        password: hashedPassword,
        created: Date.now()
    });
    try {
        //check if seller with this username already exists
        const existingSeller = yield seller_1.default.findOne({ username: seller.username });
        if (existingSeller) {
            res.status(400)
                .json({ message: "Seller already exists" });
        }
        const newSeller = yield seller.save();
        res.status(201).json(newSeller);
        res.end();
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// @desc Logs a seller in
// @url /seller/login
sellerRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const seller = {
        username: req.body.username,
        password: req.body.password
    };
    //check if seller with this username already exists
    const existingSeller = yield seller_1.default.findOne({ username: seller.username });
    if (existingSeller) {
        //check if the password tallies with the inputed password
        const isMatch = yield bcrypt_1.default.compare(seller.password, existingSeller.password);
        if (isMatch) {
            //generate access token
            const token = (0, createJwt_1.createJWT)({ id: existingSeller.id });
            res.status(200).json({ message: "Login successful", "accessToken": token });
        }
        else {
            res.status(400).json({ message: "Invalid Credentials" });
        }
    }
    else {
        res.status(400)
            .json({ message: "Invalid credentials" });
    }
}));
exports.default = sellerRouter;
