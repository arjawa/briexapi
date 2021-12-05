const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
require("dotenv").config();


app.set("port", process.env.PORT || 5000);
app.set("view engine", "ejs");
app.set("json spaces", 4);

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cors());
app.use(morgan("[:date[clf]] :remote-addr :method :url :status - :response-time ms"));
app.use("/", express.static("./public"));
app.use((req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.sendFile(__dirname + '/favicon.ico');
  } else {
    next();
  }
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(function(req, res, next) {
  res.locals.userData = req.session.userData;
  res.locals.loggedIn = req.session.loggedIn;
  next();
});

app.use("/", require("./routes/pages"));
app.use("/api", require("./routes/api"));

// notfound exception
app.use((req, res) => {
  res.status(404).send("<h2>404 Not found</h2>");
});

app.listen(app.get("port"), () => {
  console.log(`Server started on port ${app.get("port")}`);
});