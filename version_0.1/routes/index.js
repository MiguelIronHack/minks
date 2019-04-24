const express = require("express");
const router = new express.Router();
const { ensureAuth } = require("../config/auth");
const apiThread = require("./api_thread");
const _ = require("lodash");
const getAllThreads = apiThread[1];

// Index
router.get("/", (req, res, next) => {
  res.render("index", {
    script: ["nav.js"]
  });
});
// Play are
router.get("/play", (req, res, next) => {
  res.render("play", {
    script: [
      "user_interface.js",
      "play.js",
      "oscillator.js",
      "MIDI_controller.js",
      "drum_machine.js",
      "script.js",
      "knob.js"
    ]
  });
});
// Dashboard
router.get("/dashboard", ensureAuth, (req, res) =>
  res.render("dashboard", {
    script: ["nav.js"],
    name: req.user.name
  })
);
// Forum
router.post("/forum", ensureAuth, (req, res) => {
  console.log(req.body.page, req.body.pageSize);
});

// const pagination = (pagesCount,items, ) => {
//   if (pagesCount === 1) return null;
//   const pages = _.range(1, pagesCount + 1);

// };
function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}

router.get("/forum", ensureAuth, (req, res) => {
  getAllThreads()
    .then(result => {
      const pageSize = 3;
      const pages = Math.ceil(result.length / pageSize);
      const items = paginate(result, 1, pageSize);
      // console.log(items);
      res.render("forum", {
        userName: req.user.name,
        pages,
        threads: items,
        script: ["forum.js"]
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
