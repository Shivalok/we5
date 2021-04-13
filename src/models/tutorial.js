const mongoose = require('mongoose')

const TutorialSchema = new mongoose.Schema({
  videoUrl: {
    type: String
  },
  title: {
    type: String
  },
  petType: {
    type: String
  }
})

module.exports = mongoose.model('Tutorial', TutorialSchema)
