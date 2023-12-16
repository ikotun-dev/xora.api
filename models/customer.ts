import { Schema, Document, model } from 'mongoose';

//customer Interface
interface CustomerInterface extends Document{
    username: string;
    password: string;
    created_at: Date;
}

const customerSchema = new Schema<CustomerInterface> ({
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


const customerModel = model<CustomerInterface>('Customer', customerSchema)

export default customerModel