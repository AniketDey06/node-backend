import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnect from './utils/db.js'

dotenv.config()

const app = express()

dbConnect()

app.use(
    cors({
        origin: process.env.BASE_URL,
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
