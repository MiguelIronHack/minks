const express = require("express");
const router = new express.Router();
const { ensureAuth } = require("../config/auth");
const apiThread = require("./api_thread");

const getAllThreads = apiThread[1];

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
      "script.js",
      "knob.js"
    ]
  });
});
// Dashboard
router.get("/dashboard", ensureAuth, (req, res) =>
  res.render("dashboard", {
    script: ["nav.js"],
    name: req.user.name
  })
);
// Forum

router.get("/forum", (req, res, next) => {
  getAllThreads()
    .then(result => {
      res.render("forum", { threads: result, script: ["forum.js"] });
    })
    .catch(err => console.log(err));
});

module.exports = router;
