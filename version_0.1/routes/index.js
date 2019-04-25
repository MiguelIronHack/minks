const express = require("express");
const router = new express.Router();
const { ensureAuth } = require("../config/auth");
const apiThread = require("./api_thread");
const _ = require("lodash");
const getAllThreads = apiThread[1];
const getOneThread = apiThread[3];
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
      "script.js"
    ]
  });
});
// Dashboard
router.get("/dashboard", ensureAuth, (req, res) => {
  getAllThreads(req.params.id)
    .then(data =>
      res.render("dashboard", {
        script: ["profile.js"],
        name: req.user.name,
        data: data
      })
    )
    .catch(err => console.error(err));
});
// Forum
// router.post("/forum", ensureAuth, (req, res) => {
//   console.log(req.body.page, req.body.pageSize);
// });

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

router.get("/forum", (req, res) => {
  getAllThreads()
    .then(result => {
      res.render("forum", {
        threads: result.sort((a, b) => b.date - a.date),
        script: ["forum.js"]
      });
    })
    .catch(err => console.log(err));
});

router.get("/thread/:id", (req, res, next) => {
  getOneThread(req.params.id)
    .then(thread => {
      res.render("thread", {
        thread,
        script: ["post.js"]
      });
    })
    .catch(err => console.error(err));
});
module.exports = router;
