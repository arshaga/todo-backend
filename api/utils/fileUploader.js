import { v4 as uuid} from 'uuid'
import fs from 'fs'

export const fileUpload = async (name,image) =>{
    let state = await image.mv(`${process.cwd()}/image/${name}`)
    .then((data)=>true)
    .catch(err=> false)
    return state
}

export const randomKey =() =>{
    return uuid()
}

export const fileDelete = async(name)=>{
    try{
        const state = await fs.
        existsSync(`${process.cwd()}/image/${name}`)
        if (state){
            fs.unlinkSync(`${process.cwd()}/image/${name}`)
        }
        return true
    }catch(err){
        console.log(err)
        return false    }
}