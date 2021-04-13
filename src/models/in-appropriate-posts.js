const mongoose = require('mongoose')

const inAppropreatePosts = mongoose.Schema({
    inAppropreatePosts: [mongoose.Schema.Types.ObjectId],
    name: {
        type: String,
        default: 'inappropreatepost'
    }
})

module.exports = mongoose.model('InAppropreatePost', inAppropreatePosts)