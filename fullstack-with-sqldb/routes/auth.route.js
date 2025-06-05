import express from 'express'
import { registerUser, verifyUser, loginUser } from '../controllers/auth.controllers.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/verify/:token', verifyUser);

export default userRouter;