const router = require("express").Router();
const pinterestController = require("../controllers/pinterestController");


router.get("/search", pinterestController.search);

module.exports = router;