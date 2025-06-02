import User from "../model/User.model.js"
import crypto from "crypto"
import nodemailer from "nodemailer"

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

        const nodemailer = require("nodemailer");

        // Create a test account or replace with real credentials.
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        const mailOption = {
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: user.email,
            subject: "verify Your email",
            text: `Pleace click to on to the following link: ${process.env.BASE_URL}/api/v1/users/verify/${token}`, // plain‑text body
            html: "<b>Hello world?</b>", // HTML body
        }

        await transporter.sendMail(mailOption);

        res.status(201).json({
            message: "User registered success fully",
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
            message: "invalid token"
        })
    }

    const user = await User.findOne({ verificationToken: token })

    if (!user) {
        return res.status(400).json({
            message: "invalid token"
        })
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save()
}

const login = async (req, res) => {
    res.send("loged in")
}

export {
    registerUser,
    verifyUser,
    login
}