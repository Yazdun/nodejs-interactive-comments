const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const createComment = async (req, res) => {
  res.end('create comment')
}

const updateComment = async (req, res) => {
  res.end('update comment')
}

const deleteComment = async (req, res) => {
  res.end('delete comment')
}

const voteComment = async (req, res) => {
  res.end('upvote comment')
}

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  voteComment,
}
