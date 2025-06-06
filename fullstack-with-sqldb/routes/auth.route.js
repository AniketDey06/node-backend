import express from 'express'
import { registerUser, verifyUser, loginUser, getProfile } from '../controllers/auth.controllers.js'
import { isLogedIn } from '../middleware/auth.middleware.js'
const userRouter = express.Router()

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/verify/:token', verifyUser);
userRouter.get('/profile', isLogedIn, getProfile)

export default userRouter;