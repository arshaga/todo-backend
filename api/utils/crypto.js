import CryptoJS from 'crypto-js'

export const encrypt = async (text) =>{
    const encrypted = await CryptoJS.AES.encrypt(text,process.env.KEY).toString()
    return encrypted
 }

 export const decrypt = async (cipherText) =>{
    const decrypted = await CryptoJS.AES.decrypt(cipherText,process.env.KEY)
    .toString(CryptoJS.enc.Utf8)
    return JSON.parse(decrypted)
 }