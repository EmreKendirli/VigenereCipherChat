import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"
import TextEncryption from "../helper/textEncryption.js"
import FileEncryption from "../helper/fileEncryption.js"
import UserFile from "../models/userFileModel.js"
import UserImage from "../models/userImageModel.js"

const fileEncrption = tryCatch(async (req,res)=>{
    const path = await generateRandomString(6)
    const outputPath = `./encription/${path}.enc`
    const a = await FileEncryption.fileEncrypt(req.body.url,outputPath,req.body.pass)
    const save = await UserFile.create({
        title:req.body.title,
        type:"encrypt",
        url:outputPath,
        userId:req.user._id
    })
    res.status(200).json({
        succeded:true,
    })
})
const fileDecrypt = tryCatch(async (req,res)=>{
    const id = req.params.id
    const file = await UserFile.findOne({_id:id})
    const random = await generateRandomString(6)
    const path = file.url    //"./a/17035875401898Qg7zQ.enc"
    const outputPath = `./decrypt/${random}.mp4`

    // const outputpath = "./a.mp4"
    const b = await FileEncryption.fileDecrypt(path,outputPath,req.body.pass)
    await UserFile.findByIdAndUpdate(id,{
        type:"decrypt",
        url:outputPath
    })
    res.status(200).json({
        succeded:true,
    })
})
const imageEncrption = tryCatch(async (req,res)=>{
    const path = await generateRandomString(6)
    const outputPath = `./encription/${path}.enc`
    const a = await FileEncryption.fileEncrypt(req.body.url,outputPath,req.body.pass)
    const save = await UserImage.create({
        title:req.body.title,
        type:"encrypt",
        url:outputPath,
        userId:req.user._id
    })
    res.status(200).json({
        succeded:true,
    })
})
const imageDecrypt = tryCatch(async (req,res)=>{
    const id = req.params.id
    const file = await UserImage.findOne({_id:id})
    const random = await generateRandomString(6)
    const path = file.url    //"./a/17035875401898Qg7zQ.enc"
    const outputPath = `./decrypt/${random}.jpg`

    // const outputpath = "./a.mp4"
    const b = await FileEncryption.fileDecrypt(path,outputPath,req.body.pass)
    await UserImage.findByIdAndUpdate(id,{
        type:"decrypt",
        url:outputPath
    })
    res.status(200).json({
        succeded:true,
    })
})
async function generateRandomString(length) {
    let result =Date.now();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomChar = characters.charAt(randomIndex);
        result += randomChar;
    }

    return result;
}

const file ={
    fileEncrption,
    fileDecrypt,
    imageEncrption,
    imageDecrypt
}

export default file