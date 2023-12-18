import { createCipheriv, scryptSync, createDecipheriv } from "crypto"
import fs from "fs"

// const password ='8080'


async function fileEncrypt (filePath,output,password){
    const algorithm = 'aes-192-cbc'
    let key = scryptSync(password,'salt',24)
    let iv= Buffer.alloc(16,0)

    const fileStream = fs.ReadStream(filePath)
    const outputFileStream = fs.createWriteStream(output);

    const cipher = createCipheriv(algorithm,key,iv);
    let encrypted
    fileStream.on('data',(data)=>{
        encrypted = cipher.update(data);
        outputFileStream.write(encrypted);
    })
    fileStream.on('end',()=>{
        outputFileStream.end()
    })
}
async function fileDecrypt (inputFilePath,outputFilePath,password){
    
    const algorithm = 'aes-192-cbc'
    let key = scryptSync(password,'salt',24)
    let iv= Buffer.alloc(16,0)

    const outputWriteStream = fs.createWriteStream(outputFilePath);
    const inputReadStream = fs.ReadStream(inputFilePath);

    const decipher = createDecipheriv(algorithm,key,iv)
    let decrypted 
    inputReadStream.on('data',(data)=>{
        decrypted = decipher.update(data);
        outputWriteStream.write(decrypted)
    })

    inputReadStream.on('end',()=>{
        outputWriteStream.end()
    })
}

const fileEncryption = {
    fileEncrypt,
    fileDecrypt
}

export default fileEncryption