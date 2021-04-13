const express = require('express')
const { check, validationResult } = require('express-validator')
let Event = require('../../models/event')
const router = express.Router()
const upload = require("../../utils/image-uploader")
const buildError = require("../../utils/error-builder");


router.get('/', async (req, res) => {
    try {
        const events = await Event.find()
        res.send(events)
    } catch (err) {
        res.status(500).send('Server error')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const event = await Event.find({ _id: req.params.id })
        if (!event) {
            return res.status(404).send('Event not found')
        }
        res.send(event)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
})

router.post('/', upload.single("file"), async (req, res) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return buildError(res, 400, errors.array());
        }
        let fileurl = '';
        if (req.file) {
            fileurl = req.file.filename;
        }
        const newevent = new Event({
            user: req.body.user,
            eventName: req.body.eventName,
            eventLocation: req.body.eventLocation,
            eventLimit: req.body.eventLimit,
            eventPrice: req.body.eventPrice,
            evenCategory: req.body.evenCategory,
            eventAge: req.body.eventAge,
            eventImageUrl: fileurl,
        })
        const result = await newevent.save()

        res.send(result)
    } catch (err) {
        res.status(500).send('Server error')
    }
})

router.delete('/', async (req, res) => {
    try {
        const event = Event.findById(req.body.id)
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' })
        }
        const eventdel = await Event.findByIdAndDelete(req.body.id)
        res.json({ msg: 'Event deleted' });
    } catch (err) {
        res.status(500).send('Server error')
    }
})

router.put('/', upload.single("file"), async (req, res) => {

    try {
        const event = await Event.findById(req.body.id)
        console.log(req.body.id)
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' })
        }
        let fileurl = '';
        if (req.file) {
            fileurl = req.file.filename;
        }
        event.eventName = req.body.eventName
        event.eventLocation = req.body.eventLocation
        event.eventLimit = req.body.eventLimit
        event.eventPrice = req.body.eventPrice
        event.evenCategory = req.body.eventLimit
        event.eventAge = req.body.eventAge
        event.eventImageUrl = req.body.eventLocation
        event.eventCreated = req.body.eventLimit
        event.eventDate = req.body.eventDate

        await event.save()
        res.send(event)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
})

module.exports = router
