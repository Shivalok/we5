let mongoose = require("mongoose");

const termsAndConditionsSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TermsAndConditions", termsAndConditionsSchema);
