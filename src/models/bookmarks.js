const mongoose = require('mongoose')

const bookMarks = mongoose.Schema({
    bookMarks: [mongoose.Schema.Types.ObjectId],
    name: {
        type: String,
        default: 'bookmark'
    }
})

module.exports = mongoose.model('BookMarks', bookMarks)