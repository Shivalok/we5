let mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  profilePictureUrl: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isOnBoarded: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
