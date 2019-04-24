const express = require("express");
const router = new express.Router();
const Thread = require("../models/Thread");

const getAll = () => Thread.find();
const create = data => Thread.create(data);
const getOne = id => Thread.findById(id);
const deleteOne = id => Thread.deleteOne({ _id: id });
const updateOne = id => Thread.updateOne(id);

router.get("/all/:page/:count", (req, res) => {
  console.log(req.params.page, req.params.count);
  getAll()
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

router.post("/create", (req, res) => {
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
