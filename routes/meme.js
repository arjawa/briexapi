const router = require("express").Router();
const memeController = require("../controllers/memeController");

router.get("/", memeController.getMeme);

module.exports = router;