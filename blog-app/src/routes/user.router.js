import { Router } from 'express'

import { signinRender, signupRender, signup, signin, logout } from '../controllers/user.controller.js'

const userRouter = Router();

userRouter.get('/signin', signinRender)
userRouter.get('/signup', signupRender)
userRouter.post('/signup', signup)
userRouter.post('/signin', signin)
userRouter.get('/logout', logout)

export {
    userRouter
}