const fs = require("fs");


const getMeme = (req, res) => {
    let memes = fs.readdirSync("./public/memes");
    let random = memes[Math.floor(Math.random() * memes.length)];
    res.json({"url": req.protocol + '://' + req.get('host') + "/memes/" + random});
}

module.exports = { getMeme }