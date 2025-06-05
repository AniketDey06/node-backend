import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// custom routes
import userRouter  from './routes/auth.route.js'

dotenv.config()
const port = process.env.PORT || 4000

const app = express()

app.use(cookieParser())
app.use(cors({
    origin: process.env.BASE_URL
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    console.log(`this / route`);
    res.status(200).json({
        succese: true,
        message: "test check"
    })
})

app.use('/api/v1/users', userRouter);

app.listen(port, () => {
    console.log(`Backend Is live on - ${port}`);
})