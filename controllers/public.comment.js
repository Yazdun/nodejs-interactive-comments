const { StatusCodes } = require('http-status-codes')
const { Comment } = require('../models')

const getAllComments = async (req, res) => {
  let userId = null

  if (req.user) {
    userId = req.user.userId
  }

  const thread = await Comment.find({ parent: null })
    .populate({
      path: 'replies',
      populate: {
        path: 'author',
        model: 'User',
        select: 'username avatar',
      },
    })
    .populate('author', ['username', 'avatar'])
    .sort('createdAt')
  thread.reverse()

  const comments = thread.map(comment => {
    const { author, replies: commentReplies, upvotes, downvotes } = comment

    const upvoted = upvotes.includes(userId)
    const downvoted = downvotes.includes(userId)

    const replies = commentReplies.map(reply => {
      const upvoted = reply.upvotes.includes(userId)
      if (reply.author && String(reply.author._id) === userId) {
        return { ...reply._doc, owner: true, upvoted }
      }
      return { ...reply._doc, upvoted }
    })

    switch (true) {
      case author && String(author._id) === userId:
        return { ...comment._doc, owner: true, replies, upvoted, downvoted }

      default:
        return { ...comment._doc, replies, upvoted, downvoted }
    }
  })

  res.status(StatusCodes.OK).json({ comments })
}

module.exports = {
  getAllComments,
}
