const express = require('express')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
let FoundPet = require('../../models/found-pet')
const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const foundPets = await FoundPet.find()
    res.send(foundPets)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.get('/:id', auth, async(req, res) => {
  try {
    const foundPet = await FoundPet.findById(req.params.id).exec()
    if (!foundPet) {
      return res.status(404).send('Pet not found')
    }
    res.send(foundPet)
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
      
      check('color', 'Color is required')
      .not()
      .isEmpty(),
      check('description', 'Description is required')
      .not()
      .isEmpty(),
      check('rackNumber', 'RackNumber is required')
      .not()
      .isEmpty(),
      check('foundBy', 'FoundBy is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const foundPet = new FoundPet({
        foundAt: req.body.foundAt,
        breed: req.body.breed,
        color: req.body.color,
        possibleAge: req.body.possibleAge,
        description: req.body.description,
        rackNumber: req.body.rackNumber,
        foundBy: req.body.foundBy
      })
      const result = await foundPet.save()

      res.send(result)
    } catch (err) {
      res.status(500).send('Server error')
    }
  }
)

router.delete('/:id', auth, async (req, res) => {
  try {
    const foundPet = await FoundPet.findById(req.params.id).exec()
    if (!foundPet) {
      return res.status(404).json({ msg: 'Pet not found' })
    }
    const result = await FoundPet.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (err) {
      
    res.status(500).send('Server Error')
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const foundPet = await FoundPet.findById(req.params.id).exec()
    
    if (!foundPet) {
      return res.status(404).json({ msg: 'Pet not found' })
    }

    foundPet.foundAt = req.body.foundAt
    foundPet.breed = req.body.breed
    foundPet.color = req.body.color
    foundPet.possibleAge = req.body.possibleAge
    foundPet.description = req.body.description
    foundPet.rackNumber = req.body.rackNumber
    foundPet.foundBy = req.body.foundBy

    await foundPet.save()
    res.send(foundPet)
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

module.exports = router
