import express from 'express'
import { resgisterUser } from '../controllers/user.controller.js';

const router = express.Router()

router.get("/register", resgisterUser);

export default router;