//importing libraries
import mongoose from "mongoose";

//csv schema
const csvSchema = new mongoose.Schema({
    s3Key : {
        type : String, 
        required : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: true
    }
},  {timestamps: true})

const CsvSchema = mongoose.model('csv', csvSchema)

export default CsvSchema