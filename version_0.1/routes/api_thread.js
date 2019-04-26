const express = require("express");
const router = new express.Router();
const Thread = require("../models/Thread");
const UserPost = require("../models/UserPost");

const getAll = () => Thread.find().populate("owner");
const create = data => Thread.create(data);
const getOne = id => {
  return Thread.findById(id)
    .populate({
      path: "posts",
      populate: { path: "owner" }
    })
    .populate("owner");
};

const deleteOne = id => Thread.deleteOne({ _id: id });
const updateOne = (id, data) => Thread.updateOne({ _id: id }, data);

router.get("/all", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

router.post("/create", (req, res) => {
  create(req.body)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send({ msg: " All fields should be filled" }));
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
module.exports = [router, getAll, create, getOne, updateOne, getOne, deleteOne];
