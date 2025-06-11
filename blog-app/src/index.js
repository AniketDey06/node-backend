import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

// db connect module
import dbConnect from './utils/db.js'

// blog model
import Blog from './models/Blog.model.js'

// import routes
import { userRouter } from './routes/user.router.js'
import { blogRouter } from './routes/blog.router.js'

// import middlewares
import { checkForAuthenticationCookie } from './middlewares/authentication.middlewares.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// db connection
dbConnect()

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({extended: false}))
app.use(express.json()) // Add JSON parsing if you're handling JSON requests
app.use(cookieParser())
app.use(express.static(path.resolve('./public')))

// Authentication middleware - applied globally
app.use(checkForAuthenticationCookie("token"))

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home",{
        user: req.user,
        blogs: allBlogs,
    })
})

// Routers 
app.use('/user', userRouter)
app.use('/blog', blogRouter)

app.listen(PORT, () => console.log(`server Started at ${PORT}`))