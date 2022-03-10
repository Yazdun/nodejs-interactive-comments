const { StatusCodes } = require('http-status-codes')
const { Comment } = require('../models')

const curr = (thread, userId) => {
  return thread.map(comment => {
    const { author, replies: commentReplies, upvotes, downvotes } = comment

    const upvoted = upvotes.includes(userId)
    const downvoted = downvotes.includes(userId)
    const votesCount = upvotes.length - downvotes.length

    const replies = curr(commentReplies, userId)

    switch (true) {
      case author && String(author._id) === userId:
        return {
          ...comment._doc,
          owner: true,
          replies,
          upvoted,
          downvoted,
          votesCount,
        }

      default:
        return { ...comment._doc, replies, upvoted, downvoted, votesCount }
    }
  })
}

const getAllComments = async (req, res) => {
  let userId = null

  if (req.user) {
    userId = req.user.userId
  }

  let thread = await Comment.find({ parent: null }).sort('createdAt')
  thread.reverse()

  const comments = curr(thread, userId)

  res.status(StatusCodes.OK).json({ comments })
}

module.exports = {
  getAllComments,
}
