import mongoose from "mongoose";
const {
    Schema
} = mongoose;
const userImageSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    type: {
        type: String,
        enum:["encrypt","decrypt"],
        require: true
    },
    url: {
        type: String,
        require: true
    },

}, {
    timestamps: true
})


const UserImage = mongoose.model("user_image", userImageSchema)

export default UserImage