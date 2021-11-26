const router = require("express").Router();
const wpController = require("../controllers/wpController");


router.get("/search", wpController.wallpaper);

module.exports = router;