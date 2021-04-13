let mongoose = require("mongoose");

const lostPetSchema = new mongoose.Schema({
  name: {
    type: String,
    require: false,
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  lastSeenAt: {
    type: String
  },
  color: {
      type: String,
      required: true
  },
  belongsTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
  },
  phoneNumber: {
      type: Number,
      required: true
  }
});

module.exports = mongoose.model("LostPet", lostPetSchema);
