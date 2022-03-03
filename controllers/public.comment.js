const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllComments = async (req, res) => {
  res.end('get all comments')
}

module.exports = {
  getAllComments,
}
