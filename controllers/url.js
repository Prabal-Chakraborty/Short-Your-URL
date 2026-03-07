const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateShortUrl(req,res) {
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error:'url is required'});
    }
    const shortID = shortid.generate();
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitedHistory: []
    });
    res.json({ id: shortID });
}
async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortID:shortId});
    return res.json({totalClicks: result.visitedHistory.length, analytics: result.visitedHistory});
}

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics
}