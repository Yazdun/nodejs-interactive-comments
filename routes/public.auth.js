const express = require('express')
const router = express.Router()
const { join, login } = require('../controllers/public.auth')

router.post('/join', join)
router.post('/login', login)

module.exports = router
