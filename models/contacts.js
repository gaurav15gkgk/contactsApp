//importing the libraries
import mongoose from "mongoose";

//contact schema
const contactSchema = new mongoose.Schema({
    name :{
        type: String,
        required : true
    },
    phone : {
        type : String, 
        required : true,
    },
    email: {
        type : String, 
        required : true,
    },
    linkedInProfile: {
        type: String, 
        required: true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
},  {timestamps: true})

const contactsSchema = mongoose.model('contacts', contactSchema)

export default contactsSchema
