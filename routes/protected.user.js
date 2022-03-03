const express = require('express')
const router = express.Router()
const { updateUser } = require('../controllers/protected.user')

router.patch('/update', updateUser)

module.exports = router
