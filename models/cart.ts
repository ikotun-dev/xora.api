import { Schema, Document, model, Types } from "mongoose";
 
interface CartInterface extends Document { 
    createdAt : Date,
    products : Types.ObjectId[],
    totalPrice : number,
    customer : Types.ObjectId
    settled : boolean
}

const cartSchema = new Schema<CartInterface> ({
    createdAt : {
        type : Date,
        default : Date.now(),
        required : true
    },
    products : {
        type : [Schema.Types.ObjectId],
        ref : 'Product',
        required : true
    },
    totalPrice : {
        type : Number,
        required : true 
    },
    customer : {
        type : Schema.Types.ObjectId,
        ref : 'Customer',
        required: true
    },
    settled : {
        type : Boolean,
        default : false
    }

})

const cartModel = model<CartInterface>('Cart', cartSchema)

export default cartModel;

