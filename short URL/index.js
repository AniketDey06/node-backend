const express = require("express");
require('dotenv').config();

const { conenectToMongiDB } = require("./utils/db")
const URL = require('./model/url.model')
const urlRoute = require('./routes/url.router')

const app = express();
const PORT = process.env.PORT || 8001
conenectToMongiDB(process.env.DB_URI).then(() => console.log("mongoDB Connected"))

app.use(express.json())

app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
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

    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`server Started on ${PORT}`))