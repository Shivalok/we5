const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../../middleware')
const sale = require('./sale')
const posts = require('./posts')
const user = require('./user')
const tutorial = require('./tutorial')
const event = require('./event')
const service = require("./service");
const lostPets = require('./lost-pet')
const foundPets = require('./found-pets')
const bookMarks = require('./bookmarks')
const inAppropreatePosts = require('./in-appropreate-posts')


router.use(authMiddleware)
router.use('/posts', posts)
router.use('/user', user)
router.use('/sale', sale)
router.use('/bookmarks', bookMarks)
router.use('/in-appropreate-posts', inAppropreatePosts)
router.use('/lost-pets', lostPets)
router.use('/found-pets', foundPets)
router.use('/tutorial', tutorial)
router.use('/event', event)
router.use("/service", service);

module.exports = router;
