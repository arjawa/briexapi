const router = require("express").Router();
const igController = require("../controllers/igController");


router.get("/stalk", igController.igStalk);
router.get("/foto", igController.igFoto);
router.get("/video", igController.igVideo);

module.exports = router