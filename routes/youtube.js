const router = require("express").Router();
const youtubeController = require("../controllers/youtubeController");


router.get("/search", youtubeController.search);
router.get("/audio", youtubeController.getAudio);
router.get("/video", youtubeController.getVideo);

module.exports = router;