const express = require("express");
const app = express();

// configurations
app.set("port", process.env.PORT || 5000);
app.set("view engine", "pug")
app.set("json spaces", 4);

// static files
app.use("/memes", express.static("./memes"));
app.use("/assets", express.static("./assets"));

// routes
app.use("/textmaker", require("./routes/textmaker"));
app.use("/meme", require("./routes/meme"));

app.get("/", async (req, res) => {
	res.render("index");
});

app.listen(app.get("port"), () => {
	console.log("API service running successfully!");
});