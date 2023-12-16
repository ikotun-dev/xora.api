import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken" 
import { jwtSecretKey }  from './createJwt'

interface DecodedToken {
    userId: string;
    username: string;
    // Add other properties based on your JWT payload structure
}

// Augment the existing Request type
declare global {
    namespace Express {
        interface Request {
            decodedToken?: DecodedToken;
        }
    }
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) { 
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) { 
        return res.status(401)
        .json({message : "Unauthorized access"})
    }else { 
        try { 
            const decoded = jwt.verify(token, jwtSecretKey ) as DecodedToken
            req.decodedToken = decoded
            next()

        } catch(err) { 
            console.log(err)
        }
    }
}

