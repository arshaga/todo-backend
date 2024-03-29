import userModel from '../models/userM.js'
import bcrypt from 'bcrypt'//note init
import { encrypt } from '../utils/crypto.js'//note init
import { createError } from '../utils/error.js'

export const login = async ( req, res,next) =>{
    try{
        const checkEmail = await userModel.findOne({ username: req.body.username })
        if(!checkEmail) return next(createError(400,"email dose not exists,pls reg first"))

        const checkPass = await bcrypt.compareSync(req.body.password,checkEmail.password)  

        if(!checkPass) return next(createError(400,"Wrong password or username!"))
        
    const text = JSON.stringify({id:checkEmail._id})
    const token = await encrypt(text) 

    res.cookie("token",token,{httpOnly:true,
       sameSite: 'strict',
     path: '/',})
    .status(200).json({message:"you are logged",success:true})
    }catch(err){

        next(createError(400,err.message))
        }
}
//not run the code logout//
export const logout =(req,res,next) =>{
    try{
        console.log(req?.cookies?.token)
        if(req?.cookies?.token)
        res.clearCookie("token").status(200).json("logout successfull")
    else
    res.status(200).json("you are not logged in")
    }
    catch(err){
        next(createError(400,err.message))

    }
}