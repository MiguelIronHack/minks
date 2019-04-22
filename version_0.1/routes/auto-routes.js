const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

// User model
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.render("auth/signup", { msg: "Please enter username and password" });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("auth/signup", { msg: "The username already exists" });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass
      });

      newUser.save(err => {
        err
          ? res.render("auth/signup", { msg: "Something went wrong" })
          : res.redirect("/signup");
      });
    })
    .catch(err => next(err));
});

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login");
});

authRoutes.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then(() => {
      passport.authenticate("local", {
        successRedirect: "/private",
        failureRedirect: "/login",
        failureFlash: true,
        passReqToCallback: true
      });
    })
    .catch(err => next(err));
});

authRoutes.get("/private", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

module.exports = authRoutes;
