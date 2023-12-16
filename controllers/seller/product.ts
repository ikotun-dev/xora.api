import { Router, Request, Response} from 'express'
import productModel from '../../models/product'
import { verifyJWT } from '../../middlewares/verifyJwt'


const sellerProductRouter = Router()

sellerProductRouter.post('/add', verifyJWT, async (req, res) => {
    console.log(req.decodedToken)
    const product = new productModel({
        name : req.body.name,
        price : req.body.price,
        inStock : req.body.inStock,
        seller : req.decodedToken?.id
    })
    try { 
        const newProduct = await product.save()
        res.status(201)
        .json({message: "product added successfully"})
    }
    catch (err) {
        res.status(400)
        .json({error : err})
    }
})


// @desc Gets Sellers Product 
sellerProductRouter.get('/products', verifyJWT, async (req, res) => { 
    const products = await productModel.find({seller: req.decodedToken?.id})
    if (!products) { 
        res.status(404)
        .json({message : "No products found"})
    }
    try { 
        res.status(200)
        .json(products)
    } catch (err) { 
        console.log(err)
    }
    
})



export default sellerProductRouter