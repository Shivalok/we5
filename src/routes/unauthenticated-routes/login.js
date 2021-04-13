const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const buildError = require("../../utils/error-builder");

let User = require("../../models/user");

router.post(
  "/",
  [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return buildError(res, 400, errors.array());
    }
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return buildError(res, 400, "User not found");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return buildError(res, 400, "Invalid credentials");
      }
      const payload = {
        user: {
          id: user.id,
          name: user.name,
          isOnBoarded: user.isOnBoarded,
        },
      };
      jwt.sign(payload, TOKEN_SECRET, { expiresIn: "30d" }, (error, token) => {
        if (error) {
          throw error;
        }
        res.send({ token });
      });
    } catch (error) {
      return buildError(res, 500, error.message);
    }
  }
);

module.exports = router;
