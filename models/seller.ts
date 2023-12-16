import { Schema, Document, model} from 'mongoose'
import productModel from './product'; 

//seller interface 
interface SellerInterface extends Document {
    username: string;
    password: string;
    created_at: Date;
}

const sellerSchema = new Schema<SellerInterface> ({
    username : {
        type: String,
        required: true 
    },
    password : { 
        type: String,
        required: true 
    },
    created_at : { 
        type: Date,
        default: Date.now(),
        required: true 
    }
})

const sellerModel = model<SellerInterface>('Seller', sellerSchema)

export default sellerModel

