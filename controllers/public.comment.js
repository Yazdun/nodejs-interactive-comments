const { StatusCodes } = require('http-status-codes')
// const { BadRequestError, NotFoundError } = require('../errors')
const { Comment } = require('../models')

const getAllComments = async (req, res) => {
  const comments = await Comment.find({ parent: null })
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
  comments.reverse()
  res.status(StatusCodes.OK).json({ comments })
}

module.exports = {
  getAllComments,
}

// .populate({
//   path: 'replies',
//   populate: 'author',
// })
