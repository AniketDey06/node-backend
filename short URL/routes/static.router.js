const express = require("express");
const URL = require("../model/url.model");

const router = express.Router();

router.get('/', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home.view.ejs", {
        urls: allUrls,
    })
})

module.exports = router;