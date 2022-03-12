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

  let comment = await Comment.findOneAndUpdate(
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
  comment = await comment.populate('author')

  res.status(StatusCodes.OK).json({ comment: { ...comment._doc, owner: true } })
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

  const parent = await Comment.findOne({ _id: commentId })
  if (!parent) throw new NotFoundError("You can't reply to this comment")

  req.body.author = userId
  req.body.parent = parent._id

  let comment = await Comment.create(req.body)
  comment = await comment.populate('author')

  await parent.updateOne({
    $push: { replies: comment._id },
  })

  res.status(StatusCodes.OK).json({ comment })
}

const upvote = async (req, res) => {
  const {
    params: { id: commentId },
  } = req
  const { userId } = req.user

  const comment = await Comment.findOne({ _id: commentId })
  if (!comment) throw new NotFoundError("this comment doesn't exist")

  if (!comment.upvotes.includes(userId)) {
    const votedComment = await Comment.findByIdAndUpdate(
      { _id: commentId },
      {
        $push: { upvotes: userId },
        $pull: { downvotes: userId },
      },
      { new: true, runValidators: true },
    )

    res.status(StatusCodes.OK).json({
      votes: votedComment.upvotes.length - votedComment.downvotes.length,
      upvoted: true,
      downvoted: false,
    })
  } else {
    const votedComment = await Comment.findByIdAndUpdate(
      { _id: commentId },
      {
        $pull: { upvotes: userId },
      },
      { new: true, runValidators: true },
    )

    res.status(StatusCodes.OK).json({
      votes: votedComment.upvotes.length - votedComment.downvotes.length,
      upvoted: false,
      downvoted: false,
    })
  }
}

const downvote = async (req, res) => {
  const {
    params: { id: commentId },
  } = req
  const { userId } = req.user

  const comment = await Comment.findOne({ _id: commentId })
  if (!comment) throw new NotFoundError("this comment doesn't exist")

  if (!comment.downvotes.includes(userId)) {
    const votedComment = await Comment.findByIdAndUpdate(
      { _id: commentId },
      {
        $push: { downvotes: userId },
        $pull: { upvotes: userId },
      },
      { new: true, runValidators: true },
    )

    res.status(StatusCodes.OK).json({
      votes: votedComment.upvotes.length - votedComment.downvotes.length,
      downvoted: true,
      upvoted: false,
    })
  } else {
    const votedComment = await Comment.findByIdAndUpdate(
      { _id: commentId },
      {
        $pull: { downvotes: userId },
      },
      { new: true, runValidators: true },
    )

    res.status(StatusCodes.OK).json({
      votes: votedComment.upvotes.length - votedComment.downvotes.length,
      downvoted: false,
      upvoted: false,
    })
  }
}

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  replyComment,
  upvote,
  downvote,
}
