import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unquie: true,
    },
    salt: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    profileImageURL: {
        type: String,
        default: '/images/default.png',
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
}, { timestamps: true })

const User = model('user', userSchema); 

module.exports = User;