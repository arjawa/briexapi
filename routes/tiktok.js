const router = require("express").Router();
const tiktokController = require("../controllers/tiktokController");


router.get("/video", tiktokController.getVideo);
router.get("/audio", tiktokController.getAudio);

module.exports = router