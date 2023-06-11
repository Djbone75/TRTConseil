const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const flash = require("connect-flash");
const { middleware } = require("./middleware");
require("dotenv").config();

const http = require("http");

const passport = require("passport");
const initializePassport = require("./passportConfig");
initializePassport(passport);

const session = require("express-session");

const helmet = require("helmet");

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.session());
app.use(flash());

app.use(middleware);
const PORT = process.env.PORT || 3030;
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(helmet());

app.use("/", postRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

http.createServer(app).listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
