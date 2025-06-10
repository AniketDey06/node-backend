import path from 'path'
import express from 'express'
import dotenv from 'dotenv'

// db connect module
import dbConnect from './src/utils/db.js'

// import routes
import { userRoutes } from './src/routes/user.router.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// db connection
dbConnect()

app.set('view engine', 'ejs')
app.set('views', path.resolve('./src/views'))

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render("home")
})

app.use('/user', userRoutes)

app.listen(PORT, () => console.log(`server Started at ${PORT}`))