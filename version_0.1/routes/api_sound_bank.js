const express = require("express");
const router = new express.Router();
const SoundBank = require("../models/Sound_Bank");

const getAll = () => SoundBank.find();
const create = item => SoundBank.create(item);
const getOne = id => SoundBank.findById(id);
const deleteOne = id => SoundBank.deleteOne({ _id: id });
const updateOne = id => SoundBank.updateOne(id);

router.get("/all", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

router.post("/create", (req, res) => {
  console.log(req.body);
  create(req.body)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

router.get("/:id", (req, res) => {
  getOne(req.params.id)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params.id)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

router.patch("/:id", (req, res) => {
  updateOne(req.params.id, req.body)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

module.exports = [router, getAll, create, updateOne, getOne, deleteOne];
