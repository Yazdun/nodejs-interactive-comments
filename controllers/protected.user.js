const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const updateUser = async (req, res) => {
  res.end('update user')
}

module.exports = {
  updateUser,
}
