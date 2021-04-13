const express = require('express')
const { check, validationResult } = require('express-validator')
let Service = require('../../models/service')
const router = express.Router()
const upload = require("../../utils/image-uploader")
const buildError = require("../../utils/error-builder");


router.get('/', async (req, res) => {
    try {
        const services = await Service.find()
        res.send(services)
    } catch (err) {
        res.status(500).send('Server error')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const service = await Service.find({ _id: req.params.id })
        if (!service) {
            return res.status(404).send('Service not found')
        }
        res.send(service)
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
        const newservice = new Service({
            user: req.body.user,
            profilePictureUrl:fileurl,
            title:req.body.title,
            description:req.body.description,
            price:req.body.price
        })
        const result = await newservice.save()

        res.send(result)
    } catch (err) {
        res.status(500).send('Server error')
    }
})

router.delete('/', async (req, res) => {
    try {
        const service = Service.findById(req.body.id)
        if (!service) {
            return res.status(404).json({ msg: 'Service not found' })
        }
        const servicedel = await Service.findByIdAndDelete(req.body.id)
        res.json({ msg: 'Service deleted' });
    } catch (err) {
        res.status(500).send('Server error')
    }
})

router.put('/', upload.single("file"), async (req, res) => {

    try {
        const service = await Service.findById(req.body.id)
        console.log(req.body.id)
        if (!service) {
            return res.status(404).json({ msg: 'Service not found' })
        }
        let fileurl = '';
        if (req.file) {
            fileurl = req.file.filename;
        }
        service.profilePictureUrl=req.body.profilePictureUrl,
        service.title=req.body.title,
        service.description=req.body.description,
        service.price=req.body.price
        await service.save()
        res.send(service)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
})

module.exports = router;
