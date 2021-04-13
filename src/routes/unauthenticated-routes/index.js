const express = require("express");
const router = express.Router();
const login = require("./login");
const register = require("./register");
const termsAndConditions = require("./terms-and-conditions")


router.use("/login", login);
router.use("/register", register);
router.use("/termsAndConditions", termsAndConditions);


module.exports = router;
