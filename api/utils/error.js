export const createError = (status,message)=>{
    try{
    const err = new Error()
    err.message =message
    err.status =status
    return err
}catch(err){
    console.log(err)}
}