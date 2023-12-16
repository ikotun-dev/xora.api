"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const url = "mongodb://localhost/xora";
mongoose_1.default.connect(url, { useNewUrlParser: true });
const con = mongoose_1.default.connection;
con.on('open', () => {
    console.log("Connected to MongoDB");
});
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const auth_1 = __importDefault(require("./controllers/seller/auth"));
const auth_2 = __importDefault(require("./controllers/customer/auth"));
const addProduct_1 = __importDefault(require("./controllers/seller/addProduct"));
const viewProduct_1 = __importDefault(require("./controllers/customer/viewProduct"));
app.use('/customer', auth_2.default);
app.use('/seller', auth_1.default);
app.use('/product', addProduct_1.default);
app.use('/store', viewProduct_1.default);
app.listen(8000, () => {
    console.log('xora app listening on port 8000!');
});
