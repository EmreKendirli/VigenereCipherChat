import mongoose from "mongoose";
const {
    Schema
} = mongoose;
const userFileSchema = new Schema({
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


const UserFile = mongoose.model("user_file", userFileSchema)

export default UserFile