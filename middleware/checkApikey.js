const {
  checkApikey
} = require("../models/apiModel");
const {
  getDateInt
} = require("../lib/functions");


module.exports = async (req, res, next) => {
  let apikey = req.headers["x-api-key"];
  if (!apikey) return res.status(401).send("API key is missing");
  let isKeyValid = await checkApikey(apikey, getDateInt());
  if (isKeyValid !== true) return res.status(401).send(isKeyValid);
  next();
};