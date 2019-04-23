const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../config/auth');
const SoundBank = require('../models/Sound_Bank');

// Index
router.get('/', (req, res, next) => {
  res.render('index', {
    script: ['index.js']
  });
});
// Play are
router.get('/play', (req, res, next) => {
  res.render('play', {
    script: [
      'user_interface.js',
      'play.js',
      'oscillator.js',
      'MIDI_controller.js',
      'drum_machine.js',
      'script.js',
      'knob-min.js'
    ]
  });
});
// Dashboard
router.get('/dashboard', ensureAuth, (req, res) =>
  res.render('dashboard', {
    script: ['dashboard.js'],
    name: req.user.name
  })
);
// Forum
router.get('/forum', (req, res, next) => {
  res.render('forum', { script: ['forum.js'] });
});

module.exports = router;
