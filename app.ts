import express, { Express, Request, Router } from 'express';    
import mongoose, {ConnectOptions} from 'mongoose';

const app = express();
const url : string = "mongodb://localhost/xora"

mongoose.connect(url, {useNewUrlParser:true} as ConnectOptions)
const con = mongoose.connection

con.on('open', () => {
    console.log("Connected to MongoDB");
})
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


import sellerRouter from './controllers/seller/auth';
import customerRouter from './controllers/customer/auth';
import sellerProductRouter from './controllers/seller/product';
import customerProductRouter from './controllers/customer/product'

app.use('/customer', customerRouter);
app.use('/seller', sellerRouter);
app.use('/product', sellerProductRouter);
app.use('/store', customerProductRouter)

app.listen(8000, () => {
    console.log('xora app listening on port 8000!');
})

