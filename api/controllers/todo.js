//import loginModel from '../models/loginM'
import todoModel from '../models/taskM.js'
import { encrypt } from '../utils/crypto.js'
import { createError } from '../utils/error.js'

export  const posttodo =async( req,res,next) =>{
try{
    const newTask = todoModel({
        user_id:req.user.id,
        title:req.body.title,
        status:"incomplete",
        message:req.body.message,
        
    })
    await newTask.save()
    res.status(200).json({success:true,message:"Task added"})
} catch(err){
    res.status(500).json({err:err.message})
    next(createError(400,err.message))
}
}
// export const updatettodo= async ( req, res,) =>{
//     try{
//          //const tsk = todoModel({
//            // task:req.body.task,
//         // })
//          const list = await todoModel.findById({title :req.body.title})
//          if (!list){
//             return res.status(404).json({error: 'list is not found'})
//          }
//          if( list.status === 'incomplete'){
//             list.status= 'inprogress';

//          }else if (list.status === 'inprogress'){
//             list.status ='complete'
//          }else if(list.status === 'complete') {
//             return res.status(400).json({error:'task alredy complete'});
//          }else{
//             return res.status(400).json({error:'invalid'});
//          }
//          await list.save();
//          return res.json({message:'Document updated successfully',list});
//     } catch(error){
//         console.error(error);
//         return res.status(500).json({error:'Invalid server error'});
//     }

// }
export const getTask = async (req,res,next)=>{
   try{
      const taskGet = await todoModel.find({user_id:req?.user?.id})
      res.status(200).json({success:true,data:taskGet})
   }catch(err)
   {
      next(createError(400,err.message))
   }
}

export const updatettodo = async (req,res,next)=>{
    try{
         const todo =await todoModel.findById(req.params.id)
        if(todo.user_id !== req.user.id){
            return next(createError(400,'You are not autherized'))
        }
   const update= await todoModel.findByIdAndUpdate(req.params.id,{
       $set:{
           ...req.body
       }
   },{new:true})
   res.status(200).json({success:true,message:'Task updated successfully'})
}catch(err)
{ 
   next(createError(400,err.message))
}
   
}