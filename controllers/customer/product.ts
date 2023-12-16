import { Request, Response, Router } from 'express'
import { verifyJWT } from '../../middlewares/verifyJwt'
import productModel from '../../models/product'
import cartModel from '../../models/cart'

const customerProduct = Router()
// @desc View Products 
customerProduct.get('/products', verifyJWT, async (req, res) => {
    const page  = parseInt(req.query.page as string ) || 1 //skip
    const pageSize = parseInt(req.query.pageSize as string) || 2 //limit
    const products = await productModel.find().skip((page - 1)*pageSize).limit(pageSize)
    console.log(page)
    try {
    res.status(200)
    .json(products)
    } catch (err) {
        res.status(400)
        .json({error : err})
    }  
})
// @desc set up cart 
// @route /store/add/:id

customerProduct.post('/add/:id', verifyJWT, async(req, res) => { 
    const productId = req.params.id
    const product = await productModel.findById(productId)
    if(!product) { 
        res.status(404)
        .json({error : "Product not found"})
    } else {
    //check if an unsettled cart exits 
    const cart = await cartModel.findOne({customer : req.decodedToken.id, settled : false})
    if (!cart) { 
        try {
            const newCart = new cartModel({
                totalPrice : product.price,
                products : [productId],
                customer : req.decodedToken.id,
                settled : false

            })
            const savedCart = await newCart.save()
            res.status(200)
            .json({message : "Added new Cart"})
        }catch(err) { 
            res.status(400)
            .json({error : err})
        }
    } else {
        try {
        const latestCart =  cart.products.push(product.id)
        cart.totalPrice += product.price
        await cart.save()
        res.status(200)
        .json({message : "Added to Existing Cart"})

        } catch(err) {
            res.status(400)
            .json({error : err})
        }
    }
    }
})
export default customerProduct

