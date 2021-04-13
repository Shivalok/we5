const express = require('express')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
let LostPet = require('../../models/lost-pets')
const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const lostPets = await LostPet.find()
    res.send(lostPets)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.get('/:id', auth, async(req, res) => {
  try {
    const lostPet = await LostPet.findById(req.params.id).exec()
    if (!lostPet) {
      return res.status(404).send('Pet not found')
    }
    res.send(lostPet)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.post(
  '/',
  auth,
  [
    check('breed', 'Breed is required')
      .not()
      .isEmpty(),
      check('age', 'Age is required')
      .not()
      .isEmpty(),
      check('color', 'Color is required')
      .not()
      .isEmpty(),
      check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('phoneNumber', 'Phone number must be 10 digits').isLength({
      min: 10,
      max: 10
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const lostPet = new LostPet({
        name: req.body.name,
        breed: req.body.breed,
        color: req.body.color,
        age: req.body.age,
        description: req.body.description,
        lastSeenAt: req.body.lastSeenAt,
        belongsTo: req.body.belongsTo, // unique id if user exists in user db
        phoneNumber: req.body.phoneNumber
      })
      const result = await lostPet.save()

      res.send(result)
    } catch (err) {
      res.status(500).send('Server error')
    }
  }
)

router.delete('/:id', auth, async (req, res) => {
  try {
    const lostPet = await LostPet.findById(req.params.id).exec()
    if (!lostPet) {
      return res.status(404).json({ msg: 'Pet not found' })
    }
    const result = await LostPet.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const lostPet = await LostPet.findById(req.params.id).exec()
    
    if (!lostPet) {
      return res.status(404).json({ msg: 'Pet not found' })
    }

    lostPet.name = req.body.name
    lostPet.breed = req.body.breed
    lostPet.color = req.body.color
    lostPet.age = req.body.age
    lostPet.description = req.body.description
    lostPet.lastSeenAt = req.body.lastSeenAt
    lostPet.belongsTo = req.body.belongsTo
    lostPet.phoneNumber = req.body.phoneNumber

    await lostPet.save()
    res.send(lostPet)
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

module.exports = router
