const express = require('express');

const router = express.Router();

////// ROUTES ///////
router.get("/", function (req, res) {
  res.render("index");
});

router.get("/about", function (req, res) {
  res.render("about");
});

module.exports = router;
