const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validatePasswordStrength } = require('../utils')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    minlength: 3,
    maxlength: 20,
    unique: true,
    match: [/^[a-zA-Z0-9_.-]*$/, 'username cannot contain space'],
  },
  avatar: {
    type: Number,
    enum: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12],
    required: [true, 'pick an avatar'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
})

UserSchema.pre('save', async function () {
  validatePasswordStrength(this.password)
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      username: this.username,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  )
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
