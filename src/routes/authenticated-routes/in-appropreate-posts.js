const express = require('express')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
let InAppropreatePosts = require('../../models/in-appropriate-posts')
const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const inAppropreatePosts = await InAppropreatePosts.find()
    res.send(inAppropreatePosts)
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
      const data = await InAppropreatePosts.find()
      if(data.length > 0)
        await InAppropreatePosts.findOneAndUpdate({name: "inappropreatepost"}, 
          {$addToSet: {
            inAppropreatePosts: req.body.id
          
        }}, {useFindAndModify: true})
      else{
        const inAppropreatePosts = new InAppropreatePosts({
            inAppropreatePosts: [req.body.id]
        })
        inAppropreatePosts.save()
      }
      res.status(201).send('')
    } catch (err) {

      res.status(500).send('Server Error')
    }
  }
)

router.delete('/:id', auth, async (req, res) => {
  try {
    const inAppropreatePosts = await InAppropreatePosts.find()
    if (inAppropreatePosts[0].inAppropreatePosts.length === 0) {
      return res.status(404).json({ msg: 'No inAppropreatePosts found to delete' })
    }

    await InAppropreatePosts.findOneAndUpdate({name: 'inappropreatepost'}, {
      $pull: {
        inAppropreatePosts: req.params.id
      }
    }, {useFindAndModify: true})
    res.send(`Deleted record ${req.params.id} successfully`)
  } catch (err) {
    res.status(500).send(err.toString())
  }
})

module.exports = router
