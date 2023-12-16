import { Request, Response, Router } from 'express';
import sellerModel from '../../models/seller';
import bcrypt from 'bcrypt';
import { createJWT } from '../../middlewares/createJwt';

const sellerRouter: Router =  Router();

// @desc Create a new Seller 
sellerRouter.post('/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const seller = new sellerModel({
        username: req.body.username,
        password: hashedPassword,
        created: Date.now()
    })
    try {
        //check if seller with this username already exists
        const existingSeller = await sellerModel.findOne({username : seller.username})
        if(existingSeller) { 
            res.status(400)
            .json({message : "Seller already exists"})
        }

        const newSeller = await seller.save();
        res.status(201).json(newSeller);
        res.end()
    } catch (err) {
        res.status(400).json(err);
    }
})


// @desc Logs a seller in
// @url /seller/login
sellerRouter.post('/login', async (req, res) => {
    const seller = {
        username : req.body.username,
        password : req.body.password
    }
    //check if seller with this username already exists
    const existingSeller = await sellerModel.findOne({username : seller.username})
    if(existingSeller) { 
        //check if the password tallies with the inputed password
        const isMatch = await bcrypt.compare(seller.password, existingSeller.password)
        if(isMatch) {
            //generate access token
            const token =  createJWT({id: existingSeller.id})
            res.status(200).json({message : "Login successful", "accessToken" : token})
        } else {
            res.status(400).json({message : "Invalid Credentials"})
        }
    } else {
        res.status(400)
        .json({message : "Invalid credentials"})
    }
})

export default sellerRouter;

