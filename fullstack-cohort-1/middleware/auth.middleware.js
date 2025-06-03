import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
    try {
        console.log(req.cookies);
        let token = req.cookies?.token || ""
        console.log(token);

        if (!token) {
            console.log("no token");
            return res.status(401).json({
                success: false,
                message: "Authemtication Fail"
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded);
            req.user = decoded

            next()
        } catch (error) {
            console.log("auth midd fail");
            return res.status(500).json({
                success: false,
                message: "Authemtication Fail"
            })
        }


    } catch (error) {

    }

    next();
}