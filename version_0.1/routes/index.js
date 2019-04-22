const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/play', (req, res, next) => {
  res.render('play', {
    script: [
      'user_keyboard.js',
      'play.js',
      'oscillator.js',
      'MIDI_controller.js',
      'drumMachine.js',
      'script.js'
    ]
  });
});

router.get('/forum', (req, res, next) => {
  res.render('forum', { script: ['forum.js'] });
});

module.exports = router;
