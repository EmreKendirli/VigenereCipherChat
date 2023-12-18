import crypto from "crypto"


// const ENC= 'bf3c199c2470cb477d907b1e0917c17b';
const IV = "5183666c72eec9e4";
const ALGO = "aes-256-cbc"

async function encryptText (text,pass){
    let cipher = crypto.createCipheriv(ALGO, pass, IV);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}
async function decryptText (text,pass){
    let decipher = crypto.createDecipheriv(ALGO, pass, IV);
    let decrypted = decipher.update(text, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
}
const encryption = {
    encryptText,
    decryptText
}
export default encryption