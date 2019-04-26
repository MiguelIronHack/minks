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
  console.log("what happened");
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

module.exports = [router, create, getAll, deleteOne, updateOne, getOne];
