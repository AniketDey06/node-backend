import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            success: false,
            message: "All fields required"
        })
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists",
            })
        }

        // hash 
        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = crypto.randomBytes(32).toString("hex")

        await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                verificationToken,
            }
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
            message: "Registration faild",
        })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body

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

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invali email"
            })
        }

        const isMatch = bcrypt.compare(password, user.password)
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

        res.cookieOptions = {
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
            message: "Registration faild",
        })
    }
}