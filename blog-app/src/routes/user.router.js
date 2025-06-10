import { Router } from 'express'

import { signinRender, signupRender, signup, signin, logout } from '../controllers/user.controller.js'

const userRoutes = Router();

userRoutes.get('/signin', signinRender)
userRoutes.get('/signup', signupRender)
userRoutes.post('/signup', signup)
userRoutes.post('/signin', signin)
userRoutes.get('/logout', logout)

export {
    userRoutes
}