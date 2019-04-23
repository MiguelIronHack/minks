const express = require("express");
const router = express.Router();
const SoundBank = require("../models/Sound_Bank");

router.get("/", (req, res, next) => {
  res.render("index");
});

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

router.get("/forum", (req, res, next) => {
  res.render("forum", { script: ["forum.js"] });
});

module.exports = router;
