const express = require('express')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
let Sale = require('../../models/sale')
const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const sales = await Sale.find()
    res.send(sales)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.get('/:id', auth, (req, res) => {
  try {
    const sale = Sale.findById(req.params.id)
    if (!sale) {
      return res.status(404).send('Sale not found')
    }
    res.send(sale)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.post(
  '/',
  auth,
  [
    check('title', 'Title is required')
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
      const newsale = new Sale({
        user: req.user.id,
        petType: req.body.petType,
        breed: req.body.breed,
        color: req.body.color,
        age: req.body.age,
        description: req.body.description,
        title: req.body.title,
        location: req.body.location,
        price: req.body.price,
        phoneNumber: req.body.phoneNumber
      })
      const result = await newsale.save()

      res.send(result)
    } catch (err) {
      res.status(500).send('Server error')
    }
  }
)

router.delete('/', auth, async (req, res) => {
  try {
    const sale = Sale.findById(req.body.id)
    if (!sale) {
      return res.status(404).json({ msg: 'Sale not found' })
    }
    const result = await Sale.findByIdAndDelete(req.body.id)
    res.send(result)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.put('/', auth, async (req, res) => {
  try {
    const sale = Sale.findById(req.body.id)
    if (!sale) {
      return res.status(404).json({ msg: 'Sale not found' })
    }

    sale.petType = req.body.petType
    sale.breed = req.body.breed
    sale.color = req.body.color
    sale.age = req.body.age
    sale.description = req.body.description
    sale.title = req.body.title
    sale.location = req.body.location
    sale.price = req.body.price
    sale.phoneNumber = req.body.phoneNumber

    await sale.save()
    res.send(sale)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

module.exports = router
