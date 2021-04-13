const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.send("HELLO");
  } catch (error) {}
});

module.exports = router;
