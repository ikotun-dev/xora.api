import { Schema, model, Document, Types} from 'mongoose';


//interface for product 
interface productInterface extends Document { 
    name : string;
    price: number;
    inStock : boolean;
    seller : Types.ObjectId;
}

//productSchema
const productSchema = new Schema<productInterface> ({
    name : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    inStock : {
        type: Boolean,
        required: true
    },
    seller : {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    }
})


const productModel = model<productInterface>('Product', productSchema)

export default productModel;

