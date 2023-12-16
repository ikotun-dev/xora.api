import jwt from 'jsonwebtoken';

// this is bad practice -> should be stored in an ENV
export const jwtSecretKey : string = "$)npsbidjoblodbasljdow944p9nldjbudl"

// payload for Seller 
interface SellerPayload { 
    userId : string
}

//payload for User 
interface CustomerPayload { 
    userId : string,
}

export function createSellerJWT(sellerPayload : SellerPayload) { 
    //set Expiration
    const expiresIn = '1h'
    //create token
    const token = jwt.sign(sellerPayload, jwtSecretKey, {expiresIn})
    return token
}

export function createCustomerJWT(customerPayload : CustomerPayload) { 
    //set Expiration
    const expiresIn = '1h'
    //create token
    const token = jwt.sign(customerPayload, jwtSecretKey, {expiresIn})
    return token
}