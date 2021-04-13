const express = require('express')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
let BookMarks = require('../../models/bookmarks')
const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const bookMarks = await BookMarks.find()
    res.send(bookMarks)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.post(
  '/',
  auth,
  [
    check('id', 'ID is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const data = await BookMarks.find()
      if(data.length > 0)
        await BookMarks.findOneAndUpdate({name: "bookmark"}, 
          {$addToSet: {
            bookMarks: req.body.id
          
        }}, {useFindAndModify: true})
      else{
        const bookMark = new BookMarks({
          bookMarks: [req.body.id]
        })
        bookMark.save()
      }
      res.status(201).send('')
    } catch (err) {

      res.status(500).send('Server Error')
    }
  }
)

router.delete('/:id', auth, async (req, res) => {
  try {
    const bookMarks = await BookMarks.find()
    if (bookMarks[0].bookMarks.length === 0) {
      return res.status(404).json({ msg: 'No bookmarks found to delete' })
    }

    await BookMarks.findOneAndUpdate({name: 'bookmark'}, {
      $pull: {
        bookMarks: req.params.id
      }
    }, {useFindAndModify: true})
    res.send(`Deleted record ${req.params.id} successfully`)
  } catch (err) {
    res.status(500).send(err.toString())
  }
})

module.exports = router
