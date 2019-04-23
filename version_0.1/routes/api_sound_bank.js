const express = require("express");
const router = new express.Router();
const SoundBank = require("../models/Sound_Bank");

const getDrumKit = () => SoundBank.find();

router.get("/drumkit", (req, res) => {
  getDrumKit()
    .then(result => res.status(200).json(result))
    .catch(err => res.send(err));
});

router.get("/drumkit/test", (req, res) => {
  getDrumKit()
    .then(result => {
      res.render("909_kick", result);
    })
    .catch(err => console.log(err));
});
module.exports = [router, getDrumKit];
