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
        seller : req.decodedToken.id
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



sellerProductRouter.get('/products', verifyJWT, (req, res) => { 

})


export default sellerProductRouter