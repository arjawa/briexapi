const router = require("express").Router();
const fs = require("fs");

router.get("", (req, res) => {
    let memes = fs.readdirSync("./memes");
    let random = memes[Math.floor(Math.random() * memes.length)];
    res.json({"url": req.protocol + '://' + req.get('host') + "/memes/" + random})
});


module.exports = router;