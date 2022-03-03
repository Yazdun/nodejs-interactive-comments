const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const join = async (req, res) => {
  res.end('join new user')
}

const login = async (req, res) => {
  res.end('login user')
}

module.exports = {
  join,
  login,
}
