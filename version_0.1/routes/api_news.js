const express = require("express");
const router = new express.Router();
const News = require("../models/News");

const getAll = () => News.find();
const create = item => News.create(item);
const getOne = id => News.findById(id);
const deleteOne = id => News.deleteOne({ _id: id });
const updateOne = (id, data) => News.updateOne({ _id: id }, data);

router.get("/all", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

router.post("/create", (req, res) => {
  create({ message: req.body.newsMessage, title: req.body.newsTitle })
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
  console.log(req.body);
  updateOne(req.params.id, req.body)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

module.exports = [router, getAll, create, updateOne, getOne, deleteOne];
