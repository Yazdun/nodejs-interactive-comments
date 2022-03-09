const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const { Comment } = require('../models')

const createComment = async (req, res) => {
  const { userId } = req.user
  req.body.author = userId
  let comment = await Comment.create(req.body)
  comment = await comment.populate('author')
  res
    .status(StatusCodes.CREATED)
    .json({ comment: { ...comment._doc, owner: true } })
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
  }).then(() => Comment.deleteMany({ parent: commentId }))

  if (!comment) throw new NotFoundError(`this comment doesn't exist`)

  await res.status(StatusCodes.OK).send()
}

const replyComment = async (req, res) => {
  const {
    params: { id: commentId },
  } = req
  const { userId } = req.user

  const parent = await Comment.findOne({ _id: commentId, parent: null })
  if (!parent) throw new NotFoundError("You can't reply to this comment")

  req.body.author = userId
  req.body.parent = parent._id

  const reply = await Comment.create(req.body)
  await parent.updateOne({
    $push: { replies: reply._id },
  })

  res.status(StatusCodes.OK).json({ reply })
}

const voteComment = async (req, res) => {
  const {
    params: { id: commentId },
  } = req
  const { userId } = req.user

  const comment = await Comment.findOne({ _id: commentId })
  if (!comment) throw new NotFoundError("this comment doesn't exist")

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
  replyComment,
  voteComment,
}
