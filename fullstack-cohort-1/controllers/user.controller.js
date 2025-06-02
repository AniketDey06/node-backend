import User from "../model/User.model.js"
import crypto from "crypto"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const user = await User.create({
            name,
            email,
            password
        })
        console.log(user);


        if (!user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const token = crypto.randomBytes(32).toString("hex");
        console.log(token)
        user.verificationToken = token

        await user.save()

        // const nodemailer = require("nodemailer");

        // // Create a test account or replace with real credentials.
        // const transporter = nodemailer.createTransport({
        //     host: process.env.MAILTRAP_HOST,
        //     port: process.env.MAILTRAP_PORT,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: process.env.MAILTRAP_USERNAME,
        //         pass: process.env.MAILTRAP_PASSWORD,
        //     },
        // });

        // const mailOption = {
        //     from: process.env.MAILTRAP_SENDEREMAIL,
        //     to: user.email,
        //     subject: "verify Your email",
        //     text: `Pleace click to on to the following link: ${process.env.BASE_URL}/api/v1/users/verify/${token}`, // plain‑text body
        //     html: "<b>Hello world?</b>", // HTML body
        // }

        // await transporter.sendMail(mailOption);

        res.status(201).json({
            message: "User registered success fully",
            token,
            success: true,
        })

    } catch (error) {
        res.status(400).json({
            message: "User not registered",
            error,
            success: false,
        })
    }
};


const verifyUser = async (req, res) => {
    const { token } = req.params;
    if (!token) {
        return res.status(400).json({
            message: "invalid token req"
        })
    }

    const user = await User.findOne({ verificationToken: token })
    console.log(user);

    if (!user) {
        return res.status(400).json({
            message: "user not found"
        })
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save()

    return res.status(201).json({
        message: "your Email hasbeen verified successfully",
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "email and password required"
        })
    }

    try {
        const user = await User.findOne({ email })
        if (!email || !password) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch);

        if (!isMatch) {
            return res.status(400).json({
                message: "invalid email and password"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRESIN
            }
        )

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        }

        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            message: "user loged in",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(400).json({
            message: "User not registered",
            error,
            success: false,
        })
    }
}

export {
    registerUser,
    verifyUser,
    loginUser
}