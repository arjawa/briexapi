const fs = require("fs");


const getMeme = (req, res) => {
    let dirpath = process.cwd() + "/public/memes/";
    let memes = fs.readdirSync(dirpath);
    let random = memes[Math.floor(Math.random() * memes.length)];
    res.sendFile(dirpath + random);
}

module.exports = { getMeme }