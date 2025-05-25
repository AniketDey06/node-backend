const express = require("express");
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser')

const { conenectToMongiDB } = require("./utils/db")

const { checkForAuth, restrictTo } = require('./middlewares/auth.middle')

const URL = require('./model/url.model')

const urlRoute = require('./routes/url.router')
const staticRoute = require('./routes/static.router')
const userRoute = require('./routes/user.router')

const app = express();
const PORT = process.env.PORT || 8001
conenectToMongiDB(process.env.DB_URI).then(() => console.log("mongoDB Connected"))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());
app.use(checkForAuth);

app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home.view.ejs',{
        urls: allUrls,
    })
})

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push:{
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    )

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`server Started on ${PORT}`))