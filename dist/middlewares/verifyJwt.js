"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJwt_1 = require("./createJwt");
function verifyJWT(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401)
            .json({ message: "Unauthorized access" });
    }
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, createJwt_1.jwtSecretKey);
            req.decodedToken = decoded;
            next();
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.verifyJWT = verifyJWT;
