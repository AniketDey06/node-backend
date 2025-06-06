import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;
    console.log(`in registerUser`, req.body);

    if (!name || !email || !password || !phone) {
        res.status(400).json({
            success: false,
            message: "All fields required"
        })
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        console.log(`in try`, existingUser);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists",
            })
        }

        // hash 
        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = crypto.randomBytes(32).toString("hex")

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                verificationToken,
            }
        })

        return res.status(201).json({
            success: true,
            verificationToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            message: "register Successfully",
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
            message: "Registration faild",
        })
    }
}

const verifyUser = async (req, res) => {
    const { token } = req.params;
    console.log(`token:`, token);

    if (!token) {
        return res.status(400).json({
            message: "token not found"
        })
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                verificationToken: token
            }
        })

        console.log(user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found or invalid token",
            });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                isVerified: true,
            }
        })

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                name: updatedUser.name,
            },
            message: "user verifed successfuly",
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
            message: "verify faild",
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    console.log(`in loginUser`, req.body);

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields required"
        })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        console.log(`in try`, user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invali email"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "invalipassword"
            })
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRESIN
            }
        )

        const cookieOptions = {
            httpOnly: true,
        }

        res.cookie('token', token, cookieOptions)

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            message: "login Successfull",
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
            message: "login faild",
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            // for excluding fields from the query 
            // omit: { 
            //     password: true
            // },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true
            },
            where: {
                id: req.user.id,
            }
        })


        return res.status(200).json({
            message: "user profile",
            user,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
            message: "getProfile faild",
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            select: {
                email: true,
            },
            where: {
                id: req.user.id,
            }
        })
        res.cookie(`token`, "", {})
        return res.status(200).json({
            success: true,
            user,
            message: "logout successfuly",
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
            message: "logout faild",
        })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    console.log(email );

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email field is required",
        });
    }

    try {
        const restToken = crypto.randomBytes(32).toString('hex');
        console.log(`in try`, restToken);
        const restTokenExpiry = Date.now() + (10 * 60 * 1000)
        console.log(`in try`, restTokenExpiry);

        const user = await prisma.user.update({
            where: {
                email
            },
            data: {
                passwordRestToken: restToken,
                passwordRestExpiry: restTokenExpiry.toString(),
            }
        })


        return res.status(200).json({
            success: true,
            user,
            message: "Reset token generated and saved",
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
            message: "forgotPassword faild",
        })
    }
}

export {
    registerUser,
    loginUser,
    verifyUser,
    getProfile,
    logoutUser,
    forgotPassword,
}