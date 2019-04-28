const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getAll = () => User.find();
const create = item => User.create(item);
const getOne = id => User.findById(id);
const deleteOne = id => User.deleteOne({ _id: id });
const updateOne = id => User.updateOne(id);

router.post("/create", (req, res) => {
  let { password, email } = req.body;
  let name = req.body.userName;
  let role = "admin";
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(password, salt, (err, hashPass) => {
      if (err) throw err;
      password = hashPass;
      create({ name, password, email, role })
        .then(dbRes => {
          res.status(200).json(dbRes);
        })
        .catch(dbErr => {
          res.send(dbErr);
        });
    })
  );
});

router.get("/all", (req, res) => {
  getAll()
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

module.exports = [router, create, getAll, deleteOne, updateOne, getOne];
