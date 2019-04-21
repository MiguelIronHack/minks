const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/play', (req, res, next) => {
  res.render('play');
});

module.exports = router;
