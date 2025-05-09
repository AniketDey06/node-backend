const express = require("express");
const URL = require("../model/url.model");

const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.user) return res.redirect('/login');
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home.view.ejs", {
        urls: allUrls,
    })
})

router.get('/signup', async (req, res) => {
    return res.render("signup.view.ejs");
})

router.get('/login', async (req, res) => {
    return res.render("login.view.ejs");
})

module.exports = router;