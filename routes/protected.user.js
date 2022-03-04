const express = require('express')
const router = express.Router()
const { updateUser, getUser } = require('../controllers/protected.user')

router.get('/', getUser)
router.patch('/update', updateUser)

module.exports = router
