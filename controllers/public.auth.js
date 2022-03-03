const { User } = require('../models')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const join = async (req, res) => {
  const usernameExists = await User.findOne({ username: req.body.username })
  if (usernameExists)
    throw new BadRequestError('this username is already taken')

  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username }, token })
}

const login = async (req, res) => {
  res.end('login user')
}

module.exports = {
  join,
  login,
}
