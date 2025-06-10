import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config()

const dbConnect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch(e => console.log(e))
}

export default dbConnect