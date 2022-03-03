const mongoose = require('mongoose')

const ReplySchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'author is required'],
  },
  tag: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'tag is required'],
  },
  content: {
    type: String,
    required: [true, 'content is required'],
  },
  upvotes: [],
})

module.exports = mongoose.model('Reply', ReplySchema)
