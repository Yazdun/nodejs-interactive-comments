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
    isEdited: {
      type: Boolean,
      default: false,
    },
    upvotes: [],
    downvotes: [],
    tag: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
    },
    replies: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('Comment', CommentSchema)
