const express = require("express");
require('dotenv').config();

const { connectMongoDb } = require('./utils/db')
const { logReqRes } = require('./middlewares/index.middlewares')
const userRouter = require('./routes/user.routes')

// ports setup
const app = express();
const PORT = process.env.PORT || 8000;

// db con
connectMongoDb(process.env.db_URI)

// Schema

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"))

// Routes 
app.use("/api/users", userRouter)

app.listen(PORT, () => console.log(`Server Started at ${PORT}`))