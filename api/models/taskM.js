import mongose from  'mongoose'

 const taskSchema =mongose.Schema({
    user_id:{
        type:String,
        required:true,
    },
     title:{
      type:String,
      required:true,
     
    },
    message:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        // enum:['incomplete','inprogress','complete'],
    },
    
})

 const model = mongose.model("todo",taskSchema)
 export default model