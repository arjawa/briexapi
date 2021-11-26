const axios = require("axios");
const cheerio = require("cheerio");


const wallpaper = async (req, res) => {
    let query = req.query.q;
    if (!query) return res.json({error: "please provide a valid parameter!"});
    try {
        const wp = await axios.get(`https://www.wallpaperflare.com/search?wallpaper=${query}`)
        const $ = await cheerio.load(wp.data)
        hasil = []
        $("#gallery > li > figure> a").each(function(i, cuk) {
            const img = $(cuk).find("img").attr('data-src');
            if(img != undefined && hasil.length <= 15) hasil.push(img)
        })
        res.json(hasil)
    } catch (e) {
        console.log(e);
    }
}

module.exports = { wallpaper }