const mongoose = require('mongoose');

// Schema

const EventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    eventName: {
        type: String,
        required: true,
    },
    eventLocation: {
        type: String,
        required: true,
    },
    eventLimit: {
        type: Number,
    },
    eventPrice: {
        type: Number,
    },
    evenCategory: {
        type: String,
    },
    eventAge: {
        type: Number,
    },
    eventImageUrl: {
        type: String,
    },
    eventCreated: {
        type: Date,
        default: Date.now,
    },
    eventDate: {
        type: Date,
    },
});

module.exports = mongoose.model('Event', EventSchema)