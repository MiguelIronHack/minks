const express = require("express");
const router = new express.Router();
const url = "http://localhost:3434";

const getDrums = id => sendDrum(id);

router.get("/sounds/", (req, res) => {
  getDrums()
    .then(aiRes => res.status(200).json(aiRes))
    .catch(aiRess => console.log(aiRes));
});

function sendDrum(id) {
  return new Promise((resolve, reject) => {
    resolve(url + "/sound_bank/drum_kits/909_kick.wav");
    reject("Not found");
  });
}

module.exports = [router, getDrums];
