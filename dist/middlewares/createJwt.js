"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerJWT = exports.createSellerJWT = exports.jwtSecretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// this is bad practice -> should be stored in an ENV
exports.jwtSecretKey = "$)npsbidjoblodbasljdow944p9nldjbudl";
function createSellerJWT(sellerPayload) {
    //set Expiration
    const expiresIn = '1h';
    //create token
    const token = jsonwebtoken_1.default.sign(sellerPayload, exports.jwtSecretKey, { expiresIn });
    return token;
}
exports.createSellerJWT = createSellerJWT;
function createCustomerJWT(customerPayload) {
    //set Expiration
    const expiresIn = '1h';
    //create token
    const token = jsonwebtoken_1.default.sign(customerPayload, exports.jwtSecretKey, { expiresIn });
    return token;
}
exports.createCustomerJWT = createCustomerJWT;
