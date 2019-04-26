require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const apiSoundBankRouter = require("./routes/api_sound_bank");
const apiThread = require("./routes/api_thread");
const apiPost = require("./routes/api_post");
const userAPI = require("./routes/api_user");
const newsAPI = require("./routes/api_news");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser());
app.locals.site_url = process.env.SITE_URL;
// Passport config
require("./config/passport")(passport);

// connect to mongo
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//
function checkLogin(req, res, next) {
  res.locals.isLoggedIn = req.isAuthenticated();
  res.locals.user = req.user;
  console.log(res.locals, res.locals.user);
  next();
}

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

// Middleware Setup
app.use(logger("dev"));
app.use(cookieParser());
app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true
  })
);
// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser (no installation needed )
app.use(express.urlencoded({ extended: false }));

// SASS
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);
// views config
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// app.use('/', index);
app.use("/api/soundbank", apiSoundBankRouter);
app.use("/api/post", apiPost);
app.use("/api/thread", apiThread);
app.use("/api/user", userAPI);
app.use("/api/news", newsAPI);
// app.use('/', authRoutes);
// default value for title local
app.locals.title = "Minks";

// Express session
app.use(
  session({
    secret: "secgzdaet",
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(checkLogin);
// Connect flash
app.use(flash());

// global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
module.exports = app;
