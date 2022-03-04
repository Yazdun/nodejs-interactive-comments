const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const { Comment } = require('../models')

const createComment = async (req, res) => {
  const { userId } = req.user
  req.body.author = userId
  const comment = await Comment.create(req.body)
  res.status(StatusCodes.CREATED).json({ comment })
}

const updateComment = async (req, res) => {
  const {
    params: { id: commentId },
  } = req
  const { userId } = req.user

  const comment = await Comment.findOneAndUpdate(
    {
      _id: commentId,
      author: userId,
    },
    { ...req.body, isEdited: true },
    {
      new: true,
      runValidators: true,
    },
  )
  if (!comment) throw new NotFoundError(`this comment doesn't exist`)
  res.status(StatusCodes.OK).json({ comment })
}

const deleteComment = async (req, res) => {
  const {
    params: { id: commentId },
  } = req
  const { userId } = req.user

  const comment = await Comment.findOneAndRemove({
    _id: commentId,
    author: userId,
  })
  if (!comment) throw new NotFoundError(`this comment doesn't exist`)

  res.status(StatusCodes.OK).send()
}

const voteComment = async (req, res) => {
  const {
    params: { id: commentId },
  } = req
  const { userId } = req.user

  const comment = await Comment.findOne({ _id: commentId })
  if (!comment) throw new NotFoundError("this comment doesn't exist")

  if (String(comment.author) === userId)
    throw new BadRequestError("you can't upvote your own comment")

  if (!comment.upvotes.includes(userId)) {
    await comment.updateOne({
      $push: { upvotes: userId },
    })
    comment.upvotes.push(userId)
    res.status(StatusCodes.OK).json({
      upvotes: comment.upvotes,
    })
  } else {
    await comment.updateOne({
      $pull: { upvotes: userId },
    })

    res.status(StatusCodes.OK).json({
      upvotes: comment.upvotes.filter(upvote => {
        return upvote !== userId
      }),
    })
  }
}

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  voteComment,
}
