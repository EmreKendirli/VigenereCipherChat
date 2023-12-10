import mongoose from "mongoose";
import bcrypt from "bcrypt"
const {
    Schema
} = mongoose;
const userSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    tokens:[{type: Object}]
}, {
    timestamps: true
})
userSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    })
})

const User = mongoose.model("User", userSchema)

export default User