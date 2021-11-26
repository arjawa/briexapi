const router = require("express").Router();
const wikiController = require("../controllers/wikiController");


router.get("/search", wikiController.search);

module.exports = router;