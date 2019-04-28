const express = require("express");
const router = new express.Router();
const { ensureAuth } = require("../config/auth");
const apiThread = require("./api_thread");
const userAPI = require("./api_user");
const newsAPI = require("./api_news");
const _ = require("lodash");
const moment = require("moment");
const userData = require("./utilities/userData");
const getAllThreads = apiThread[1];
const getOneThread = apiThread[3];
const getAllUsers = userAPI[2];
const getAllNews = newsAPI[1];
const getAllPosts = require("./api_post")[1];

// Index
router.get("/", (req, res, next) => {
  res.render("index", {
    script: ["nav.js"]
  });
});
// Play are
router.get("/play", (req, res, next) => {
  res.render("play", {
    script: [
      "user_interface.js",
      "play.js",
      "oscillator.js",
      "MIDI_controller.js",
      "drum_machine.js",
      "script.js"
    ]
  });
});
// Dashboard
router.get("/dashboard", ensureAuth, (req, res) => {
  if (req.user.role === "admin") {
    getAllUsers()
      .then(data => {
        res.render("dashboard", {
          script: ["profile.js", "admin.js"],
          name: req.user.name,
          role: req.user.role,
          data: data
        });
      })
      .catch(err => console.log(err));
  } else {
    Promise.all([
      getAllThreads().catch(error => {
        return error;
      }),
      getAllPosts().catch(error => {
        return error;
      })
    ])
      .then(data => {
        const allPosts = data[1];
        const allThreads = data[0];
        console.log(allPosts.length, allThreads.length);
        res.render("dashboard", {
          script: ["profile.js"],
          name: req.user.name,
          role: req.user.role,
          userThreads: userData(allThreads, req.user._id),
          userPosts: userData(allPosts, req.user._id)
        });
      })
      .catch(err => console.log(err));
  }
});

router.get("/forum", (req, res) => {
  getAllThreads()
    .then(result => {
      res.render("forum", {
        threads: result.sort((a, b) => b.date - a.date),
        script: ["forum.js"],
        moment
      });
    })
    .catch(err => console.log(err));
});

router.get("/news", (req, res) => {
  getAllNews()
    .then(allNews => {
      res.render("news", {
        script: ["nav.js", "news.js"],
        allNews,
        moment
      });
    })
    .catch(err => console.error(err));
});

router.get("/thread/:id", (req, res, next) => {
  getOneThread(req.params.id)
    .then(thread => {
      res.render("thread", {
        thread,
        script: ["post.js"],
        moment
      });
    })
    .catch(err => console.error(err));
});
module.exports = router;
