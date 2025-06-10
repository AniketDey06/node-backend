import { Router } from 'express'

import { signinRender, signupRender, signup, signin } from '../controllers/user.controller.js'

const userRoutes = Router();
userRoutes
userRoutes.get('/signin', signinRender)
userRoutes.get('/signup', signupRender)
userRoutes.post('/signup', signup)
userRoutes.post('/signin', signin)


export {
    userRoutes
}