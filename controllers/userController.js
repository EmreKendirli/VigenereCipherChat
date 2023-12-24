import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import TextEncryption from "../helper/textEncryption.js"
import FileEncryption from "../helper/fileEncryption.js"
const userRegister = tryCatch(async (req, res) => {
    const register = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });
    if (!register) {
        return res.status(404).json({
            succeded: false,
            message: "Hata oluştu."
        });
    }
    res.status(200).json({
        succeded: true,
        message: "Kayıt Başarılı."
    });
});
const userLogin = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
    }); 

    let same = false;
    if (user) {
        same = await bcrypt.compare(password, user.password);
    } else {
        throw new AppError("User Bulunamadı", 404);
    }
    if (same) {
        const user = await User.findOne(
            {
                email,
            },
            "-password -token"
        );
        const token = await createToken(user._id);

        if (!token) {
            //throw new AppError(i18n.translate("USERS.USER_TOKEN_ERROR", lang), 404);
        }
        let oldTokens = user.tokens || [];
        if (oldTokens.length) {
            oldTokens.filter((t) => {
                const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
                if (timeDiff < 86400) {
                    return t;
                }
            });
        }
        await User.findByIdAndUpdate(user._id, {
            tokens: [
                ...oldTokens,
                {
                    token,
                    signedAt: Date.now().toString(),
                },
            ],
        });
        const users = await User.findOne(
            {
                email,
            },
            "-password -token -tokens"
        );
        return res.status(200).json({
            succeded: true,
            data: {
                token,
                user: users,
                // message: i18n.translate("USERS.USER_SUCCESS_LOGIN", lang),
            },
        });
    } else {
        res.status(200).json({
            succeded: true,
            data: {
               message: "Şifreniz yanlış",
                // message: i18n.translate("USERS.USER_SUCCESS_LOGIN", lang),
            },
        });
    }
});
const createToken = async (id) => {
    return jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
};
const data = tryCatch(async (req,res)=>{
    console.log(req.body);
    const a = TextEncryption.encryptText(req.body.text,req.body.pass)
    console.log(a);
})
const data2 = tryCatch(async (req,res)=>{
    console.log(req.body);
    const path = await generateRandomString(6)
    console.log(path);
    const outputPath = `./a/${path}.enc`
    console.log(outputPath);
    //const a = await FileEncryption.fileEncrypt(req.body.url,outputPath,req.body.pass)
    const b = await FileEncryption.fileDecrypt("./a/17028925461055sM3a8.enc","./a.mp4",req.body.pass)
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
const user = {
    userRegister,
    userLogin,
    data,
    data2
}

export default user