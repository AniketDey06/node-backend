import express from 'express'
import {
    registerUser,
    verifyUser,
    loginUser,
    getProfile,
    logout,
    forgotPassword,
    resetPassword,
} from '../controllers/user.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.get("/profile", isLoggedIn, getProfile)
router.get("/logout", isLoggedIn, logout)
router.post("/forgotpassword", forgotPassword)

export default router;