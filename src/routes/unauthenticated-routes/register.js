const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const buildError = require("../../utils/error-builder");
const User = require("../../models/user")

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return buildError(res, 400, errors.array());
    }
    try {
      const hashPass = await bcrypt.hash(req.body.password, 12);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
      });
      await newUser.save();
      const payload = {
        user: {
          id: newUser.id,
          name: newUser.name,
        },
      };
      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { expiresIn: "30d" },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.send({ token });
        }
      );
    } catch (error) {
      return buildError(res, 500, error.message);
    }
  }
);

module.exports = router;
