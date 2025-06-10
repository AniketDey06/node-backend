import mongoose, { model } from "mongoose";
import { createHmac, randomBytes } from "crypto"

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
        // require: true,
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

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return

    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static('matchPassword', async function (email, password) {
    const user = await this.findOne({ email })
    if (!user) throw new Error('User not found!');
    console.log(user);
    
    const salt = user.salt;
    const hashedPassword = user.password

    const userProvidedHashedPass = createHmac('sha256', salt)
        .update(password)
        .digest("hex");

    if (hashedPassword!==userProvidedHashedPass) throw new Error('Invalid Password!');

    return {...user, password: undefined, salt: undefined};
})

const User = mongoose.model('user', userSchema);

export default User