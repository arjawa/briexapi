const axios = require("axios");
const cheerio = require("cheerio");


const wallpaper = async (req, res) => {
    let query = req.query.q;
    if (!query) return res.json({error: "please provide a valid parameter!"});
    try {
        let query = req.params.q;
        const wp = await axios.get('https://wallpapercave.com/search?q=' + query);
        const $ = await cheerio.load(wp.data)
        hasil = []
        $("#suwp > a").each(function(a, b) {
            const img = $(b).find("img").attr('src');
            if (!$(b).find('img').attr('src').includes('.gif')) {
				hasil.push('https://wallpapercave.com' + $(b).find('img').attr('src').replace('fuwp', 'uwp'))
			}
        })
        res.json(hasil)
    } catch (e) {
        console.log(e);
        res.send("Error")
    }
}

module.exports = { wallpaper }