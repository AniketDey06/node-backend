const shortid = require("shortid");
const URL = require('../model/url.model')

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'url is req!' })
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })

    return res.render("home.view.ejs",{
        id: shortID,
    })
    // return res.json({ id: shortID })
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
        
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}