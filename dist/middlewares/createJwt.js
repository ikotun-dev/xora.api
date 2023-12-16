"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = exports.jwtSecretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// this is bad practice -> should be stored in an ENV
exports.jwtSecretKey = "$)npsbidjoblodbasljdow944p9nldjbudl";
//payload for User 
function createJWT(userPayload) {
    //set Expiration
    const expiresIn = '1h';
    //create token
    const token = jsonwebtoken_1.default.sign(userPayload, exports.jwtSecretKey, { expiresIn });
    return token;
}
exports.createJWT = createJWT;
// export function createCustomerJWT(customerPayload : CustomerPayload) { 
//     //set Expiration
//     const expiresIn = '1h'
//     //create token
//     const token = jwt.sign(customerPayload, jwtSecretKey, {expiresIn})
//     return token
// }
