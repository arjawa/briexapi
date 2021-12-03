const router = require("express").Router();
const checkApikey = require("../middleware/checkApikey");
const {
  memeid
} = require("../controllers/memeController");
const {
  igStalk,
  igFoto,
  igVideo
} = require("../controllers/igController");
const {
  ytSearch,
  ytAudio,
  ytVideo
} = require("../controllers/youtubeController");
const {
  ttAudio,
  ttVideo
} = require("../controllers/tiktokController");
const {
  pinterest
} = require("../controllers/pinterestController");
const {
  textpro
} = require("../controllers/textmakerController");
const {
  wallpaperCave
} = require("../controllers/wallpaperController");


router.get("/meme", checkApikey, memeid);
router.get("/ig/stalk", checkApikey, igStalk);
router.get("/ig/foto", checkApikey, igFoto);
router.get("/ig/video", checkApikey, igVideo);
router.get("/yt/search", checkApikey, ytSearch);
router.get("/yt/audio", checkApikey, ytAudio);
router.get("/yt/video", checkApikey, ytVideo);
router.get("/tiktok/audio", checkApikey, ttAudio);
router.get("/tiktok/video", checkApikey, ttVideo);
router.get("/pinterest", checkApikey, pinterest);
router.get("/textpro/:style", checkApikey, textpro);
router.get("/wallpaper", checkApikey, wallpaperCave);

module.exports = router;