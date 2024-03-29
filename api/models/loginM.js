import mongoose from 'mongoose'

const loginSchema = mongoose.Schema({
    id:{
        type:String,
        //required:true,
        },
        email:{
            type:String,
            // required:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            trim:true,
        },
        auth:{
            type:String,
            required:true,
            default:"user"
        },
    },{timestamps:true})

    const model = mongoose.model("login",loginSchema)
    export default model