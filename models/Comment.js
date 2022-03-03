const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'author is required'],
    },
    content: {
      type: String,
      required: [true, 'content is required'],
    },
    upvotes: [],
  },
  { timestamps: true },
)

module.exports = mongoose.model('Comment', CommentSchema)
