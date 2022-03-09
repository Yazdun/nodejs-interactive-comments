const { StatusCodes } = require('http-status-codes')
const { UnauthenticatedError, BadRequestError } = require('../errors')
const { validatePasswordStrength } = require('../utils')
const { User } = require('../models')

const getUser = async (req, res) => {
  const { userId } = req.user
  const user = await User.findOne({ _id: userId })
  if (!user) throw new UnauthenticatedError()
  const { password, _id, ...others } = user._doc
  res.status(StatusCodes.OK).json({ user: others })
}

const updateUser = async (req, res) => {
  const { password, username } = req.body
  const { userId } = req.user

  const isExist = await User.findOne({ username })

  if (isExist && String(isExist._id) !== userId) {
    throw new BadRequestError('this username is already taken')
  }

  if (password) {
    validatePasswordStrength(password)
    const salt = await bcrypt.genSalt()
    req.body.password = await bcrypt.hash(password, salt)
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: req.body,
    },
    { new: true, runValidators: true },
  )
  if (!user) throw new UnauthenticatedError(`This user does not exist`)

  const token = user.createJWT()

  res
    .status(StatusCodes.OK)
    .json({ user: { username: user.username, avatar: user.avatar }, token })
}

module.exports = {
  updateUser,
  getUser,
}
