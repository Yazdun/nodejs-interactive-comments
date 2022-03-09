const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authUser = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the routes
    req.user = {
      userId: payload.userId,
      username: payload.username,
    }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}
const isLoggedIn = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return next()
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the routes
    req.user = {
      userId: payload.userId,
      username: payload.username,
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = { authUser, isLoggedIn }
