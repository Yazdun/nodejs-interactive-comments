const { StatusCodes } = require('http-status-codes')
// const { BadRequestError, NotFoundError } = require('../errors')
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
    const { author, replies, upvotes } = comment

    switch (true) {
      case String(author._id) === userId:
        return { ...comment._doc, owner: true }

      default:
        return comment
    }
  })

  res.status(StatusCodes.OK).json({ comments })
}

module.exports = {
  getAllComments,
}
