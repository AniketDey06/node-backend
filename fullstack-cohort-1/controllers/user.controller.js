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

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        console.log("getProfile", user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            });
        }

        res.status(200).json({
            message: "user profile",
        })
        //     const data = req.user
        //     console.log("profile controller",data);

        //     return res.status(200).json({
        //         message: "your profile",
        //     })
    } catch (error) {
        res.status(400).json({
            message: "User not registered",
            error,
            success: false,
        })
    }
}

const logout = async (req, res) => {
    try {
        res.cookie('token', '', {})
        res.status(200).json({
            success: true,
            message: "log out"
        })
    } catch (error) {

    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({
            message: "Email field is required"
        });
    }

    try {
        const user = await User.findOne({ email })
        console.log("try block", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user dose not exist",
            });
        }

        const token = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = token;

        const resetTokenValidity = Date.now() + (10 * 60 * 1000)
        user.resetPasswordExpires = resetTokenValidity

        console.log("at the end", user);
        await user.save()

        res.status(201).json({
            message: "Reset Password Token seted success fully",
            token,
            success: true,
        })
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        try {
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            })

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "user not found",
                });
            }

            user.password = password;
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            user.save()

            res.status(201).json({
                message: "password updated success fully",
                user,
                success: true,
            })

        } catch (error) {

        }

    } catch (error) {

    }
}

export {
    registerUser,
    verifyUser,
    loginUser,
    getProfile,
    logout,
    forgotPassword,
    resetPassword,
}