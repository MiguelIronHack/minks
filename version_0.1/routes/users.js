const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// User model
const User = require('../models/User');

// Login page
router.get('/login', (req, res) => res.render('login', { script: ['nav.js'] }));

// register page
router.get('/register', (req, res) =>
  res.render('register', { script: ['nav.js'] })
);
// register handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;

  let errors = [];
  //check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: ' Passwords do not match' });
  }

  // check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
      script: ['nav.js']
    });
  } else {
    // validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email is already registered' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
          script: ['nav.js']
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        // hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hashPass) => {
            if (err) throw err;
            // hash password
            newUser.password = hashPass;
            // save user
            newUser
              .save()
              .then(user => {
                req.flash('success_msg', 'You are now registered');
                res.redirect('/users/login');
              })
              .catch(err => console.error(err));
          })
        );
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
