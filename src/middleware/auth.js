const jwt = require('jsonwebtoken')
const buildError = require('../utils/error-builder')
const User = require('../models/user')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    const userId = decodedToken.user.id
    const currentUser = await User.findOne({ _id: userId })
    if (currentUser) {
      req.headers.userId = userId
      req.headers.isAdmin = currentUser.isAdmin
      next()
    } else {
      buildError(res, 403, 'Unauthorized')
    }
  } catch (error) {
    return buildError(res, 403, 'Unauthorized')
  }
}

module.exports = authMiddleware
