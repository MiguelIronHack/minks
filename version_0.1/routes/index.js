const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/play", (req, res, next) => {
  res.render("play", {
    script: [
      "user_keyboard.js",
      "play.js",
      "oscillator.js",
      "MIDI_controller.js",
      "drumMachine.js",
      "script.js"
    ]
  });
});

router.get("/forum", (req, res, next) => {
  res.render("forum", { script: ["forum.js"] });
});

const getDrums = id => sendDrum(id);

router.get("/sounds/", (req, res) => {
  getDrums()
    .then(aiRes => res.status(200).json(aiRes))
    .catch(aiRess => console.log(aiRes));
});

function sendDrum(id) {
  return new Promise((resolve, reject) => {
    resolve("http://localhost:3434/sound_bank/drum_kits/909_kick.wav");
    if (1 > 0) reject("fuck");
  });
}

module.exports = router;
