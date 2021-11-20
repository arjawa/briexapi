const router = require("express").Router();
const { textpro } = require("../lib/textmaker");

router.get("/:style", async (req, res) => {
	let style = req.params.style;
	let text1 = req.query.text1;
	let text2 = req.query.text2;
	
	res.header("Content-Type","application/json");
	return res.json(await textpro(style, text1, text2));
});

module.exports = router;