const fs = require("fs");


const memeid = async (req, res) => {
  let dirpath = "../public/memes/";
  let memes = fs.readdirSync(dirpath);
  let random = memes[Math.floor(Math.random() * memes.length)];
  res.sendFile(dirpath + random);
};

module.exports = {
  memeid
};