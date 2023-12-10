import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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

const user = {
    userRegister,
    userLogin
}

export default user