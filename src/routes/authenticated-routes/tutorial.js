const express = require('express')
const { validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
let Tutorial = require('../../models/tutorial')
const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const tutorials = await Tutorial.find()
    res.send(tutorials)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.get('/:id', auth, (req, res) => {
  try {
    const tutorial = Tutorial.findById(req.params.id)
    if (!tutorial) {
      return res.status(404).send('Tutorial not found')
    }
    res.send(tutorial)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const newtutorial = new Tutorial({
      videoUrl: req.body.videoUrl,
      title: req.body.title,
      petType: req.body.petType
    })
    const result = await newtutorial.save()

    res.send(result)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.delete('/', auth, async (req, res) => {
  try {
    const tutorial = Tutorial.findById(req.body.id)
    if (!tutorial) {
      return res.status(404).json({ msg: 'Tutorial not found' })
    }
    const result = await Tutorial.findByIdAndDelete(req.body.id)
    res.send(result)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.put('/', auth, async (req, res) => {
  try {
    const tutorial = Tutorial.findById(req.body.id)
    if (!tutorial) {
      return res.status(404).json({ msg: 'Tutorial not found' })
    }

    tutorial.videoUrl = req.body.videoUrl
    tutorial.title = req.body.title
    tutorial.petType = req.body.petType

    await tutorial.save()
    res.send(tutorial)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

module.exports = router
