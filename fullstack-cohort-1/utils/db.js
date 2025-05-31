import mongoose from 'mongoose'

import dotenv from "dotenv"
dotenv.config()

const dbConnect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('db connected'))
        .catch((err) => {
            console.log("failed to Connect");
        })
}

export default dbConnect;