const fs = require("fs");
const path = require("path");


const memeid = async (req, res) => {
  let dirpath = path.join(path.resolve(__dirname, '..'), "/public/memes/");
  let memes = fs.readdirSync(dirpath);
  let random = memes[Math.floor(Math.random() * memes.length)];
  res.sendFile(dirpath + random);
};

module.exports = {
  memeid
};