import  express  from 'express'
import mongoose from 'mongoose'
import cors  from 'cors'
import dotenv from 'dotenv'
import userR from './routes/userR.js'
import todoR from './routes/todoR.js'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'


const app = express()
dotenv.config()
const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mongodb")
    
    }catch(err){
        console.log(err)
    } 
}
app.use(cors({credentials:true, origin: ["*", "http://localhost:3000"
]}));
app.use(express.json({extened:false}));
app.use(fileUpload())
app.use(express.static('image'))
app.use(cookieParser());


app.use("/todo/",todoR)
app.use("/user/",userR)//(connection of routes)
//error message shown code
app.use((err,req,res,next)=>{
    const errMessage = err.message||"error from backend"
    const errStatus = err.status  || 500

    res.status(errStatus).json({
        success : false,
        stack :err.stack,
        message : errMessage
    })
})


app.listen(8900,()=>{
    connect()
    console.log("connected to backend")

})