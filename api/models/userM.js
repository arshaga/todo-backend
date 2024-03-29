import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        // required:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
   
    image:{
        type:String,
        trim:true,
    },
})

const model = mongoose.model("user",userSchema)
export default model