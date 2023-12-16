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
const customer_1 = __importDefault(require("../../models/customer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const customerRouter = (0, express_1.Router)();
// @desc Create a new Seller
customerRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10); //hashing the password
    const customer = new customer_1.default({
        username: req.body.username,
        password: hashedPassword,
        created_at: Date.now(),
    });
    try {
        //check if customer username exists before
        const existingCustomer = yield customer_1.default.findOne({
            username: customer.username,
        });
        //returns 400 if customer already exists
        if (existingCustomer) {
            return res.status(400).json({ message: "Username already exists" });
        }
        else {
            const newCustomer = yield customer.save();
            res.status(201).json(newCustomer);
            res.end();
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
customerRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = {
        username: req.body.username,
        password: req.body.password,
    };
    //check if the user exits
    const existingCustomer = yield customer_1.default.findOne({
        username: customer.username,
    });
    if (existingCustomer) {
        //check if the password tallies with the inputed password
        const isMatch = yield bcrypt_1.default.compare(customer.password, existingCustomer.password);
        if (isMatch) {
            res.status(200).json({ message: "Login successful" });
        }
        else {
            res.status(400).json({ message: "Invalid Credentials" });
        }
    }
    else {
        res.status(400).json({ message: "Invalid Credentials" });
    }
}));
exports.default = customerRouter;
