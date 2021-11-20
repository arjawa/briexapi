const express = require("express");
const app = express();

app.set("port", process.env.PORT || 5000);
app.set("json spaces", 4);
app.use("/memes", express.static("./memes"));
app.use("/api", require("./routes/textmaker"));
app.use("/meme", require("./routes/meme"));

app.get("/", async (req, res) => {
	res.send("Hello World!");
});

app.listen(app.get("port"), () => {
	console.log("API service running successfully!");
});