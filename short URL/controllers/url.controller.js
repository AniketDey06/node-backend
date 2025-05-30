const shortid = require("shortid");
const URL = require('../model/url.model')

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'url is req!' })

    const checkExistingEntry = await URL.findOne({
        redirectURL: body.url,
        createdBy: req.user._id,
    })

    if(checkExistingEntry){
        return res.end("Short Url is alrady Exsists.")
    }

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