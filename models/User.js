const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'name is required'],
    minlength: 3,
    maxlength: 50,
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

module.exports = mongoose.model('User', UserSchema)
