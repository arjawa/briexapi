const express = require("express");
const app = express();

// configurations
app.set("port", process.env.PORT || 5000);
app.set("json spaces", 4);

// static files
app.use("/", express.static("./public"));
app.use((req, res, next) => {
    if (req.url === '/favicon.ico') {
		res.sendFile(__dirname + '/favicon.ico');
	} else {
		next();
	}
});

// routes
app.use("/", require("./routes/index"));
app.use("/textmaker", require("./routes/textmaker"));
app.use("/meme", require("./routes/meme"));
app.use("/youtube", require("./routes/youtube"));
app.use("/tiktok", require("./routes/tiktok"));
app.use("/ig", require("./routes/ig"));
app.use("/pinterest", require("./routes/pinterest"));
app.use("/wallpaper", require("./routes/wp"));
app.use("/wikipedia", require("./routes/wikipedia"));

// notfound exception
app.use((req, res) => {
    res.status(404).send("<h2>404 Not found</h2>");
})

app.listen(app.get("port"), () => {
	console.log("API service running successfully!");
});