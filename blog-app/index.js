import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

// db connect module
import dbConnect from './src/utils/db.js'

// import routes
import { userRouter } from './src/routes/user.router.js'
import { blogRouter } from './src/routes/blog.router.js'

// import middlewares
import { checkForAuthenticationCookie } from './src/middlewares/authentication.middlewares.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// db connection
dbConnect()

app.set('view engine', 'ejs')
app.set('views', path.resolve('./src/views'))

app.use(express.urlencoded({extended: false}))
app.use(express.json()) // Add JSON parsing if you're handling JSON requests
app.use(cookieParser())

// Authentication middleware - applied globally
app.use(checkForAuthenticationCookie("token"))

app.get('/', (req, res) => {
    res.render("home",{
        user: req.user
    })
})

app.use('/user', userRouter)
app.use('/blog', blogRouter)

app.listen(PORT, () => console.log(`server Started at ${PORT}`))