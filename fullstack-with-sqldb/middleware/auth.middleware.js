import jwt from 'jsonwebtoken'

export const isLogedIn = async (req, res, next) => {
    try {
        let token = req.cookies?.token || ""

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Authemtication Fail",
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode

            next()
        } catch (error) {
            console.log("auth failed", error.message);
            return res.status(500).json({
                success: false,
                message: "auth failed",
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
            message: "cookie not found",
        })
    }
}