import express from 'express'
import { registerUser, verifyUser, loginUser, getProfile, logoutUser, forgotPassword } from '../controllers/auth.controllers.js'
import { isLogedIn } from '../middleware/auth.middleware.js'
const userRouter = express.Router()

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/verify/:token', verifyUser);
userRouter.get('/profile', isLogedIn, getProfile)
userRouter.get('/logout', isLogedIn, logoutUser)
userRouter.post("/forgotpassword", forgotPassword)
// router.post("/resetpassword/:token", resetPassword)


export default userRouter;