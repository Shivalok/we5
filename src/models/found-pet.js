let mongoose = require("mongoose");

const foundPetSchema = new mongoose.Schema({
  breed: {
    type: String,
    required: true
  },
  possibleAge: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: true
  },
  foundAt: {
    type: String
  },
  color: {
      type: String,
      required: true
  },
  rackNumber: {
      type: String,
      required: true
  },
  foundBy: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model("FoundPet", foundPetSchema);
