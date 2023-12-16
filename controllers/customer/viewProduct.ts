import { Request, Response, Router } from 'express'
import { verifyJWT } from '../../middlewares/verifyJwt'
import productModel from '../../models/product'

const customerProduct = Router()

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

export default customerProduct

