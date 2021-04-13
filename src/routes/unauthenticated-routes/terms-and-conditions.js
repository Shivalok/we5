const express = require("express");
const router = express.Router();
const buildError = require("../../utils/error-builder");
const TermsAndConditions = require("../../models/terms-and-conditions");

router.post("/", async (req, res) => {
  try {
    if (!req.headers.isAdmin) {
      throw new Error("Cannot add terms and conditions");
    }
    const termsAndConditions = new TermsAndConditions({
      term: req.body.term,
    });
    await termsAndConditions.save();
    res.send("Success");
  } catch (error) {
    return buildError(res, 500, error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const termsAndConditions = await TermsAndConditions.find({});
    let terms = termsAndConditions.map((item) => item.term);
    res.send(terms);
  } catch (error) {
    return buildError(res, 500, error.message);
  }
});

module.exports = router;
