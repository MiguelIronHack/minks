const express = require("express");
const router = new express.Router();
const Post = require("../models/UserPost");
const apiThread = require("./api_thread");

const getAll = () => Post.find().populate("owner");
const create = item => Post.create(item);
const getOne = id => Post.findById(id).populate("owner");
const deleteOne = id => Post.deleteOne({ _id: id });
const updateOne = id => Post.updateOne(id).populate("owner");

const updateThread = apiThread[4];

router.get("/all", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

router.post("/create", (req, res) => {
  const { owner, message, threadId } = req.body;
  console.log(owner, message, threadId);
  create({ owner, message })
    .then(dbRes => {
      updateThread(threadId, { $push: { posts: dbRes._id } })
        .then(result => {
          console.log("success : ", result);
        })
        .catch(err => {
          console.log(err);
        });
      return res.status(200).json(dbRes);
    })
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
