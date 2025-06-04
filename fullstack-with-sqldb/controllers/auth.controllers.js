import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    console.log('regigter user');
    await prisma.User.findUnique({
        where: {email}
    })
}