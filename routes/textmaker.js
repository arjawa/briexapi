const router = require("express").Router();
const textmakerController = require("../controllers/textmakerController");

router.get("/:style", textmakerController.createText);

module.exports = router;